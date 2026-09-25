import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { PC_COMPONENTS, INITIAL_CAMERA } from './componentsData.js';
import { soundManager } from './soundManager.js';

// ==========================================================
// APPLICATION STATE
// ==========================================================
const state = {
  activeComponentId: null,
  isAnimating: false,
  autoRotate: false,
  soundEnabled: true,
  hoveredComponentId: null,
  typingInterval: null,
  fullTextToType: '',
  isTyping: false
};

// Map of registered Three.js Object3Ds by component ID
const componentObjects = {};
// Map of initial local transforms { position, rotation }
const initialTransforms = new Map();
// Cache of all meshes to their parent component ID
const meshToComponentMap = new Map();

// ==========================================================
// SCENE, CAMERA, RENDERER SETUP
// ==========================================================
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(INITIAL_CAMERA.position.x, INITIAL_CAMERA.position.y, INITIAL_CAMERA.position.z);

// WebGL Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// Orbit Controls (360-degree interactive rotation)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(INITIAL_CAMERA.target.x, INITIAL_CAMERA.target.y, INITIAL_CAMERA.target.z);
controls.maxDistance = 6.0;
controls.minDistance = 0.5;
controls.autoRotate = false;
controls.autoRotateSpeed = 1.0;

// Pause auto-rotation when user interacts with mouse
controls.addEventListener('start', () => {
  if (state.autoRotate) {
    controls.autoRotate = false;
  }
});

// ==========================================================
// LIGHTING SETUP
// ==========================================================
function setupLighting() {
  // Ambient Soft Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  // Key Directional Light (Soft White Studio Light)
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
  dirLight1.position.set(4, 6, 5);
  dirLight1.castShadow = true;
  dirLight1.shadow.mapSize.width = 2048;
  dirLight1.shadow.mapSize.height = 2048;
  dirLight1.shadow.camera.near = 0.5;
  dirLight1.shadow.camera.far = 15;
  dirLight1.shadow.bias = -0.0005;
  scene.add(dirLight1);

  // Fill Light (Cyber Cyan tint)
  const cyanFill = new THREE.DirectionalLight(0x00f0ff, 1.4);
  cyanFill.position.set(-5, 3, -3);
  scene.add(cyanFill);

  // Rim Light (Electric Violet tint)
  const violetRim = new THREE.DirectionalLight(0x9d4edd, 1.2);
  violetRim.position.set(0, -3, -4);
  scene.add(violetRim);

  // Bottom Uplight for Underglow
  const bottomLight = new THREE.PointLight(0x00f0ff, 2.0, 6);
  bottomLight.position.set(0, -0.4, 0);
  scene.add(bottomLight);

  // Ground Grid & Tech Pedestal
  const groundGeo = new THREE.CircleGeometry(3.5, 64);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x070c18,
    roughness: 0.85,
    metalness: 0.2
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.01;
  ground.receiveShadow = true;
  scene.add(ground);

  // Circular Tech Rings on Ground
  const ringGeo1 = new THREE.RingGeometry(2.2, 2.22, 64);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = -Math.PI / 2;
  ring1.position.y = 0.001;
  scene.add(ring1);

  const ringGeo2 = new THREE.RingGeometry(3.2, 3.21, 64);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x2979ff, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.x = -Math.PI / 2;
  ring2.position.y = 0.001;
  scene.add(ring2);
}

setupLighting();

// ==========================================================
// 3D MODEL LOADING & REGISTRATION
// ==========================================================
let pcRootScene = null;
const loader = new GLTFLoader();

const loaderScreen = document.getElementById('loading-screen');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressPercent = document.getElementById('progress-percent');
const progressBytes = document.getElementById('progress-bytes');
const loaderStatusText = document.getElementById('loader-status-text');

