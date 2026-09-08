"use client";

import { useEffect, useRef } from "react";
import { heroWaveFragment } from "./hero-wave-shader";

export function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false, depth: false, powerPreference: "low-power" });
    if (!gl) return;
    const vertex = gl.createShader(gl.VERTEX_SHADER);
    const fragment = gl.createShader(gl.FRAGMENT_SHADER);
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    if (!vertex || !fragment || !program || !buffer) return;
    const dispose = () => {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
    gl.shaderSource(vertex, "attribute vec2 position; void main(){gl_Position=vec4(position,0.0,1.0);}");
    gl.shaderSource(fragment, heroWaveFragment);
    gl.compileShader(vertex);
    gl.compileShader(fragment);
    if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS) || !gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) { dispose(); return; }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return; }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, "resolution");
    const time = gl.getUniformLocation(program, "time");
    gl.uniform1f(gl.getUniformLocation(program, "waveSpeed"), 0.025);
    gl.uniform1f(gl.getUniformLocation(program, "waveFrequency"), 3);
    gl.uniform1f(gl.getUniformLocation(program, "waveAmplitude"), 0.3);
    gl.uniform3f(gl.getUniformLocation(program, "waveColor"), 0.28, 0.46, 0.78);
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    let frame = 0;
    let previous = 0;
    let elapsed = 16;
    const draw = () => {
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const tick = (now: number) => {
      if (now - previous >= 1000 / 30) {
        elapsed += Math.min((now - previous) / 1000, 0.06);
        previous = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const update = () => {
      cancelAnimationFrame(frame);
      previous = performance.now();
      if (inView && !document.hidden && !query.matches) frame = requestAnimationFrame(tick);
      else draw();
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const scale = Math.min(1, 1440 / rect.width);
      canvas.width = Math.max(1, Math.round(rect.width * scale));
      canvas.height = Math.max(1, Math.round(rect.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      draw();
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry?.isIntersecting ?? false; update(); });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    sizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", update);
    query.addEventListener("change", update);
    resize();
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizeObserver.disconnect();
      document.removeEventListener("visibilitychange", update);
      query.removeEventListener("change", update);
      dispose();
    };
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px] overflow-hidden opacity-50 dark:opacity-90" style={{ maskImage: "linear-gradient(to bottom, transparent 0px, transparent 56px, black 144px, black 40%, transparent 100%)" }}>
      <canvas ref={canvasRef} className="h-full w-full" style={{ maskImage: "radial-gradient(ellipse 38% 48% at 50% 72%, transparent 10%, #0005 55%, black 100%)" }} />
    </div>
  );
}
