(() => {
  'use strict';

  const slides = [...document.querySelectorAll('.slide')];
  const nav = document.querySelector('#section-nav');
  const current = document.querySelector('#current');
  const progress = document.querySelector('#progress-fill');
  const previous = document.querySelector('#prev');
  const next = document.querySelector('#next');
  const menuButton = document.querySelector('.menu-button');
  const sideNav = document.querySelector('.side-nav');
  let activeIndex = 0;

  slides.forEach((slide, index) => {
    const link = document.createElement('a');
    link.className = 'nav-dot';
    link.href = `#${slide.id}`;
    link.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span>`;
    link.setAttribute('aria-label', `${String(index + 1).padStart(2, '0')} ${slide.dataset.title}`);
    link.addEventListener('click', event => {
      event.preventDefault();
      goTo(index);
      sideNav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
    nav.appendChild(link);
  });
  const navLinks = [...nav.children];

  function goTo(index) {
    activeIndex = Math.max(0, Math.min(slides.length - 1, index));
    slides[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateInterface();
  }

  function updateInterface() {
    current.textContent = String(activeIndex + 1).padStart(2, '0');
    progress.style.width = `${((activeIndex + 1) / slides.length) * 100}%`;
    navLinks.forEach((link, index) => link.classList.toggle('active', index === activeIndex));
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === slides.length - 1;
  }
  previous.addEventListener('click', () => goTo(activeIndex - 1));
  next.addEventListener('click', () => goTo(activeIndex + 1));
  menuButton.addEventListener('click', () => {
    const isOpen = sideNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('keydown', event => {
    if (['ArrowDown', 'PageDown', 'ArrowRight', ' '].includes(event.key)) { event.preventDefault(); goTo(activeIndex + 1); }
    if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(event.key)) { event.preventDefault(); goTo(activeIndex - 1); }
    if (event.key === 'Home') goTo(0);
    if (event.key === 'End') goTo(slides.length - 1);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const index = slides.indexOf(entry.target);
      if (index !== -1) { activeIndex = index; updateInterface(); entry.target.classList.add('visible'); }
    });
  }, { threshold: .45 });
  slides.forEach(slide => observer.observe(slide));
  slides[0].classList.add('visible');
  updateInterface();

  document.querySelectorAll('.era').forEach(era => {
    era.addEventListener('click', () => {
      document.querySelectorAll('.era').forEach(item => item.classList.remove('active'));
      era.classList.add('active');
    });
  });

  if (window.THREE) createScene();

  function createScene() {
    const canvas = document.querySelector('#scene');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 100);
    camera.position.z = 8;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    const world = new THREE.Group();
    scene.add(world);
    const globe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.25, 2),
      new THREE.MeshBasicMaterial({ color: 0x71e0cf, wireframe: true, transparent: true, opacity: .12 })
    );
    world.add(globe);

    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf6c77c });
    const nodeGeometry = new THREE.SphereGeometry(.045, 8, 8);
    const points = [];
    for (let i = 0; i < 42; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / 41);
      const theta = Math.sqrt(41 * Math.PI) * phi;
      const point = new THREE.Vector3(
        2.3 * Math.cos(theta) * Math.sin(phi),
        2.3 * Math.sin(theta) * Math.sin(phi),
        2.3 * Math.cos(phi)
      );
      points.push(point);
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(point);
      world.add(node);
    }
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x82c9ff, transparent: true, opacity: .25 });
    points.forEach((point, index) => {
      const nearby = points[(index * 7 + 5) % points.length];
      const geometry = new THREE.BufferGeometry().setFromPoints([point, nearby]);
      world.add(new THREE.Line(geometry, lineMaterial));
    });

    const particlePositions = new Float32Array(500 * 3);
    for (let i = 0; i < particlePositions.length; i += 3) {
      const radius = 3.5 + Math.random() * 3.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - .5) * 7;
      particlePositions[i] = Math.cos(angle) * radius;
      particlePositions[i + 1] = height;
      particlePositions[i + 2] = Math.sin(angle) * radius;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0x71e0cf, size: .018, transparent: true, opacity: .55 }));
    scene.add(particles);

    const cubes = new THREE.Group();
    [
      { position: [-3.8, 1.6, -1], scale: .28, color: 0x82c9ff },
      { position: [3.4, -1.7, -.7], scale: .18, color: 0xf6c77c },
      { position: [2.8, 2.4, -2], scale: .14, color: 0xff9679 }
    ].forEach(item => {
      const cube = new THREE.Mesh(new THREE.BoxGeometry(item.scale, item.scale, item.scale), new THREE.MeshBasicMaterial({ color: item.color, wireframe: true, transparent: true, opacity: .7 }));
      cube.position.set(...item.position);
      cubes.add(cube);
    });
    scene.add(cubes);

    let pointerX = 0;
    let pointerY = 0;
    window.addEventListener('pointermove', event => {
      pointerX = (event.clientX / window.innerWidth - .5) * 2;
      pointerY = (event.clientY / window.innerHeight - .5) * 2;
    }, { passive: true });
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    });

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      world.rotation.y = elapsed * .055 + pointerX * .08;
      world.rotation.x = pointerY * .045;
      globe.rotation.z = elapsed * .025;
      particles.rotation.y = -elapsed * .012;
      cubes.rotation.y = elapsed * .08;
      cubes.children.forEach((cube, index) => { cube.rotation.x = elapsed * (.2 + index * .1); cube.rotation.z = elapsed * .15; });
      camera.position.x += (pointerX * .22 - camera.position.x) * .025;
      camera.position.y += (-pointerY * .14 - camera.position.y) * .025;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    }
    animate();
  }
})();