loader.load(
  '/personal_computer.glb',
  (gltf) => {
    pcRootScene = gltf.scene;
    scene.add(pcRootScene);

    // Adjust shadow casting & materials
    pcRootScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = Math.max(child.material.roughness || 0.5, 0.3);
        }
      }
    });

    // Register all component groups and cache initial positions
    registerComponents(pcRootScene);

    // Generate Left Quick Dock list
    initQuickDock();

    // Hide loader screen
    loaderStatusText.textContent = 'Hardware Rig Siap!';
    progressBarFill.style.width = '100%';
    progressPercent.textContent = '100%';

    setTimeout(() => {
      loaderScreen.classList.add('fade-out');
      // Subtle introductory camera tween
      gsap.from(camera.position, {
        x: 3.5,
        y: 2.8,
        z: 4.2,
        duration: 2.0,
        ease: 'power3.out'
      });
    }, 600);
  },
  (xhr) => {
    if (xhr.lengthComputable) {
      const percent = Math.min(100, Math.round((xhr.loaded / xhr.total) * 100));
      progressBarFill.style.width = `${percent}%`;
      progressPercent.textContent = `${percent}%`;
      const loadedMB = (xhr.loaded / (1024 * 1024)).toFixed(1);
      const totalMB = (xhr.total / (1024 * 1024)).toFixed(1);
      progressBytes.textContent = `${loadedMB} MB / ${totalMB} MB`;
    } else {
      const loadedMB = (xhr.loaded / (1024 * 1024)).toFixed(1);
      progressBytes.textContent = `${loadedMB} MB`;
    }
  },
  (error) => {
    console.error('Error loading GLB:', error);
    loaderStatusText.textContent = 'Gagal memuat model 3D. Periksa konsol.';
  }
);

/**
 * Register components from PC_COMPONENTS definition
 */
function registerComponents(root) {
  Object.keys(PC_COMPONENTS).forEach((compKey) => {
    const config = PC_COMPONENTS[compKey];
    componentObjects[compKey] = [];

    config.nodeNames.forEach((name) => {
      const obj = root.getObjectByName(name);
      if (obj) {
        componentObjects[compKey].push(obj);

        // Record initial local transform
        if (!initialTransforms.has(obj)) {
          initialTransforms.set(obj, {
            position: obj.position.clone(),
            rotation: obj.rotation.clone()
          });
        }

        // Map every mesh inside this subtree to this component ID
        obj.traverse((child) => {
          if (child.isMesh) {
            meshToComponentMap.set(child, compKey);
          }
        });
      }
    });
  });
}

// ==========================================================
// COMPONENT EXTRACTION & CAMERA ANIMATION (Requirements 3 & 4)
// ==========================================================

/**
 * Extract component out of casing and focus camera
 */
export function selectComponent(compKey) {
  if (state.isAnimating || !compKey || !PC_COMPONENTS[compKey]) return;

  const config = PC_COMPONENTS[compKey];
  const isSameComponent = state.activeComponentId === compKey;

  if (isSameComponent) return;

  state.isAnimating = true;
  soundManager.playSelect();
  soundManager.playExtract();

  // If another component was pulled out, retract it first
  if (state.activeComponentId && state.activeComponentId !== compKey) {
    retractComponent(state.activeComponentId, false);
  }

  state.activeComponentId = compKey;
  updateSystemStatus(`KOMPONEN DIEKSTRAK: ${config.name.toUpperCase()}`);
  updateDockActiveState(compKey);

  // 1. Animate component nodes outwards from casing
  const objects = componentObjects[compKey] || [];
  objects.forEach((obj) => {
    const init = initialTransforms.get(obj);
    if (!init) return;

    gsap.killTweensOf(obj.position);
    gsap.to(obj.position, {
      x: init.position.x + config.offset.x,
      y: init.position.y + config.offset.y,
      z: init.position.z + config.offset.z,
      duration: 1.2,
      ease: 'power3.out'
    });
  });

  // 2. Smoothly animate Camera position and Controls target to focus on component
  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(controls.target);

  const targetCamPos = config.cameraFocus.position;
  const targetLookAt = config.cameraFocus.target;

  gsap.to(camera.position, {
    x: targetCamPos.x,
    y: targetCamPos.y,
    z: targetCamPos.z,
    duration: 1.4,
    ease: 'power2.inOut'
  });

  gsap.to(controls.target, {
    x: targetLookAt.x,
    y: targetLookAt.y,
    z: targetLookAt.z,
    duration: 1.4,
    ease: 'power2.inOut',
    onComplete: () => {
      state.isAnimating = false;
      // 3. Show static popup card and start running text
      showCornerPopup(config);
    }
  });

  // Also trigger corner popup smoothly right away or when camera zooms in
  showCornerPopup(config);
}

