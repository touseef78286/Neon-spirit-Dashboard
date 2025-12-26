# Neon Spirit Dashboard

A stunning holographic UI dashboard built with React, Three.js, and custom shaders. Features interactive neon panels that respond to cursor movement with beautiful visual effects.

## Features

- 🎨 Custom neon shader materials with runic textures
- ✨ Interactive cursor energy effects
- 🎛️ Real-time color and effect controls via Leva
- 🌊 Floating animated panels with smooth motion
- 💫 Post-processing effects (Bloom, Vignette)
- 🎮 Orbit controls for 3D interaction

## Tech Stack

- **React 18** - UI framework
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **@react-three/postprocessing** - Post-processing effects
- **Leva** - GUI controls
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Performance Tips

- Limit rune texture size to 256–512 for mobile devices
- Reduce particle count for low-end devices
- The `dpr` setting on the Canvas manages device pixel ratio automatically

## Project Structure

```
neon-spirit-dashboard/
├─ src/
│  ├─ components/
│  │  ├─ NeonSpiritDashboard.jsx  # Main dashboard component
│  │  ├─ FloatingPanel.jsx        # Animated 3D panels
│  │  ├─ CursorEnergy.jsx         # Cursor glow effect
│  │  └─ ColorControls.jsx        # Leva controls
│  ├─ shaders/
│  │  └─ neonMaterial.js          # Custom shader material
│  └─ utils/
│     └─ makeRuneTexture.js       # Rune texture generator
```

## Usage

Move your cursor around the screen to see the neon panels react. Use the Leva controls panel to adjust:
- Base color (RGB)
- Pulse intensity
- Opacity

Use mouse drag to orbit around the 3D scene.

## License

MIT


