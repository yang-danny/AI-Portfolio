'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  screenX: number;
  screenY: number;
  scale: number;
  color: string;
  type: 'node' | 'data';
  pulse: number;
  pulseSpeed: number;
  connected: boolean;
}

// Enhanced particle interface with types
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  type: 'spark' | 'ember' | 'ripple';
  size: number;
  life: number;
  maxLife: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]); // Add particles ref
  const mouseRef = useRef({ x: 9999, y: 9999 });
  const mouseTrailRef = useRef<{x: number, y: number}[]>([]); // Mouse trail for fire effect
  const rotationRef = useRef({ x: 0, y: 0, autoY: 0.0002 }); // Slower spin
  
  // Sunrise animation state
  const sunriseRef = useRef({ 
    yOffset: 800, // Start from below viewport
    blur: 15, // Start with heavy blur
    startTime: Date.now(),
    duration: 3000 // 3 second animation
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const initNodes = () => {
      nodesRef.current = [];
      const nodeCount = 180;
      const colors = ['#00f3ff', '#bd00ff', '#0066ff'];
      
      for (let i = 0; i < nodeCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / nodeCount);
        const theta = Math.sqrt(nodeCount * Math.PI) * phi;
        
        const radius = 400; // Bigger sphere
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        nodesRef.current.push({
          x, y, z,
          vx: 0, vy: 0, vz: 0,
          baseX: x, baseY: y, baseZ: z,
          screenX: 0, screenY: 0, scale: 1,
          color: colors[i % colors.length],
          type: Math.random() > 0.8 ? 'data' : 'node',
          pulse: Math.random() * Math.PI,
          pulseSpeed: 0.01 + Math.random() * 0.01, // Slower pulse
          connected: false
        });
      }
    };

    if (nodesRef.current.length === 0) {
      initNodes();
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newMousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      // No continuous mouse trail - removed for performance
      
      mouseRef.current = newMousePos;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      rotationRef.current.x = (e.clientY - rect.top - centerY) * 0.0001;
    };

    const handleMouseOut = () => {
      mouseRef.current = { x: 9999, y: 9999 };
      rotationRef.current.x = 0;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseout', handleMouseOut);

    const project = (x: number, y: number, z: number, width: number, height: number) => {
      const perspective = 800; // Increased perspective for larger canvas
      const scale = perspective / (perspective + z);
      return {
        x: x * scale + width / 2,
        y: y * scale + height / 2 + sunriseRef.current.yOffset, // Apply sunrise Y offset
        scale
      };
    };

    const rotateY = (x: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: x * cos - z * sin, z: x * sin + z * cos };
    };

    const rotateX = (y: number, z: number, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { y: y * cos - z * sin, z: y * sin + z * cos };
    };

    let frame = 0;
    const animate = () => {
      frame++;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Update sunrise animation
      const elapsed = Date.now() - sunriseRef.current.startTime;
      const progress = Math.min(1, elapsed / sunriseRef.current.duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic for smooth deceleration
      
      sunriseRef.current.yOffset = 800 * (1 - easeProgress); // Rise from bottom
      sunriseRef.current.blur = 15 * (1 - easeProgress); // Blur from 15 to 0

      // Apply blur filter during animation
      ctx.filter = `blur(${sunriseRef.current.blur}px)`;
      
      ctx.clearRect(0, 0, width, height);

      // Reset filter for drawing
      ctx.filter = 'none';
      
      // Re-apply blur for 3D elements
      ctx.filter = `blur(${sunriseRef.current.blur}px)`;

      rotationRef.current.y += rotationRef.current.autoY;
      
      const nodes = nodesRef.current;
      
      nodes.forEach(node => {
        node.pulse += node.pulseSpeed;

        const dx = mouseRef.current.x - node.screenX;
        const dy = mouseRef.current.y - node.screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const interactRadius = 250;
        
        if (dist < interactRadius) {
          const force = (interactRadius - dist) / interactRadius;
          node.vx += (dx / dist) * force * 1.5;
          node.vy += (dy / dist) * force * 1.5;
          node.connected = true;

          // Minimal proximity effects - only on very close contact
          if (dist < 30 && Math.random() > 0.98) { // Very rare - 2% chance, very close
            // Tiny spark burst
            for (let i = 0; i < 3; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 3 + 1;
              
              particlesRef.current.push({
                x: node.screenX,
                y: node.screenY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: node.color,
                type: 'spark',
                size: Math.random() * 2 + 0.5,
                life: 25,
                maxLife: 25
              });
            }
          }
        } else {
          node.connected = false;
        }

        node.vx += (node.baseX - node.x) * 0.02;
        node.vy += (node.baseY - node.y) * 0.02;
        node.vz += (node.baseZ - node.z) * 0.02;
        
        node.vx *= 0.92;
        node.vy *= 0.92;
        node.vz *= 0.92;

        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        
        let { x, z } = rotateY(node.x, node.z, rotationRef.current.y);
        let { y, z: newZ } = rotateX(node.y, z, rotationRef.current.x);

        const projected = project(x, y, newZ, width, height);
        node.screenX = projected.x;
        node.screenY = projected.y;
        node.scale = projected.scale;
      });
      
      // Update and draw particles with enhanced effects
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        
        // Different physics for different particle types
        if (p.type === 'ember') {
          p.vy += 0.15; // Gravity for embers (falling)
          p.vx *= 0.98;
          p.vy *= 0.98;
        } else if (p.type === 'spark') {
          p.vx *= 0.95; // More friction for sparks
          p.vy *= 0.95;
          p.vy += 0.05; // Slight gravity
        } else if (p.type === 'ripple') {
          p.vx *= 0.92; // Ripples expand and fade
          p.vy *= 0.92;
        }
        
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.alpha = Math.max(0, p.life / p.maxLife);

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx.globalAlpha = p.alpha;
          
          // Different rendering for different types
          if (p.type === 'ripple') {
            // Expanding ring effect - ensure positive radius
            const rippleSize = Math.max(0.1, p.size * (1 + (1 - p.alpha) * 3));
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(p.x, p.y, rippleSize, 0, Math.PI * 2);
            ctx.stroke();
          } else if (p.type === 'ember') {
            // Glowing ember with trail - ensure positive radius
            const emberSize = Math.max(0.1, p.size);
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, emberSize * 2);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(0.5, p.color + '80');
            gradient.addColorStop(1, p.color + '00');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, emberSize * 2, 0, Math.PI * 2);
            ctx.fill();
            
            // Core
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, emberSize * 0.6, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Spark - sharp and bright - ensure positive radius
            const sparkSize = Math.max(0.1, p.size * p.alpha);
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, sparkSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
      
      // Reset filter before drawing particles (they should remain sharp)
      ctx.filter = 'none';
      ctx.globalAlpha = 1;

      const sortedNodes = [...nodes].sort((a, b) => b.scale - a.scale);

      ctx.lineWidth = 1; // Slightly thicker lines
      const maxDist = 150; // Increased distance for connections
      
      if (mouseRef.current.x < 9000) {
        sortedNodes.forEach(node => {
          if (node.connected && node.scale > 0) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * node.scale})`;
            ctx.moveTo(mouseRef.current.x, mouseRef.current.y);
            ctx.lineTo(node.screenX, node.screenY);
            ctx.stroke();
          }
        });
      }

      for (let i = 0; i < sortedNodes.length; i++) {
        for (let j = i + 1; j < sortedNodes.length; j++) {
          const n1 = sortedNodes[i];
          const n2 = sortedNodes[j];
          if(n1.scale <= 0 || n2.scale <= 0) continue;

          const dx = n1.screenX - n2.screenX;
          const dy = n1.screenY - n2.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < maxDist) {
            const pulseOpacity = (Math.sin(frame * 0.005) + 1) * 0.5 * 0.3; // Slower breath
            const opacity = (1 - dist / maxDist) * 0.4 * (n1.scale + n2.scale) * 0.5;
            
            ctx.strokeStyle = n1.color === n2.color 
              ? `${n1.color}${Math.round((opacity + pulseOpacity) * 255).toString(16).padStart(2, '0')}`
              : `rgba(100, 200, 255, ${opacity})`;
            
            ctx.beginPath();
            ctx.moveTo(n1.screenX, n1.screenY);
            ctx.lineTo(n2.screenX, n2.screenY);
            ctx.stroke();
          }
        }
      }
      
      sortedNodes.forEach(node => {
        if (node.scale <= 0) return;
        
        const alpha = Math.min(1, node.scale * 1.5);
        
        const size = node.type === 'data' 
          ? 4 * node.scale // Bigger data nodes
          : 3 * node.scale * (1 + Math.sin(node.pulse) * 0.3); // Bigger nodes

        const gradient = ctx.createRadialGradient(
          node.screenX, node.screenY, 0,
          node.screenX, node.screenY, size * 2
        );
        gradient.addColorStop(0, `${node.color}${Math.round(alpha * 200).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${node.color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = node.color;
        if (node.type === 'data') {
           ctx.save();
           ctx.translate(node.screenX, node.screenY);
           ctx.rotate(frame * 0.05); // Slower spin for data packets
           ctx.fillRect(-size/2, -size/2, size, size);
           ctx.restore();
        } else {
           ctx.beginPath();
           ctx.arc(node.screenX, node.screenY, size * 0.4, 0, Math.PI * 2);
           ctx.fill();
         }
      });
      
      // Reset filter at end of frame
      ctx.filter = 'none';

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className=" absolute inset-0 w-full h-full pointer-events-auto bg-dark-800 overflow-hidden "   
    />
     
  );
}
