import React, { useEffect, useRef } from 'react';

/**
 * Procedural Dynamic Cloudy Sky with Day / Sunset / Night transitions
 * Driven by `time` (0 = Day, 50 = Sunset / Golden Hour, 100 = Night)
 */
export default function DynamicSky({ time = 100 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars setup for night sky
    const starCount = 85;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random() * 0.75, // top 75% of sky
      size: Math.random() * 1.8 + 0.6,
      baseAlpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 2 + 1,
      twinklePhase: Math.random() * Math.PI * 2
    }));

    // Multi-layered clouds
    // Each cloud cluster has multiple overlapping puffy circles
    const layerCount = 3;
    const clouds = [];

    const createCloud = (layerIdx) => {
      const scale = layerIdx === 0 ? 0.8 : layerIdx === 1 ? 1.2 : 1.7;
      const speed = (0.12 + layerIdx * 0.08) * (Math.random() * 0.4 + 0.8);
      const puffCount = Math.floor(Math.random() * 5) + 6;
      const puffs = [];

      let clusterWidth = 120 * scale;
      for (let p = 0; p < puffCount; p++) {
        puffs.push({
          relX: (Math.random() - 0.5) * clusterWidth,
          relY: (Math.random() - 0.4) * (45 * scale),
          radius: (Math.random() * 35 + 30) * scale,
          alpha: Math.random() * 0.3 + 0.7
        });
      }

      return {
        x: Math.random() * (width + 400) - 200,
        y: Math.random() * (height * 0.55) + 20 + layerIdx * 40,
        speed,
        scale,
        layer: layerIdx,
        puffs
      };
    };

    for (let layer = 0; layer < layerCount; layer++) {
      const count = layer === 0 ? 4 : layer === 1 ? 4 : 3;
      for (let i = 0; i < count; i++) {
        clouds.push(createCloud(layer));
      }
    }

    // Helper: Linear color interpolation
    const lerp = (a, b, t) => a + (b - a) * t;
    const lerpColor = (c1, c2, t) => [
      Math.round(lerp(c1[0], c2[0], t)),
      Math.round(lerp(c1[1], c2[1], t)),
      Math.round(lerp(c1[2], c2[2], t))
    ];
    const rgbStr = c => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
    const rgbaStr = (c, a) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;

    // Sky Palette Keyframes
    // Day (0) -> Sunset (50) -> Night (100)
    const skyPalettes = {
      day: {
        top: [56, 189, 248],      // Sky 400
        mid: [147, 197, 253],     // Blue 300
        horizon: [224, 242, 254], // Sky 100
        sunGlow: [254, 240, 138], // Warm yellow
        cloudTop: [255, 255, 255],
        cloudShadow: [186, 230, 253],
        cloudShadowAlpha: 0.45
      },
      sunset: {
        top: [30, 27, 75],        // Indigo 950
        mid: [192, 38, 211],      // Fuchsia 600
        horizon: [249, 115, 22],  // Orange 500
        sunGlow: [253, 186, 116], // Soft peach
        cloudTop: [254, 215, 170], // Golden peach
        cloudShadow: [112, 26, 117], // Deep plum
        cloudShadowAlpha: 0.65
      },
      night: {
        top: [3, 7, 18],          // Slate 950
        mid: [15, 23, 42],        // Slate 900
        horizon: [30, 27, 75],    // Indigo 950
        moonGlow: [226, 232, 240],// Soft silver
        cloudTop: [71, 85, 105],  // Slate 600
        cloudShadow: [15, 23, 42], // Deep night shadow
        cloudShadowAlpha: 0.75
      }
    };

    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      const tNorm = Math.min(100, Math.max(0, time)) / 100; // 0 to 1

      // Interpolate current sky palette
      let topCol, midCol, horizCol, cloudTopCol, cloudShadCol, cloudShadAlpha;
      if (tNorm <= 0.5) {
        const u = tNorm / 0.5;
        topCol = lerpColor(skyPalettes.day.top, skyPalettes.sunset.top, u);
        midCol = lerpColor(skyPalettes.day.mid, skyPalettes.sunset.mid, u);
        horizCol = lerpColor(skyPalettes.day.horizon, skyPalettes.sunset.horizon, u);
        cloudTopCol = lerpColor(skyPalettes.day.cloudTop, skyPalettes.sunset.cloudTop, u);
        cloudShadCol = lerpColor(skyPalettes.day.cloudShadow, skyPalettes.sunset.cloudShadow, u);
        cloudShadAlpha = lerp(skyPalettes.day.cloudShadowAlpha, skyPalettes.sunset.cloudShadowAlpha, u);
      } else {
        const u = (tNorm - 0.5) / 0.5;
        topCol = lerpColor(skyPalettes.sunset.top, skyPalettes.night.top, u);
        midCol = lerpColor(skyPalettes.sunset.mid, skyPalettes.night.mid, u);
        horizCol = lerpColor(skyPalettes.sunset.horizon, skyPalettes.night.horizon, u);
        cloudTopCol = lerpColor(skyPalettes.sunset.cloudTop, skyPalettes.night.cloudTop, u);
        cloudShadCol = lerpColor(skyPalettes.sunset.cloudShadow, skyPalettes.night.cloudShadow, u);
        cloudShadAlpha = lerp(skyPalettes.sunset.cloudShadowAlpha, skyPalettes.night.cloudShadowAlpha, u);
      }

      // 1. Draw Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, rgbStr(topCol));
      skyGrad.addColorStop(0.55, rgbStr(midCol));
      skyGrad.addColorStop(1, rgbStr(horizCol));
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars (visible when tNorm > 0.35)
      const starVisibility = Math.max(0, (tNorm - 0.35) / 0.65);
      if (starVisibility > 0.01) {
        stars.forEach((star) => {
          const twinkle = (Math.sin(now * 0.003 * star.twinkleSpeed + star.twinklePhase) + 1) * 0.5;
          const alpha = star.baseAlpha * starVisibility * (0.6 + 0.4 * twinkle);
          ctx.beginPath();
          ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.fill();
        });
      }

      // 3. Sun and Moon
      // Sun (high at tNorm = 0, sinks at tNorm = 0.55, hidden past 0.65)
      const sunVisibility = Math.max(0, 1 - tNorm / 0.65);
      if (sunVisibility > 0.01) {
        const sunX = width * (0.2 + tNorm * 0.6);
        const sunY = height * (0.15 + tNorm * 0.6);
        const sunRadius = 45;

        // Warm radial glare
        const sunGlow = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.2, sunX, sunY, sunRadius * 4.5);
        sunGlow.addColorStop(0, `rgba(255, 248, 220, ${(0.85 * sunVisibility).toFixed(3)})`);
        sunGlow.addColorStop(0.3, `rgba(253, 186, 116, ${(0.45 * sunVisibility).toFixed(3)})`);
        sunGlow.addColorStop(1, 'rgba(253, 186, 116, 0)');
        ctx.fillStyle = sunGlow;
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Sun disc
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 240, ${(0.95 * sunVisibility).toFixed(3)})`;
        ctx.fill();
      }

      // Moon (visible when tNorm > 0.4)
      const moonVisibility = Math.max(0, (tNorm - 0.4) / 0.6);
      if (moonVisibility > 0.01) {
        const moonProgress = Math.max(0, (tNorm - 0.4) / 0.6);
        const moonX = width * (0.75 - moonProgress * 0.2);
        const moonY = height * (0.55 - moonProgress * 0.4);
        const moonRadius = 38;

        // Moon Glow
        const moonGlow = ctx.createRadialGradient(moonX, moonY, moonRadius, moonX, moonY, moonRadius * 3.5);
        moonGlow.addColorStop(0, `rgba(226, 232, 240, ${(0.5 * moonVisibility).toFixed(3)})`);
        moonGlow.addColorStop(1, 'rgba(226, 232, 240, 0)');
        ctx.fillStyle = moonGlow;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Moon Disc
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${(0.92 * moonVisibility).toFixed(3)})`;
        ctx.fill();

        // Subtle crescent/shadow crater aesthetic
        ctx.beginPath();
        ctx.arc(moonX + moonRadius * 0.35, moonY - moonRadius * 0.1, moonRadius * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${topCol[0]}, ${topCol[1]}, ${topCol[2]}, ${(0.82 * moonVisibility).toFixed(3)})`;
        ctx.fill();
      }

      // 4. Volumetric Drifting Clouds
      clouds.forEach((cloud) => {
        // Move cloud smoothly
        cloud.x += cloud.speed * 28 * dt;
        if (cloud.x - 200 > width) {
          cloud.x = -300;
          cloud.y = Math.random() * (height * 0.55) + 20 + cloud.layer * 40;
        }

        // Draw puff clusters
        cloud.puffs.forEach((puff) => {
          const px = cloud.x + puff.relX;
          const py = cloud.y + puff.relY;

          // Gradient puff for soft volume
          const puffGrad = ctx.createRadialGradient(
            px, py - puff.radius * 0.3, puff.radius * 0.1,
            px, py, puff.radius
          );
          puffGrad.addColorStop(0, rgbaStr(cloudTopCol, puff.alpha * 0.85));
          puffGrad.addColorStop(0.7, rgbaStr(cloudTopCol, puff.alpha * 0.65));
          puffGrad.addColorStop(1, rgbaStr(cloudShadCol, cloudShadAlpha * puff.alpha));

          ctx.beginPath();
          ctx.arc(px, py, puff.radius, 0, Math.PI * 2);
          ctx.fillStyle = puffGrad;
          ctx.fill();
        });
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [time]);

  return (
    <div
      className="dynamic-sky-viewport"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
