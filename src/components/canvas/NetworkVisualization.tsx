import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
}

export function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width || 400;
      height = rect?.height || 500;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
    }

    function initNodes() {
      const count = reduced ? 12 : 22;
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update nodes
      nodes.forEach((n) => {
        if (!reduced) {
          // Subtle mouse influence
          const dx = mx - n.x;
          const dy = my - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            n.vx += (dx / dist) * 0.015;
            n.vy += (dy / dist) * 0.015;
          }

          // Dampen
          n.vx *= 0.98;
          n.vy *= 0.98;

          n.x += n.vx;
          n.y += n.vy;

          // Boundary bounce
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
        }
      });

      // Draw connections
      const maxDist = 110;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(99, 102, 241, ${alpha})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${alpha})`);
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = reduced ? 0 : Math.sin(t * 0.002 + n.pulsePhase) * 0.4;
        const alpha = Math.max(0.1, Math.min(1, n.opacity + pulse));
        const r = n.radius + (reduced ? 0 : Math.sin(t * 0.002 + n.pulsePhase) * 0.8);

        // Glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grd.addColorStop(0, `rgba(99, 102, 241, ${alpha * 0.8})`);
        grd.addColorStop(0.5, `rgba(139, 92, 246, ${alpha * 0.3})`);
        grd.addColorStop(1, `rgba(139, 92, 246, 0)`);
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ambient glow orb
      if (!reduced) {
        const orbX = width * 0.5 + Math.sin(t * 0.0008) * 50;
        const orbY = height * 0.4 + Math.cos(t * 0.0006) * 40;
        const grd = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 150);
        grd.addColorStop(0, `rgba(99, 102, 241, 0.08)`);
        grd.addColorStop(1, `rgba(99, 102, 241, 0)`);
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(orbX, orbY, 150, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