/**
 * Retract component back to assembled position inside casing
 */
export function retractComponent(compKey, shouldResetCamera = true) {
  const targetKey = compKey || state.activeComponentId;
  if (!targetKey) return;

  soundManager.playRetract();

  const objects = componentObjects[targetKey] || [];
  objects.forEach((obj) => {
    const init = initialTransforms.get(obj);
    if (!init) return;

    gsap.killTweensOf(obj.position);
    gsap.to(obj.position, {
      x: init.position.x,
      y: init.position.y,
      z: init.position.z,
      duration: 1.0,
      ease: 'power2.inOut'
    });
  });

  if (shouldResetCamera) {
    state.activeComponentId = null;
    hideCornerPopup();
    updateDockActiveState(null);
    updateSystemStatus('MODE: PC TERAKIT (IDLE)');

    // Reset camera to full PC view
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);

    gsap.to(camera.position, {
      x: INITIAL_CAMERA.position.x,
      y: INITIAL_CAMERA.position.y,
      z: INITIAL_CAMERA.position.z,
      duration: 1.4,
      ease: 'power2.inOut'
    });

    gsap.to(controls.target, {
      x: INITIAL_CAMERA.target.x,
      y: INITIAL_CAMERA.target.y,
      z: INITIAL_CAMERA.target.z,
      duration: 1.4,
      ease: 'power2.inOut',
      onComplete: () => {
        state.isAnimating = false;
      }
    });
  }
}

/**
 * Reset whole PC to fully assembled condition
 */
export function resetToIdle() {
  if (state.activeComponentId) {
    retractComponent(state.activeComponentId, true);
  } else {
    // If no component was out, simply smoothly re-center camera
    gsap.to(camera.position, {
      x: INITIAL_CAMERA.position.x,
      y: INITIAL_CAMERA.position.y,
      z: INITIAL_CAMERA.position.z,
      duration: 1.2,
      ease: 'power2.inOut'
    });
    gsap.to(controls.target, {
      x: INITIAL_CAMERA.target.x,
      y: INITIAL_CAMERA.target.y,
      z: INITIAL_CAMERA.target.z,
      duration: 1.2,
      ease: 'power2.inOut'
    });
  }
}

// ==========================================================
// CORNER STATIC POPUP & RUNNING TEXT ENGINE (Requirement 4)
// ==========================================================
const cornerPopup = document.getElementById('corner-popup');
const popupBadgeText = document.getElementById('popup-category-text');
const popupTitle = document.getElementById('popup-title');
const popupSubtitle = document.getElementById('popup-subtitle');
const runningTextContent = document.getElementById('running-text-content');
const specsGrid = document.getElementById('specs-grid');
const skipTypingBtn = document.getElementById('btn-skip-typing');
const popupCloseBtn = document.getElementById('popup-close-btn');
const dockRetractBtn = document.getElementById('btn-dock-retract');
const prevPartBtn = document.getElementById('btn-prev-part');
const nextPartBtn = document.getElementById('btn-next-part');

