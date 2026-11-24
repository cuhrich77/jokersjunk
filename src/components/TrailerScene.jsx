import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SECTION_COLORS, TRAILER } from '../lib/estimate';

// 3D 7x14 dump trailer split into 4 sections. `fills` = [0..1] x4, front to tailgate.
// Drag to rotate; vertical swipes still scroll the page on phones.
export default function TrailerScene({ fills, height = 360 }) {
  const mountRef = useRef(null);
  const fillsRef = useRef(fills);
  fillsRef.current = fills;

  useEffect(() => {
    const mount = mountRef.current;
    const L = TRAILER.lengthFt, W = TRAILER.widthFt, H = TRAILER.heightFt, SL = L / 4, D = 2.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 300);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8a96a3, 0.9));
    const sun = new THREE.DirectionalLight(0xffffff, 1.1);
    sun.position.set(12, 24, 14);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 80 });
    scene.add(sun);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: 0.18 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const mat = (color, o) => new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.3, ...(o || {}) });
    const box = (w, h, d, m, x, y, z) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      b.position.set(x, y, z); b.castShadow = true; b.receiveShadow = true;
      scene.add(b); return b;
    };
    const cyl = (r, len, m) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 20), m);

    const steel = mat(0x2b3037, { metalness: 0.55, roughness: 0.45 });
    const wall = mat(0x59626e, { metalness: 0.35, roughness: 0.55 });
    box(L, 0.25, W, mat(0x4a525c, { roughness: 0.8 }), 0, D - 0.125, 0);
    [1, -1].forEach((s) => {
      box(L + 0.3, H, 0.15, wall, 0, D + H / 2, s * (W / 2 + 0.075));
      box(L + 0.3, 0.18, 0.28, steel, 0, D + H + 0.09, s * (W / 2 + 0.075));
      [-L / 2, -SL, 0, SL, L / 2].forEach((x) => box(0.22, H + 0.2, 0.22, steel, x, D + H / 2 - 0.05, s * (W / 2 + 0.26)));
      box(L + 0.6, 0.45, 0.35, steel, 0, D - 0.47, s * 2.4);
    });
    box(0.15, H, W + 0.3, wall, -L / 2 - 0.075, D + H / 2, 0);
    box(0.15, H, W + 0.3, mat(0x7b2d8b, { metalness: 0.35, roughness: 0.55 }), L / 2 + 0.075, D + H / 2, 0); // purple tailgate
    const tl = Math.hypot(4, 2.4), ang = Math.atan2(2.4, 4);
    [1, -1].forEach((s) => { const b = box(tl, 0.35, 0.3, steel, -L / 2 - 2, D - 0.47, s * 1.2); b.rotation.y = -s * ang; });
    box(1.1, 0.38, 0.55, steel, -L / 2 - 4.4, D - 0.47, 0);
    const jack = cyl(0.13, D - 0.3, steel); jack.position.set(-L / 2 - 2.8, (D - 0.3) / 2 + 0.15, 0); scene.add(jack);
    const tire = mat(0x17191c, { roughness: 0.9, metalness: 0 }), rim = mat(0xb9c0c8, { metalness: 0.8, roughness: 0.3 });
    [-1.45, 1.45].forEach((x) => [1, -1].forEach((s) => {
      const t = cyl(1.15, 0.72, tire); t.rotation.x = Math.PI / 2; t.position.set(x, 1.15, s * 3.2); t.castShadow = true; scene.add(t);
      const r = cyl(0.6, 0.74, rim); r.rotation.x = Math.PI / 2; r.position.copy(t.position); scene.add(r);
    }));

    // Section dividers
    const lineM = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 });
    [-SL, 0, SL].forEach((x) => {
      const pts = [[x, D + 0.01, -W / 2], [x, D + H, -W / 2], [x, D + H, W / 2], [x, D + 0.01, W / 2], [x, D + 0.01, -W / 2]].map((a) => new THREE.Vector3(...a));
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineM));
    });

    // Fill blocks + % badges
    const junk = (() => {
      const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
      g.fillStyle = '#fff'; g.fillRect(0, 0, 256, 256);
      for (let k = 0; k < 160; k++) { const v = (175 + Math.random() * 80) | 0; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(Math.random() * 256, Math.random() * 256, 8 + Math.random() * 48, 5 + Math.random() * 26); }
      return new THREE.CanvasTexture(c);
    })();
    const unit = new THREE.BoxGeometry(1, 1, 1);
    const edges = new THREE.EdgesGeometry(unit);
    const cx = (i) => -L / 2 + SL * (i + 0.5);
    const blocks = [], badges = [], disp = [0, 0, 0, 0];
    const drawBadge = (b, i, pct) => {
      const g = b.ctx; g.clearRect(0, 0, 160, 200);
      g.fillStyle = SECTION_COLORS[i]; g.beginPath(); g.arc(80, 72, 62, 0, Math.PI * 2); g.fill();
      g.lineWidth = 9; g.strokeStyle = '#fff'; g.stroke();
      g.fillStyle = '#fff'; g.font = '800 70px "Barlow Condensed", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(String(i + 1), 80, 76);
      g.fillStyle = 'rgba(26,26,26,.88)'; g.beginPath(); g.roundRect ? g.roundRect(22, 148, 116, 44, 22) : g.rect(22, 148, 116, 44); g.fill();
      g.fillStyle = '#fff'; g.font = '700 30px "Barlow Condensed", sans-serif'; g.fillText(pct + '%', 80, 171);
      b.tex.needsUpdate = true; b.last = pct;
    };
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(unit, new THREE.MeshStandardMaterial({ color: SECTION_COLORS[i], map: junk, roughness: 0.85, metalness: 0 }));
      m.castShadow = true;
      m.add(new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 })));
      m.scale.set(SL - 0.14, 0.001, W - 0.14); m.position.set(cx(i), D, 0); m.visible = false;
      scene.add(m); blocks.push(m);
      const c = document.createElement('canvas'); c.width = 160; c.height = 200;
      const tex = new THREE.CanvasTexture(c);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
      sp.scale.set(1.9, 2.375, 1); sp.position.set(cx(i), D + H + 1.7, 0); sp.renderOrder = 10;
      scene.add(sp);
      const b = { ctx: c.getContext('2d'), tex, last: -1 };
      drawBadge(b, i, 0); badges.push(b);
    }

    // Camera orbit
    const target = new THREE.Vector3(-1.5, D + H * 0.3, 0);
    const cam = { theta: 0.78, phi: 1.05, r: 24 }, goal = { ...cam };
    let lastInteract = 0, drag = null;
    const el = renderer.domElement;
    const onDown = (e) => { drag = { x: e.clientX, y: e.clientY }; lastInteract = performance.now(); };
    const onMove = (e) => {
      if (!drag) return;
      goal.theta -= (e.clientX - drag.x) * 0.008;
      if (e.pointerType === 'mouse') goal.phi = Math.min(1.45, Math.max(0.15, goal.phi - (e.clientY - drag.y) * 0.008));
      drag = { x: e.clientX, y: e.clientY }; lastInteract = performance.now();
    };
    const onUp = () => { drag = null; };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);

    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); el.style.width = w + 'px'; el.style.height = h + 'px';
      camera.aspect = w / h;
      goal.r = w < 480 ? 30 : 24;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize); ro.observe(mount); resize();

    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!drag && performance.now() - lastInteract > 3500) goal.theta += 0.0025; // gentle idle spin
      ['theta', 'phi', 'r'].forEach((k) => { cam[k] += (goal[k] - cam[k]) * 0.12; });
      camera.position.set(
        target.x + cam.r * Math.sin(cam.phi) * Math.sin(cam.theta),
        target.y + cam.r * Math.cos(cam.phi),
        target.z + cam.r * Math.sin(cam.phi) * Math.cos(cam.theta));
      camera.lookAt(target);
      const f = fillsRef.current || [0, 0, 0, 0];
      for (let i = 0; i < 4; i++) {
        const t = f[i] || 0; disp[i] += (t - disp[i]) * 0.15; if (Math.abs(t - disp[i]) < 0.001) disp[i] = t;
        const hh = Math.max(disp[i] * H, 0.001);
        blocks[i].scale.y = hh; blocks[i].position.y = D + hh / 2; blocks[i].visible = disp[i] > 0.003;
        const pct = Math.round(t * 100); if (badges[i].last !== pct) drawBadge(badges[i], i, pct);
      }
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); }
      });
      renderer.dispose();
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-label="3D view of our 7 by 14 foot trailer showing how full your load would make it"
      role="img"
      style={{ width: '100%', height, touchAction: 'pan-y', cursor: 'grab', borderRadius: 16, overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 35%, #ffffff 0%, #eef3ef 60%, #dfe7e1 100%)' }}
    />
  );
}
