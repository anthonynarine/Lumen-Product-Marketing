"use client";

import { useEffect, useRef } from "react";

/**
 * Ported as-is from lumen-landing-hero.html — shaders and simulation loop
 * are untouched. Only the mount/cleanup and the reduced-motion particle
 * count are React-specific additions.
 */
export function ParticleField({ count = 1400 }: { count?: number } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    });
    if (!gl) return;

    const vs = `
      attribute vec2 aPos;
      attribute float aSize;
      attribute float aAlpha;
      attribute float aKind;
      uniform vec2 uRes;
      varying float vA;
      varying float vK;
      void main() {
        vec2 clip = (aPos / uRes) * 2.0 - 1.0;
        gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
        gl_PointSize = aSize;
        vA = aAlpha;
        vK = aKind;
      }
    `;
    const fs = `
      precision mediump float;
      varying float vA;
      varying float vK;
      void main() {
        vec2 p = gl_PointCoord - 0.5;
        float d = length(p);
        float core = smoothstep(0.50, 0.08, d);
        float halo = smoothstep(0.50, 0.18, d) * 0.35;
        vec3 coral = vec3(0.886, 0.231, 0.196);
        vec3 bone  = vec3(0.96, 0.96, 0.95);
        vec3 col = mix(bone, coral, vK);
        gl_FragColor = vec4(col * (core + halo), vA * (core + halo));
      }
    `;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const COUNT = count;
    const pos = new Float32Array(COUNT * 2);
    const size = new Float32Array(COUNT);
    const alpha = new Float32Array(COUNT);
    const kind = new Float32Array(COUNT);
    const vel = new Float32Array(COUNT * 2);
    const seed = new Float32Array(COUNT);

    function reset(i: number, w: number, h: number, spawnEdge: boolean) {
      seed[i] = Math.random() * 1000;
      kind[i] = Math.random() > 0.28 ? 1 : 0;
      size[i] = (kind[i] ? 2.2 : 1.4) + Math.random() * 3.2;
      alpha[i] = 0.15 + Math.random() * 0.55;
      vel[i * 2] = 0.45 + Math.random() * 1.35;
      vel[i * 2 + 1] = (Math.random() - 0.5) * 0.5;
      if (spawnEdge) {
        pos[i * 2] = -20 - Math.random() * 80;
        pos[i * 2 + 1] = Math.random() * h;
      } else {
        pos[i * 2] = Math.random() * w;
        pos[i * 2 + 1] = Math.random() * h;
      }
    }

    const bufPos = gl.createBuffer()!;
    const bufSize = gl.createBuffer()!;
    const bufA = gl.createBuffer()!;
    const bufK = gl.createBuffer()!;

    const locPos = gl.getAttribLocation(prog, "aPos");
    const locSize = gl.getAttribLocation(prog, "aSize");
    const locA = gl.getAttribLocation(prog, "aAlpha");
    const locK = gl.getAttribLocation(prog, "aKind");
    const uRes = gl.getUniformLocation(prog, "uRes");

    function bindAttr(buf: WebGLBuffer, loc: number, data: Float32Array, n: number) {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
      gl!.bufferData(gl!.ARRAY_BUFFER, data, gl!.DYNAMIC_DRAW);
      gl!.enableVertexAttribArray(loc);
      gl!.vertexAttribPointer(loc, n, gl!.FLOAT, false, 0, 0);
    }

    let w = 0,
      h = 0,
      mx = -9999,
      my = -9999;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.width = Math.floor(rect.width * dpr);
      h = canvas!.height = Math.floor(rect.height * dpr);
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uRes, w, h);
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mx = (e.clientX - rect.left) * dpr;
      my = (e.clientY - rect.top) * dpr;
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);

    resize();
    for (let i = 0; i < COUNT; i++) reset(i, w, h, false);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    let t = 0;
    let cancelled = false;
    let rafId = 0;

    function frame() {
      if (cancelled) return;
      t += 0.016;
      for (let i = 0; i < COUNT; i++) {
        const x = pos[i * 2],
          y = pos[i * 2 + 1];
        const flow = Math.sin(y * 0.004 + t * 0.9 + seed[i]) * 0.9;
        const pulse = 0.7 + 0.45 * Math.sin(t * 2.6 + seed[i]);
        let vx = vel[i * 2] * pulse + flow;
        let vy = vel[i * 2 + 1] + Math.sin(t * 1.1 + seed[i]) * 0.18;

        const dx = x - mx,
          dy = y - my;
        const dist = Math.hypot(dx, dy) + 0.001;
        if (dist < 140) {
          const f = (140 - dist) / 140;
          vx += (dx / dist) * f * 1.8;
          vy += (dy / dist) * f * 1.8;
        }

        pos[i * 2] = x + vx * (kind[i] ? 1.6 : 1.05);
        pos[i * 2 + 1] = y + vy;
        if (pos[i * 2] > w + 30 || pos[i * 2 + 1] < -30 || pos[i * 2 + 1] > h + 30) {
          reset(i, w, h, true);
        }
      }

      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      bindAttr(bufPos, locPos, pos, 2);
      bindAttr(bufSize, locSize, size, 1);
      bindAttr(bufA, locA, alpha, 1);
      bindAttr(bufK, locK, kind, 1);
      gl!.drawArrays(gl!.POINTS, 0, COUNT);
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
