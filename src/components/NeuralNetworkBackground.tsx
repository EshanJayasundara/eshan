"use client";

import { useEffect, useRef } from "react";

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let animationFrameId: number;
    let connections: { from: Node; to: Node }[] = [];
    let mouse = { x: -1000, y: -1000 };

    const updateDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      initNetwork(w, h);
    };

    class Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      phase: number;

      size: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.phase = Math.random() * Math.PI * 2;
        this.size = 2 + Math.random() * 2;
      }

      update() {
        // Gentle hovering motion
        this.phase += 0.02;
        const hoverX = this.baseX + Math.cos(this.phase) * 10;
        const hoverY = this.baseY + Math.sin(this.phase) * 10;

        // Mouse repulsion
        const dx = mouse.x - hoverX;
        const dy = mouse.y - hoverY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = 150;

        if (distance < radius) {
          const force = (radius - distance) / radius;
          const angle = Math.atan2(dy, dx);
          this.x = hoverX - Math.cos(angle) * force * 50;
          this.y = hoverY - Math.sin(angle) * force * 50;
        } else {
          this.x = hoverX;
          this.y = hoverY;
        }
      }

      draw() {
        if (!ctx) return;
        
        // Mouse proximity effect
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseGlow = Math.max(0, 1 - distance / 150);
        
        // Pulsing glow
        const pulseEffect = Math.sin(this.phase * 2) * 0.5 + 0.5;
        const glowSize = this.size * (2 + pulseEffect + mouseGlow * 2);

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowSize);
        gradient.addColorStop(0, `rgba(66, 133, 244, ${0.5 + mouseGlow * 0.4})`);
        gradient.addColorStop(1, "rgba(66, 133, 244, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(66, 133, 244, ${0.8 + mouseGlow * 0.2})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size + mouseGlow, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Pulse {
      from: Node;
      to: Node;
      progress: number;
      speed: number;
      active: boolean;

      constructor(from: Node, to: Node) {
        this.from = from;
        this.to = to;
        this.progress = 0;
        this.speed = 0.02 + Math.random() * 0.02;
        this.active = true;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.active = false;
        }
      }

      draw() {
        if (!ctx || !this.active) return;
        const x = this.from.x + (this.to.x - this.from.x) * this.progress;
        const y = this.from.y + (this.to.y - this.from.y) * this.progress;

        // Draw tail (comet effect)
        const tailSegments = 8;
        for (let i = 0; i < tailSegments; i++) {
          const t = Math.max(0, this.progress - (i * 0.015));
          const tx = this.from.x + (this.to.x - this.from.x) * t;
          const ty = this.from.y + (this.to.y - this.from.y) * t;
          const alpha = (1 - i / tailSegments) * 0.5;
          const size = 2 * (1 - i / tailSegments);
          
          ctx.fillStyle = `rgba(155, 114, 203, ${alpha})`;
          ctx.beginPath();
          ctx.arc(tx, ty, size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Glowing head
        const headGlow = ctx.createRadialGradient(x, y, 0, x, y, 6);
        headGlow.addColorStop(0, "rgba(155, 114, 203, 0.8)");
        headGlow.addColorStop(1, "rgba(155, 114, 203, 0)");
        
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#9b72cb";
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initNetwork = (w: number, h: number) => {
      nodes = [];
      connections = [];
      pulses = [];

      const HORIZONTAL_SPACING = 80;
      const VERTICAL_SPACING = 100;
      
      // Calculate how many layers we need to cover the width plus extra for bleed on both sides
      const visibleLayers = Math.ceil(w / HORIZONTAL_SPACING);
      const layerCount = visibleLayers + 4; // 2 extra for left, 2 extra for right
      const nodesPerLayer = Math.floor(h / VERTICAL_SPACING) + 6;
      
      // We want to spread these layers from -2 to visibleLayers + 1
      const actualLayerSpacing = HORIZONTAL_SPACING; 
      const actualNodeSpacing = (h + 200) / (nodesPerLayer - 1);

      // We use layer indices from -2 to visibleLayers + 1
      for (let i = -2; i < visibleLayers + 2; i++) {
        for (let j = 0; j < nodesPerLayer; j++) {
          const x = i * actualLayerSpacing + (i % 2 === 0 ? 20 : 0);
          const y = (j * actualNodeSpacing - 100) + (Math.random() - 0.5) * 40;
          nodes.push(new Node(x, y));
        }
      }

      // Create Connections (Feed Forward)
      // Connect each node in layer i to nodes in layer i+1
      // Total layers generated above is (visibleLayers + 2) - (-2) = visibleLayers + 4
      const actualTotalLayers = visibleLayers + 4;
      for (let i = 0; i < actualTotalLayers - 1; i++) {
        const currentLayerStart = i * nodesPerLayer;
        const nextLayerStart = (i + 1) * nodesPerLayer;

        for (let j = 0; j < nodesPerLayer; j++) {
          const currentNode = nodes[currentLayerStart + j];
          if (!currentNode) continue;
          
          const isMobileCheck = canvas.width < 768;
          const connectionsBase = isMobileCheck ? 1 : 2;
          const connectionsCount = connectionsBase + Math.floor(Math.random() * 2);
          const offsets = [-1, 0, 1];
          
          const usedTargets = new Set();
          for (let k = 0; k < connectionsCount; k++) {
            const offset = offsets[Math.floor(Math.random() * offsets.length)];
            const targetIndex = Math.max(0, Math.min(nodesPerLayer - 1, j + offset));
            
            if (!usedTargets.has(targetIndex)) {
              const targetNode = nodes[nextLayerStart + targetIndex];
              if (targetNode) {
                connections.push({ from: currentNode, to: targetNode });
                usedTargets.add(targetIndex);
              }
            }
          }
        }
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // Update and Draw Nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Draw Static Connections
      connections.forEach(conn => {
        const gradient = ctx.createLinearGradient(conn.from.x, conn.from.y, conn.to.x, conn.to.y);
        gradient.addColorStop(0, "rgba(66, 133, 244, 0.3)");
        gradient.addColorStop(1, "rgba(155, 114, 203, 0.3)");
        
        ctx.strokeStyle = gradient;
        const isDark = document.documentElement.classList.contains("dark");
        ctx.lineWidth = isDark ? 1.5 : 0.8;
        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.stroke();
      });

      // Randomly spawn pulses
      if (Math.random() < 0.1 && connections.length > 0) {
        const randomConn = connections[Math.floor(Math.random() * connections.length)];
        pulses.push(new Pulse(randomConn.from, randomConn.to));
      }

      // Update and Draw Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.update();
        pulse.draw();
        if (!pulse.active) {
          pulses.splice(i, 1);
          // Trigger next pulse? Maybe for chain reaction, but random spawn is simpler for background
           if (Math.random() < 0.5) {
             // Find connections starting from the pulse's destination
             const nextConns = connections.filter(c => c.from === pulse.to);
             if (nextConns.length > 0) {
                const nextConn = nextConns[Math.floor(Math.random() * nextConns.length)];
                pulses.push(new Pulse(nextConn.from, nextConn.to));
             }
           }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    resizeObserver.observe(container);
    updateDimensions();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-50 dark:opacity-60"
    />
  );
}
