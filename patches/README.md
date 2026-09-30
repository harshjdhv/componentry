# screen-space-reflections 2.5.0

The prism uses this effect for the colored grain on its glass faces. The pnpm patch keeps it compatible with Three.js r182:

- Replace removed `WebGLMultipleRenderTargets` with `WebGLRenderTarget({ count: 2 })` and `.textures`.
- Declare the UV transform uniform previously provided by Three's shader chunks.
- Use the current `copyFramebufferToTexture(texture, position)` argument order.
- Omit the scene background in the normal/depth pass: its single output cannot render into two attachments.
- Dispose cached normal/depth materials when the effect is removed.
- Supply the TypeScript declarations used by the prism.

After upgrading Three or this effect, check the prism's console, reflections slider, light/dark presets, dragging, and resizing across the mobile breakpoint.
