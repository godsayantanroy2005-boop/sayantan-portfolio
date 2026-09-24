import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function NeuralNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let scrollY = window.scrollY;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    class Node {
      x: number;
      y: number;
      z: number; // 1 (far), 2 (mid), 3 (near)
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * (height * 3); // Spread across scrollable area
        
        const rand = Math.random();
        if (rand < 0.5) {
          this.z = 1; // Far (50%)
          this.radius = Math.random() * 0.8 + 0.2;
          this.baseAlpha = 0.2;
        } else if (rand < 0.9) {
          this.z = 2; // Mid (40%)
          this.radius = Math.random() * 1.2 + 0.8;
          this.baseAlpha = 0.4;
        } else {
          this.z = 3; // Near (10%)
          this.radius = Math.random() * 2 + 1.5;
          this.baseAlpha = 0.6;
        }

        const speedMult = reducedMotion ? 0.05 : (this.z * 0.15);
        this.vx = (Math.random() - 0.5) * speedMult;
        this.vy = (Math.random() - 0.5) * speedMult;
      }

      update() {
        if (reducedMotion) return;
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around horizontally
        if (this.x < -100) this.x = width + 100;
        if (this.x > width + 100) this.x = -100;
        // Wrap vertically across a massive virtual height
        if (this.y < -100) this.y = height * 4;
        if (this.y > height * 4) this.y = -100;
      }
    }

    const nodeCount = Math.min(Math.floor((width * height) / 12000), 200);
    const nodes = Array.from({ length: nodeCount }, () => new Node());
    const pulses: { source: Node, target: Node, progress: number, speed: number }[] = [];

    let animationFrameId: number;

    const render = () => {
      // Lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Dark background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // Create a gradient atmosphere
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height)
      );
      gradient.addColorStop(0, "rgba(20, 20, 35, 0.4)");
      gradient.addColorStop(1, "rgba(5, 5, 5, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      nodes.forEach(node => node.update());

      // Mouse offset calculation
      const mouseOffsetX = (mouseX - width / 2) * 0.05;
      const mouseOffsetY = (mouseY - height / 2) * 0.05;

      // Draw Lines & Pulses
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.z === 1) continue; // Far nodes don't connect

        const ax = a.x - (mouseOffsetX * a.z);
        const ay = a.y - (scrollY * a.z * 0.15) - (mouseOffsetY * a.z);

        // Only process nodes somewhat visible
        if (ay < -200 || ay > height + 200) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.z === 1) continue;
          if (a.z !== b.z) continue; // Connect only same depth layer for neatness

          const bx = b.x - (mouseOffsetX * b.z);
          const by = b.y - (scrollY * b.z * 0.15) - (mouseOffsetY * b.z);

          const dx = ax - bx;
          const dy = ay - by;
          const distSq = dx * dx + dy * dy;

          const maxDist = a.z === 3 ? 20000 : 15000;

          if (distSq < maxDist) {
            const alpha = (1 - distSq / maxDist) * 0.25;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();

            // Randomly spawn pulse
            if (!reducedMotion && Math.random() < 0.0001 && pulses.length < 5) {
               pulses.push({ source: a, target: b, progress: 0, speed: Math.random() * 0.01 + 0.01 });
            }
          }
        }
      }

      // Update & Draw Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        
        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const sourceX = p.source.x - (mouseOffsetX * p.source.z);
        const sourceY = p.source.y - (scrollY * p.source.z * 0.15) - (mouseOffsetY * p.source.z);
        const targetX = p.target.x - (mouseOffsetX * p.target.z);
        const targetY = p.target.y - (scrollY * p.target.z * 0.15) - (mouseOffsetY * p.target.z);

        const x = sourceX + (targetX - sourceX) * p.progress;
        const y = sourceY + (targetY - sourceY) * p.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167, 139, 250, 0.9)";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#a78bfa";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      // Draw Nodes
      nodes.forEach(node => {
        const nx = node.x - (mouseOffsetX * node.z);
        const ny = node.y - (scrollY * node.z * 0.15) - (mouseOffsetY * node.z);

        // Culling
        if (nx < -50 || nx > width + 50 || ny < -50 || ny > height + 50) return;

        ctx.beginPath();
        ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
        
        let color = "rgba(255, 255, 255,";
        if (node.z === 3) color = "rgba(99, 102, 241,"; // Near nodes are slightly indigo

        const pulseOffset = !reducedMotion ? Math.sin(Date.now() * 0.002 + node.x) * 0.2 : 0;
        const finalAlpha = Math.max(0.05, Math.min(1, node.baseAlpha + pulseOffset));

        ctx.fillStyle = `${color}${finalAlpha})`;
        
        if (node.z === 3) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#6366f1";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-50"
      aria-hidden="true"
    />
  );
}