function showCornerPopup(config) {
  cornerPopup.classList.remove('hidden');

  popupBadgeText.textContent = config.category.toUpperCase();
  popupTitle.textContent = config.name;
  popupSubtitle.textContent = config.subname;

  // Render Specs Chips
  specsGrid.innerHTML = '';
  config.specs.forEach((spec) => {
    const chip = document.createElement('div');
    chip.className = 'spec-chip';
    chip.innerHTML = `
      <span class="spec-chip-label">${spec.label}</span>
      <span class="spec-chip-val">${spec.val}</span>
    `;
    specsGrid.appendChild(chip);
  });

  // Start Running Text (Typewriter stream effect)
  startRunningText(config.explanation);
}

function hideCornerPopup() {
  stopRunningText();
  cornerPopup.classList.add('hidden');
}

/**
 * Running Text implementation (Typewriter Stream)
 */
function startRunningText(fullText) {
  stopRunningText();
  state.fullTextToType = fullText;
  state.isTyping = true;
  runningTextContent.textContent = '';

  let charIndex = 0;
  const speedMs = 18; // Speed in milliseconds per character

  state.typingInterval = setInterval(() => {
    if (charIndex < fullText.length) {
      runningTextContent.textContent += fullText.charAt(charIndex);
      charIndex++;
      soundManager.playTypingTick();
    } else {
      stopRunningText();
    }
  }, speedMs);
}

function stopRunningText() {
  if (state.typingInterval) {
    clearInterval(state.typingInterval);
    state.typingInterval = null;
  }
  state.isTyping = false;
}

function skipRunningText() {
  stopRunningText();
  runningTextContent.textContent = state.fullTextToType;
}

// Popup Events
skipTypingBtn.addEventListener('click', skipRunningText);
popupCloseBtn.addEventListener('click', () => retractComponent(state.activeComponentId, true));
dockRetractBtn.addEventListener('click', () => retractComponent(state.activeComponentId, true));

// Cycle Next / Previous Component
const componentKeys = Object.keys(PC_COMPONENTS);
nextPartBtn.addEventListener('click', () => {
  const currentIndex = componentKeys.indexOf(state.activeComponentId);
  const nextIndex = (currentIndex + 1) % componentKeys.length;
  selectComponent(componentKeys[nextIndex]);
});

prevPartBtn.addEventListener('click', () => {
  const currentIndex = componentKeys.indexOf(state.activeComponentId);
  const prevIndex = (currentIndex - 1 + componentKeys.length) % componentKeys.length;
  selectComponent(componentKeys[prevIndex]);
});

// ==========================================================
// RAYCASTING FOR INTERACTIVE 3D HOVER & CLICKS
// ==========================================================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const hoverTooltip = document.getElementById('hover-tooltip');
const tooltipCategory = document.getElementById('tooltip-category');
const tooltipName = document.getElementById('tooltip-name');

let lastHoveredMesh = null;
let originalEmissive = null;

function onPointerMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Position dynamic hover tooltip near cursor
  hoverTooltip.style.left = `${event.clientX}px`;
  hoverTooltip.style.top = `${event.clientY}px`;

  if (!pcRootScene) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(pcRootScene.children, true);

  if (intersects.length > 0) {
    const hitMesh = intersects[0].object;
    const compKey = meshToComponentMap.get(hitMesh);

    if (compKey && PC_COMPONENTS[compKey]) {
      const config = PC_COMPONENTS[compKey];
      document.body.style.cursor = 'pointer';

      if (state.hoveredComponentId !== compKey) {
        state.hoveredComponentId = compKey;
        soundManager.playHover();
      }

      tooltipCategory.textContent = config.category.toUpperCase();
      tooltipName.textContent = config.name;
      hoverTooltip.classList.add('visible');

      // Subtle mesh highlight
      if (lastHoveredMesh !== hitMesh && hitMesh.material && hitMesh.material.emissive) {
        resetHoverMeshHighlight();
        lastHoveredMesh = hitMesh;
        originalEmissive = hitMesh.material.emissive.clone();
        hitMesh.material.emissive.setHex(0x003344);
      }
      return;
    }
  }

  // No interactive component hit
  document.body.style.cursor = 'default';
  state.hoveredComponentId = null;
  hoverTooltip.classList.remove('visible');
  resetHoverMeshHighlight();
}

