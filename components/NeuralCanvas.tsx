'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  screenX: number;
  screenY: number;
  scale: number;
  color: string;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes in 3D space (sphere distribution)
    const initNodes = () => {
      const nodeCount = 50;
      const colors = ['#00d9ff', '#a855f7', '#3b82f6'];
      
      for (let i = 0; i < nodeCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        
        const radius = 150;
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        nodesRef.current.push({
          x,
          y,
          z,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          vz: (Math.random() - 0.5) * 0.2,
          screenX: 0,
          screenY: 0,
          scale: 1,
          color: colors[i % colors.length]
        });
      }
    };

    if (nodesRef.current.length === 0) {
      initNodes();
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Project 3D to 2D
    const project = (x: number, y: number, z: number, width: number, height: number) => {
      const perspective = 400;
      const scale = perspective / (perspective + z);
      return {
        x: x * scale + width / 2,
        y: y * scale + height / 2,
        scale
      };
    };

    // Rotate point around origin
    const rotateY = (x: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos - z * sin,
        z: x * sin + z * cos
      };
    };

    const rotateX = (y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        y: y * cos - z * sin,
        z: y * sin + z * cos
      };
    };

    // Animation loop
    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Update rotation based on mouse and auto-rotation
      rotationRef.current.y += 0.003 + mouseRef.current.x * 0.001;
      rotationRef.current.x += mouseRef.current.y * 0.001;

      // Update and draw nodes
      const nodes = nodesRef.current;
      
      // Update positions and project to 2D
      nodes.forEach(node => {
        // Apply slight movement
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Rotation
        let { x, z } = rotateY(node.x, node.z, rotationRef.current.y);
        let { y, z: newZ } = rotateX(node.y, z, rotationRef.current.x);

        // Project to 2D
        const projected = project(x, y, newZ, width, height);
        node.screenX = projected.x;
        node.screenY = projected.y;
        node.scale = projected.scale;
      });

      // Sort by z-index for proper layering
      const sortedNodes = [...nodes].sort((a, b) => b.scale - a.scale);

      // Draw connections
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.15)';
      ctx.lineWidth = 1;
      
      const maxDistance = 120;
      for (let i = 0; i < sortedNodes.length; i++) {
        for (let j = i + 1; j < sortedNodes.length; j++) {
          const dx = sortedNodes[i].screenX - sortedNodes[j].screenX;
          const dy = sortedNodes[i].screenY - sortedNodes[j].screenY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(sortedNodes[i].screenX, sortedNodes[i].screenY);
            ctx.lineTo(sortedNodes[j].screenX, sortedNodes[j].screenY);
            ctx.stroke();
          }
        }
      }

      // Draw nodes (only those in front of camera)
      sortedNodes.forEach(node => {
        // Skip nodes behind the camera
        if (node.scale <= 0) return;
        
        const size = 3 * node.scale;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.screenX, node.screenY, 0,
          node.screenX, node.screenY, size * 3
        );
        gradient.addColorStop(0, node.color + '80');
        gradient.addColorStop(1, node.color + '00');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          node.screenX - size * 3,
          node.screenY - size * 3,
          size * 6,
          size * 6
        );
        
        // Core node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
