import React, { useEffect, useRef, useState } from 'react';

export default function GeometricCore3D({ isSynchronizing = false, interactive = true }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 360;
    let height = 360;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = Math.min(parent.clientWidth || 360, 420);
        height = width;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // 3D Geometry Vertices for Icosahedron
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const baseVertices = [
      [-1,  phi, 0],
      [ 1,  phi, 0],
      [-1, -phi, 0],
      [ 1, -phi, 0],
      [ 0, -1,  phi],
      [ 0,  1,  phi],
      [ 0, -1, -phi],
      [ 0,  1, -phi],
      [ phi, 0, -1],
      [ phi, 0,  1],
      [-phi, 0, -1],
      [-phi, 0,  1]
    ].map(v => {
      const len = Math.hypot(...v);
      return [v[0]/len, v[1]/len, v[2]/len];
    });

    const edges = [
      [0,11],[0,5],[0,1],[0,7],[0,10],
      [1,5],[1,9],[1,8],[1,7],
      [2,11],[2,10],[2,6],[2,4],[2,3],
      [3,9],[3,4],[3,6],[3,8],
      [4,11],[4,5],[4,9],
      [5,9],[5,11],
      [6,10],[6,7],[6,8],
      [7,8],[7,10],
      [8,9],
      [10,11]
    ];

    // Faces for inner warm faceted core
    const faces = [
      [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
      [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
      [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
      [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];

    let rotX = 0.4;
    let rotY = 0.5;
    let rotZ = 0.1;
    let targetRotX = 0.4;
    let targetRotY = 0.5;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseDown = (e) => {
      if (!interactive) return;
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!interactive || !isDragging) return;
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;
      targetRotY += deltaX * 0.012;
      targetRotX += deltaY * 0.012;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 3D rotation and projection functions
    const project = (x, y, z, cx, cy, scale) => {
      const fov = 320;
      const distance = 4.2;
      const zEff = z + distance;
      const factor = fov / zEff;
      return {
        x: cx + x * factor * scale,
        y: cy + y * factor * scale,
        z: zEff
      };
    };

    const rotatePoint = (x, y, z, rx, ry, rz) => {
      // Rotate Y
      let cos = Math.cos(ry);
      let sin = Math.sin(ry);
      let x1 = x * cos + z * sin;
      let z1 = -x * sin + z * cos;

      // Rotate X
      cos = Math.cos(rx);
      sin = Math.sin(rx);
      let y2 = y * cos - z1 * sin;
      let z2 = y * sin + z1 * cos;

      // Rotate Z
      cos = Math.cos(rz);
      sin = Math.sin(rz);
      let x3 = x1 * cos - y2 * sin;
      let y3 = x1 * sin + y2 * cos;

      return [x3, y3, z2];
    };

    let animId;
    let startTime = performance.now();

    const render = () => {
      const time = (performance.now() - startTime) * 0.001;
      
      // Damping
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      // Auto rotation
      const spinSpeed = isSynchronizing ? 0.04 : 0.008;
      rotY += spinSpeed;
      rotZ += 0.003;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseScale = width * 0.28;

      // Pulse calculation
      const pulseSpeed = isSynchronizing ? 7.0 : 2.2;
      const pulseScale = 1 + Math.sin(time * pulseSpeed) * (isSynchronizing ? 0.15 : 0.06);

      // 1. Draw Outer Orbital Glowing Rings
      const ringCount = 3;
      for (let r = 0; r < ringCount; r++) {
        const ringRadius = baseScale * (1.55 + r * 0.25);
        const ringAngle = time * (0.4 + r * 0.2) * (r % 2 === 0 ? 1 : -1);
        const tiltX = 0.8 + r * 0.4;
        const tiltY = r * 0.6;

        ctx.save();
        ctx.beginPath();
        
        for (let a = 0; a <= Math.PI * 2; a += 0.1) {
          const rx = Math.cos(a) * (ringRadius / baseScale);
          const ry = Math.sin(a) * (ringRadius / baseScale);
          const rotated = rotatePoint(rx, ry, 0, tiltX, ringAngle + tiltY, rotZ);
          const p = project(rotated[0], rotated[1], rotated[2], cx, cy, baseScale);
          if (a === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        ctx.closePath();
        ctx.strokeStyle = r === 0 ? 'rgba(140, 211, 212, 0.45)' : r === 1 ? 'rgba(17, 100, 102, 0.6)' : 'rgba(217, 176, 140, 0.4)';
        ctx.lineWidth = r === 0 ? 1.8 : 1.2;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Transform Vertices for Core
      const rotatedOuter = baseVertices.map(v => rotatePoint(v[0] * 1.35, v[1] * 1.35, v[2] * 1.35, rotX, rotY, rotZ));
      const projectedOuter = rotatedOuter.map(v => project(v[0], v[1], v[2], cx, cy, baseScale));

      const innerScale = 0.72 * pulseScale;
      const rotatedInner = baseVertices.map(v => rotatePoint(v[0] * innerScale, v[1] * innerScale, v[2] * innerScale, rotX, rotY, rotZ));
      const projectedInner = rotatedInner.map(v => project(v[0], v[1], v[2], cx, cy, baseScale));

      // 3. Draw Inner Faceted Core with warm lighting (Sand #D9B08C / Peach #FFCB9A)
      // Sort faces by average Z depth for painter's algorithm
      const sortedFaces = faces.map(face => {
        const zAvg = (rotatedInner[face[0]][2] + rotatedInner[face[1]][2] + rotatedInner[face[2]][2]) / 3;
        return { face, zAvg };
      }).sort((a, b) => b.zAvg - a.zAvg);

      sortedFaces.forEach(({ face }) => {
        const p1 = projectedInner[face[0]];
        const p2 = projectedInner[face[1]];
        const p3 = projectedInner[face[2]];

        // Compute normal for shading
        const v1 = rotatedInner[face[0]];
        const v2 = rotatedInner[face[1]];
        const v3 = rotatedInner[face[2]];
        const ax = v2[0] - v1[0], ay = v2[1] - v1[1], az = v2[2] - v1[2];
        const bx = v3[0] - v1[0], by = v3[1] - v1[1], bz = v3[2] - v1[2];
        const nx = ay * bz - az * by;
        const ny = az * bx - ax * bz;
        const nz = ax * by - ay * bx;
        const nlen = Math.hypot(nx, ny, nz) || 1;
        const dot = Math.max(0.15, (nx/nlen * 0.5 + ny/nlen * -0.5 + nz/nlen * 0.7));

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        const alpha = 0.75 + dot * 0.2;
        ctx.fillStyle = `rgba(${Math.floor(217 + dot * 38)}, ${Math.floor(176 + dot * 27)}, ${Math.floor(140 + dot * 14)}, ${alpha})`;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 203, 154, 0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      });

      // 4. Draw Outer Teal Geodesic Wireframe (#116466 & #8cd3d4)
      edges.forEach(([i, j]) => {
        const p1 = projectedOuter[i];
        const p2 = projectedOuter[j];
        const zAvg = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.2, Math.min(0.9, 1.2 - (zAvg - 3.2) * 0.5));

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(140, 211, 212, ${alpha})`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = '#116466';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      });

      // 5. Draw Outer Nodes (Glowing Teal Dots)
      projectedOuter.forEach((p) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#8cd3d4';
        ctx.shadowColor = '#8cd3d4';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSynchronizing, interactive]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        userSelect: 'none'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '320px',
          height: '320px',
          maxWidth: '100%',
          display: 'block'
        }}
        id="solarin-3d-canvas-container"
      />

      {/* Interactive HUD Readout overlay on hover */}
      {hovered && (
        <div 
          style={{
            position: 'absolute',
            bottom: '-28px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(13, 21, 18, 0.95)',
            border: '1px solid #116466',
            padding: '4px 12px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.15em',
            color: '#8cd3d4',
            textTransform: 'uppercase',
            borderRadius: '4px',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 15px rgba(17, 100, 102, 0.5)'
          }}
        >
          AETHERIC QUANTUM CORE // {isSynchronizing ? 'CALIBRATING...' : 'ONLINE (DRAG TO ROTATE)'}
        </div>
      )}
    </div>
  );
}