function resetHoverMeshHighlight() {
  if (lastHoveredMesh && lastHoveredMesh.material && originalEmissive) {
    lastHoveredMesh.material.emissive.copy(originalEmissive);
    lastHoveredMesh = null;
    originalEmissive = null;
  }
}

// Track mouse drag vs click to prevent firing click when dragging to rotate
let pointerDownPos = { x: 0, y: 0 };
window.addEventListener('pointerdown', (e) => {
  pointerDownPos = { x: e.clientX, y: e.clientY };
});

window.addEventListener('pointerup', (e) => {
  const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
  if (dist > 5) return; // was a drag, ignore

  if (!pcRootScene || state.isAnimating) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(pcRootScene.children, true);

  if (intersects.length > 0) {
    const hitMesh = intersects[0].object;
    const compKey = meshToComponentMap.get(hitMesh);
    if (compKey) {
      selectComponent(compKey);
    }
  }
});

window.addEventListener('pointermove', onPointerMove);

// ==========================================================
// LEFT QUICK DOCK SETUP
// ==========================================================
function initQuickDock() {
  const dockList = document.getElementById('dock-list');
  const dockCounter = document.getElementById('dock-counter');
  dockList.innerHTML = '';
  dockCounter.textContent = `${componentKeys.length} Bagian`;

  componentKeys.forEach((key) => {
    const comp = PC_COMPONENTS[key];
    const item = document.createElement('div');
    item.className = 'dock-item';
    item.id = `dock-item-${key}`;
    item.innerHTML = `
      <span class="dock-item-icon">${comp.icon || '📦'}</span>
      <span class="dock-item-name">${comp.name}</span>
    `;

    item.addEventListener('click', () => {
      selectComponent(key);
    });

    dockList.appendChild(item);
  });
}

function updateDockActiveState(activeKey) {
  componentKeys.forEach((key) => {
    const item = document.getElementById(`dock-item-${key}`);
    if (item) {
      if (key === activeKey) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    }
  });
}

function updateSystemStatus(text) {
  const statusEl = document.getElementById('status-text');
  if (statusEl) {
    statusEl.textContent = text;
  }
}

// ==========================================================
// HEADER NAV BUTTONS & MODALS
// ==========================================================
const btnReset = document.getElementById('btn-reset');
const btnAutoRotate = document.getElementById('btn-autorotate');
const btnSound = document.getElementById('btn-sound');
const soundIcon = document.getElementById('sound-icon');
const btnHelp = document.getElementById('btn-help');
const helpModal = document.getElementById('help-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalOkBtn = document.getElementById('modal-ok-btn');

btnReset.addEventListener('click', () => {
  resetToIdle();
});

btnAutoRotate.addEventListener('click', () => {
  state.autoRotate = !state.autoRotate;
  controls.autoRotate = state.autoRotate;
  btnAutoRotate.classList.toggle('active', state.autoRotate);
  soundManager.playSelect();
});

btnSound.addEventListener('click', () => {
  const enabled = soundManager.toggle();
  state.soundEnabled = enabled;
  soundIcon.textContent = enabled ? '🔊' : '🔇';
  btnSound.classList.toggle('active', enabled);
});

btnHelp.addEventListener('click', () => {
  helpModal.classList.remove('hidden');
  soundManager.playSelect();
});

[modalCloseBtn, modalOkBtn].forEach((btn) => {
  btn.addEventListener('click', () => {
    helpModal.classList.add('hidden');
    soundManager.playSelect();
  });
});

// ESC Key closes active component or modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!helpModal.classList.contains('hidden')) {
      helpModal.classList.add('hidden');
    } else if (state.activeComponentId) {
      retractComponent(state.activeComponentId, true);
    }
  }
});

// ==========================================================
// RESIZE HANDLER & RENDER LOOP
// ==========================================================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
