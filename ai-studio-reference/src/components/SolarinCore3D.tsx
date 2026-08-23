import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SolarinCore3DProps {
  isSynchronizing?: boolean;
  onSyncComplete?: () => void;
  interactive?: boolean;
}

export const SolarinCore3D: React.FC<SolarinCore3DProps> = ({
  isSynchronizing = false,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 380;
    let height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Group for Solarin
    const group = new THREE.Group();
    scene.add(group);

    // Outer Geodesic Icosahedron (Teal Wireframe)
    const coreGeom = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0x116466,
      emissive: 0x116466,
      emissiveIntensity: 0.6,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    group.add(core);

    // Inner Faceted Core (Warm Sand & Peach Accent)
    const innerGeom = new THREE.IcosahedronGeometry(0.85, 1);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0xD9B08C,
      emissive: 0xD9B08C,
      emissiveIntensity: 0.8,
      wireframe: false,
      flatShading: true,
      transparent: true,
      opacity: 0.92,
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    group.add(innerCore);

    // Inner wireframe overlay
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xFFCB9A,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerWire = new THREE.Mesh(innerGeom, innerWireMat);
    group.add(innerWire);

    // Outer Orbital Ring 1
    const ringGeom = new THREE.TorusGeometry(2.4, 0.018, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x8cd3d4,
      transparent: true,
      opacity: 0.45,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    group.add(ring);

    // Outer Orbital Ring 2 (Tilted)
    const ringGeom2 = new THREE.TorusGeometry(2.1, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x116466,
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // Light Rig matching palette
    const lights: THREE.PointLight[] = [];
    lights[0] = new THREE.PointLight(0x8cd3d4, 2.5, 30);
    lights[0].position.set(0, 15, 10);

    lights[1] = new THREE.PointLight(0xD9B08C, 2.0, 30);
    lights[1].position.set(10, -10, 10);

    lights[2] = new THREE.PointLight(0x116466, 3.0, 30);
    lights[2].position.set(-15, 10, -10);

    lights.forEach((l) => scene.add(l));

    const ambientLight = new THREE.AmbientLight(0x15221e, 1.8);
    scene.add(ambientLight);

    // Interactive mouse drag/orientation tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      setMousePos({ x: nx, y: ny });

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrame: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Base rotation
      group.rotation.y += 0.006 + (isSynchronizing ? 0.02 : 0);
      group.rotation.z += 0.002;
      core.rotation.x -= 0.008;
      ring2.rotation.z += 0.004;

      // Mouse drag damping
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;

      // Subtle pulse
      const pulseSpeed = isSynchronizing ? 6.0 : 2.0;
      const pulseAmplitude = isSynchronizing ? 0.22 : 0.08;
      const scale = 1 + Math.sin(elapsedTime * pulseSpeed) * pulseAmplitude;
      innerCore.scale.set(scale, scale, scale);
      innerWire.scale.set(scale * 1.02, scale * 1.02, scale * 1.02);

      // Dynamic light intensity shift
      if (lights[1]) {
        lights[1].intensity = 1.8 + Math.sin(elapsedTime * 3) * 0.6;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 380;
      height = container.clientHeight || 380;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isSynchronizing, interactive]);

  return (
    <div
      className="relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-64 h-64 md:w-96 md:h-96 flex items-center justify-center transition-transform duration-700"
        id="solarin-3d-canvas-container"
      />

      {/* Interactive HUD Readout overlay on hover */}
      {hovered && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#0d1512]/90 border border-[#116466] px-3 py-1 text-[11px] font-mono tracking-widest text-[#8cd3d4] uppercase rounded backdrop-blur-md pointer-events-none whitespace-nowrap shadow-[0_0_15px_rgba(17,100,102,0.4)]">
          SOLARIN AETHERIC CORE // {isSynchronizing ? 'SYNCHRONIZING...' : 'ONLINE (CLICK & DRAG)'}
        </div>
      )}
    </div>
  );
};
