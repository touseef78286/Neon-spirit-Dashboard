import React, { useRef, useState, useEffect } from 'react';

import { Canvas, extend } from '@react-three/fiber';

import { OrbitControls } from '@react-three/drei';

import FloatingPanel from './FloatingPanel';

import CursorEnergy from './CursorEnergy';

import ColorControls from './ColorControls';

import NeonMaterial from '../shaders/neonMaterial';

import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

import { BlendFunction } from 'postprocessing';

import * as THREE from 'three';

// Extend Three.js with custom material
try {
  extend({ NeonMaterial });
} catch (e) {
  console.error('Error extending NeonMaterial:', e);
}

export default function NeonSpiritDashboard(){

  const mouseRef = useRef(new THREE.Vector2(0, 0));

  const [settings, setSettings] = useState({ baseTintRGB: [0.05, 0.12, 0.18], pulse: 0.6, opacity: 0.6 });

  useEffect(()=>{

    function onMove(e){

      const nx = (e.clientX / window.innerWidth) * 2 - 1;

      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseRef.current.set(nx, ny);

    }

    window.addEventListener('mousemove', onMove);

    return () => window.removeEventListener('mousemove', onMove);

  }, []);

  const panels = [

    { position: [-1.6, 0.1, -0.6], rotation: [0.08, 0.25, 0], size: [1.6, 1.0] },

    { position: [0.2, 0.2, -0.3], rotation: [-0.04, -0.12, 0], size: [1.9, 1.1] },

    { position: [1.6, -0.05, -0.9], rotation: [0.02, -0.45, 0], size: [1.4, 0.9] },

  ];

  return (

    <div className="w-screen h-screen relative bg-gradient-to-b from-[#020417] via-[#001021] to-[#001417]">

      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={Math.min(window.devicePixelRatio, 1.5)}>

        <ambientLight intensity={0.25} />

        <directionalLight position={[5, 5, 5]} intensity={0.6} />

        {panels.map((p, i) => (

          <FloatingPanel key={i} position={p.position} rotation={p.rotation} size={p.size} mouse={mouseRef} settings={settings} />

        ))}

        <EffectComposer>

          <Bloom luminanceThreshold={0.2} intensity={1.2} height={300} opacity={1} blendFunction={BlendFunction.SCREEN} />

          <Vignette eskil={false} offset={0.1} darkness={0.8} />

        </EffectComposer>

        <OrbitControls enableZoom maxPolarAngle={Math.PI / 1.9} />

      </Canvas>

      <div className="absolute left-6 top-6 text-white select-none">

        <h1 className="text-2xl font-bold">Neon Spirit Dashboard</h1>

        <p className="text-sm text-slate-300">Holographic UI • React + Three.js • Shaders</p>

      </div>

      <div className="absolute right-6 top-6">

        <button className="px-3 py-1 rounded bg-white/6 backdrop-blur-sm border border-white/10 text-sm">Toggle Layers</button>

      </div>

      <CursorEnergy />

      <ColorControls settings={settings} setSettings={setSettings} />

      <div className="absolute left-6 bottom-6 text-xs text-slate-400">
        Interact — move cursor to feed the neon spirit. • Made by Zenith
      </div>

    </div>

  );

}

