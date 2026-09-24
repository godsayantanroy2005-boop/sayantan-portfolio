import { useEffect, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function LivingAIUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  const cursorX = useSpring(0, { stiffness: 150, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let targetScroll = window.scrollY;
    let currentScroll = targetScroll;
    let previousScroll = currentScroll;
    let scrollVelocity = 0;
    let scrollProgress = 0;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let parallaxX = 0;
    let parallaxY = 0;

    let globalRotation = 0;
    let time = 0;

    // Throttled resize
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) return;
      resizeTimer = requestAnimationFrame(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        resizeTimer = null;
      });
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const isMobile = width < 768;

    // ==========================================
    // 3D PROJECTION (inlined for perf)
    // ==========================================
    const focalLength = isMobile ? 500 : 800;

    // ==========================================
    // STAR FIELD — reduced counts
    // ==========================================
    const STAR_COUNT = isMobile ? 100 : 250;
    const starWx = new Float32Array(STAR_COUNT);
    const starWy = new Float32Array(STAR_COUNT);
    const starWz = new Float32Array(STAR_COUNT);
    const starSize = new Float32Array(STAR_COUNT);
    const starAlpha = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      starWx[i] = (Math.random() - 0.5) * 6000;
      starWy[i] = (Math.random() - 0.5) * 6000;
      starWz[i] = (Math.random() - 0.5) * 8000;
      starSize[i] = Math.random() * 1.5 + 0.5;
      starAlpha[i] = Math.random() * 0.8 + 0.1;
    }

    // ==========================================
    // SOLAR SYSTEM
    // ==========================================
    const planetNames = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune"];
    const planetRadius = isMobile
      ? [180,300,450,600,900,1260,1620,1980]
      : [300,500,750,1000,1500,2100,2700,3300];
    const planetSpeed = [0.008,0.006,0.005,0.004,0.002,0.0015,0.001,0.0008];
    const planetSize = isMobile
      ? [2.8,4.2,4.9,3.5,12.6,9.8,7,6.3]
      : [4,6,7,5,18,14,10,9];
    const planetC1 = ["#94A3B8","#D97706","#00D9FF","#EA580C","#4F46E5","#7C3AED","#22D3EE","#2563FF"];
    const planetC2 = ["#334155","#451A03","#1E3A8A","#7C2D12","#1E1B4B","#2E1065","#0F766E","#1E3A8A"];
    const planetBaseAngle = new Float32Array(8);
    for (let i = 0; i < 8; i++) planetBaseAngle[i] = Math.random() * Math.PI * 2;
    const saturnIdx = 5;

    // ==========================================
    // NEURAL NETWORK — reduced
    // ==========================================
    const NODE_COUNT = isMobile ? 20 : 40;
    const nodeX = new Float32Array(NODE_COUNT);
    const nodeY = new Float32Array(NODE_COUNT);
    const nodeOX = new Float32Array(NODE_COUNT);
    const nodeOY = new Float32Array(NODE_COUNT);
    const nodeVX = new Float32Array(NODE_COUNT);
    const nodeVY = new Float32Array(NODE_COUNT);
    const nodeR = new Float32Array(NODE_COUNT);
    const nodeA = new Float32Array(NODE_COUNT);
    
    for (let i = 0; i < NODE_COUNT; i++) {
      nodeOX[i] = Math.random() * width;
      nodeOY[i] = Math.random() * (height * 3);
      nodeR[i] = Math.random() * 1.5 + 0.5;
      nodeA[i] = Math.random() * 0.4 + 0.1;
      nodeVX[i] = (Math.random() - 0.5) * 0.05;
      nodeVY[i] = (Math.random() - 0.5) * 0.05;
    }

    // ==========================================
    // RENDER LOOP — optimized, no closures/sort
    // ==========================================
    let animationFrameId: number;
    const TWO_PI = Math.PI * 2;

    const render = () => {
      time += 1;

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      currentScroll += (targetScroll - currentScroll) * (isMobile ? 0.12 : 0.08);
      scrollVelocity = currentScroll - previousScroll;
      previousScroll = currentScroll;
      
      scrollProgress = Math.max(0, Math.min(1, currentScroll / maxScroll));

      if (!isMobile && !reducedMotion) {
        parallaxX += ((mouseX / width - 0.5) * 2 - parallaxX) * 0.05;
        parallaxY += ((mouseY / height - 0.5) * 2 - parallaxY) * 0.05;
      }

      if (!reducedMotion) {
        globalRotation = (scrollProgress * Math.PI) + (time * 0.0002) + (scrollVelocity * 0.0005);
      }

      // Camera
      const camX = parallaxX * 200;
      const camY = parallaxY * 200 - 400 + (scrollProgress * 600); 
      const camZ = reducedMotion ? -1200 : -2800 + (scrollProgress * 2200);
      const tilt = reducedMotion ? 0.4 : 0.7 - (scrollProgress * 0.55);
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      // Clear
      ctx.fillStyle = "#030408";
      ctx.fillRect(0, 0, width, height);

      // ---- STARS (batched, no renderQueue) ----
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      for (let i = 0; i < STAR_COUNT; i++) {
        // Wrap stars
        let wz = starWz[i];
        if (wz - camZ < -1500) { wz += 8000; starWz[i] = wz; }
        else if (wz - camZ > 6500) { wz -= 8000; starWz[i] = wz; }

        // Inline project3D
        const rz_raw = wz - camZ;
        const tz = (starWy[i] - camY) * sinT + rz_raw * cosT;
        if (tz < -focalLength + 10) continue;

        const scale = focalLength / (focalLength + tz);
        const sx = width / 2 + (starWx[i] - camX) * scale;
        const sy = height / 2 + ((starWy[i] - camY) * cosT - rz_raw * sinT) * scale;

        // Skip offscreen
        if (sx < -10 || sx > width + 10 || sy < -10 || sy > height + 10) continue;

        const distAlpha = 1 - tz / 6000;
        if (distAlpha <= 0) continue;
        const finalAlpha = starAlpha[i] * distAlpha * (0.5 + Math.sin(time * 0.02 + wz) * 0.5);
        if (finalAlpha < 0.02) continue;

        ctx.globalAlpha = finalAlpha;
        ctx.beginPath();
        ctx.arc(sx, sy, starSize[i] * scale, 0, TWO_PI);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ---- SUN ----
      const sunRz = -camZ;
      const sunTz = (-camY) * sinT + sunRz * cosT;
      let sunSx = 0, sunSy = 0, sunScale = 0;
      if (sunTz > -focalLength + 10) {
        sunScale = focalLength / (focalLength + sunTz);
        sunSx = width / 2 + (-camX) * sunScale;
        sunSy = height / 2 + ((-camY) * cosT - sunRz * sinT) * sunScale;

        const size = (isMobile ? 35 : 60) * sunScale;
        const grad = ctx.createRadialGradient(sunSx, sunSy, 0, sunSx, sunSy, size * 2.5);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.1, "rgba(0,217,255,0.9)");
        grad.addColorStop(0.4, "rgba(37,99,255,0.4)");
        grad.addColorStop(1, "rgba(37,99,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sunSx, sunSy, size * 3, 0, TWO_PI);
        ctx.fill();
      }

      // ---- ORBITAL RINGS + PLANETS ----
      for (let i = 0; i < 8; i++) {
        const r = planetRadius[i];

        // Draw orbital ring
        if (sunScale > 0) {
          const ringAlpha = (isMobile ? 0.03 : 0.06) * sunScale;
          if (ringAlpha > 0.005) {
            ctx.beginPath();
            ctx.ellipse(sunSx, sunSy, r * sunScale, r * sunScale * sinT, 0, 0, TWO_PI);
            ctx.strokeStyle = `rgba(0,217,255,${ringAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Planet position
        const angle = planetBaseAngle[i] + (time * planetSpeed[i]) + globalRotation;
        const wx = Math.cos(angle) * r;
        const wz = Math.sin(angle) * r;

        const prz = wz - camZ;
        const ptz = (-camY) * sinT + prz * cosT;
        if (ptz < -focalLength + 10) continue;

        const pScale = focalLength / (focalLength + ptz);
        const px = width / 2 + (wx - camX) * pScale;
        const py = height / 2 + ((-camY) * cosT - prz * sinT) * pScale;

        // Skip offscreen
        if (px < -50 || px > width + 50 || py < -50 || py > height + 50) continue;

        const pRad = planetSize[i] * pScale;

        // Planet sphere
        const pGrad = ctx.createRadialGradient(px - pRad * 0.3, py - pRad * 0.3, 0, px, py, pRad);
        pGrad.addColorStop(0, planetC1[i]);
        pGrad.addColorStop(1, planetC2[i]);
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(px, py, pRad, 0, TWO_PI);
        ctx.fill();

        // Planet outline (desktop only)
        if (!isMobile) {
          ctx.strokeStyle = "rgba(0,217,255,0.4)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Saturn rings
        if (i === saturnIdx) {
          ctx.beginPath();
          ctx.ellipse(px, py, pRad * 2.2, pRad * 0.6 * sinT, 0.1, 0, TWO_PI);
          ctx.strokeStyle = `rgba(124,58,237,${0.6 * Math.min(1, pScale)})`;
          ctx.lineWidth = 2 * pScale;
          ctx.stroke();
        }

        // Planet label (desktop only, reasonable scale)
        if (!isMobile && pScale > 0.5 && pScale < 3) {
          ctx.fillStyle = `rgba(0,217,255,${0.4 * pScale})`;
          ctx.font = `${Math.max(8, 10 * pScale)}px monospace`;
          ctx.fillText(planetNames[i].toUpperCase(), px + pRad + 10, py + 4);
        }
      }

      // ---- NEURAL NODES ----
      ctx.lineWidth = 0.5;
      for (let i = 0; i < NODE_COUNT; i++) {
        if (!reducedMotion) {
          nodeOX[i] += nodeVX[i];
          nodeOY[i] += nodeVY[i];
          if (nodeOX[i] < -50) nodeOX[i] = width + 50;
          if (nodeOX[i] > width + 50) nodeOX[i] = -50;
          if (nodeOY[i] < -50) nodeOY[i] = height * 3;
          if (nodeOY[i] > height * 3) nodeOY[i] = -50;
        }
        nodeX[i] = nodeOX[i];
        nodeY[i] = nodeOY[i] - (currentScroll * 0.3);

        if (nodeY[i] > -20 && nodeY[i] < height + 20) {
          ctx.fillStyle = `rgba(0,217,255,${nodeA[i]})`;
          ctx.beginPath();
          ctx.arc(nodeX[i], nodeY[i], nodeR[i], 0, TWO_PI);
          ctx.fill();
        }
      }

      // Neural connections (desktop only, reduced distance)
      if (!isMobile) {
        for (let i = 0; i < NODE_COUNT; i++) {
          if (nodeY[i] < -20 || nodeY[i] > height + 20) continue;
          for (let j = i + 1; j < NODE_COUNT; j++) {
            if (nodeY[j] < -20 || nodeY[j] > height + 20) continue;
            const dx = nodeX[i] - nodeX[j];
            const dy = nodeY[i] - nodeY[j];
            const distSq = dx * dx + dy * dy;
            if (distSq < 12000) {
              const alpha = (1 - distSq / 12000) * 0.12;
              ctx.strokeStyle = `rgba(37,99,255,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(nodeX[i], nodeY[i]);
              ctx.lineTo(nodeX[j], nodeY[j]);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-1] pointer-events-none"
        aria-hidden="true"
      />
      {!reducedMotion && (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 rounded-full border border-sky-400/60 pointer-events-none z-[-1] mix-blend-screen hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(56,189,248,0.1) 40%, transparent 70%)",
            boxShadow: "0 0 20px rgba(56,189,248,0.4), inset 0 0 10px rgba(56,189,248,0.3)"
          }}
        />
      )}
    </>
  );
}
