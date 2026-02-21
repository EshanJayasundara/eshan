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
      const isMobile = window.innerWidth < 768;
      const offsetTop = isMobile ? 96 : 128; // Matches parent pt-24 and pt-32
      const offsetBottom = 96; // Matches parent mb-24
      
      canvas.width = window.innerWidth;
      canvas.height = container.offsetHeight + offsetTop + offsetBottom;
      initNetwork();
    };

    class Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      phase: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.phase = Math.random() * Math.PI * 2;
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
        ctx.fillStyle = "rgba(66, 133, 244, 0.6)"; // Blue
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
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

        ctx.fillStyle = "#9b72cb"; // Purple pulse
        ctx.beginPath();
        // Draw a glowing head
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initNetwork = () => {
      nodes = [];
      connections = [];
      pulses = [];

      const HORIZONTAL_SPACING = 80; // px between layers
      const VERTICAL_SPACING = 100;  // px between nodes in a layer
      
      const layerCount = Math.floor(canvas.width / HORIZONTAL_SPACING) + 2;
      const nodesPerLayer = Math.floor(canvas.height / VERTICAL_SPACING) + 1;
      const actualLayerSpacing = canvas.width / (layerCount - 1);
      const actualNodeSpacing = canvas.height / (nodesPerLayer + 1);

      // Create Nodes arranged in layers
      for (let i = 0; i < layerCount; i++) {
        for (let j = 0; j < nodesPerLayer; j++) {
          const x = i * actualLayerSpacing + (i % 2 === 0 ? 20 : 0);
          const y = actualNodeSpacing * (j + 1) + (Math.random() - 0.5) * 40;
          nodes.push(new Node(x, y));
        }
      }

      // Create Connections (Feed Forward)
      // Connect each node in layer i to some nodes in layer i+1
      for (let i = 0; i < layerCount - 1; i++) {
        const currentLayerStart = i * nodesPerLayer;
        const nextLayerStart = (i + 1) * nodesPerLayer;

        for (let j = 0; j < nodesPerLayer; j++) {
          const currentNode = nodes[currentLayerStart + j];
          
          // Connect to nearby nodes in next layer (prevents lengthy edges)
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and Draw Nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      // Draw Static Connections
      ctx.strokeStyle = "rgba(66, 133, 244, 0.15)"; // Faint blue lines
      ctx.lineWidth = 2;
      connections.forEach(conn => {
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
      className="absolute left-1/2 -translate-x-1/2 -top-24 md:-top-32 w-screen z-0 pointer-events-none opacity-40"
    />
  );
}
