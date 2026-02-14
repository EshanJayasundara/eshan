"use client";

import { useEffect, useRef } from "react";

export default function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let animationFrameId: number;
    let connections: { from: Node; to: Node }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
        this.x = this.baseX + Math.cos(this.phase) * 10;
        this.y = this.baseY + Math.sin(this.phase) * 10;
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

      const isMobile = canvas.width < 768;
      const layerCount = Math.ceil(canvas.width / (isMobile ? 150 : 200)) + 1;
      const nodesPerLayer = isMobile ? 4 : 8;
      const layerSpacing = canvas.width / (layerCount - 1);

      // Create Nodes arranged in layers
      for (let i = 0; i < layerCount; i++) {
        for (let j = 0; j < nodesPerLayer; j++) {
          const x = i * layerSpacing + (i % 2 === 0 ? 30 : 0); // Slight zigzag offset
          const y = (canvas.height / (nodesPerLayer + 1)) * (j + 1) + (Math.random() - 0.5) * 50;
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
          
          // Connect to random nodes in next layer (fewer for mobile)
          const connectionsBase = isMobile ? 1 : 2;
          const connectionsCount = connectionsBase + Math.floor(Math.random() * 2);
          
          for (let k = 0; k < connectionsCount; k++) {
            const targetIndex = Math.floor(Math.random() * nodesPerLayer);
            const targetNode = nodes[nextLayerStart + targetIndex];
            connections.push({ from: currentNode, to: targetNode });
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
      if (Math.random() < 0.1) {
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

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-40"
    />
  );
}
