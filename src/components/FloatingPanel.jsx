import React, { useRef, useMemo } from 'react';

import { useFrame } from '@react-three/fiber';

import NeonMaterial from '../shaders/neonMaterial';

import makeRuneTexture from '../utils/makeRuneTexture';

import * as THREE from 'three';

export default function FloatingPanel({ position = [0, 0, 0], rotation = [0, 0, 0], size = [1.6, 1.0], mouse, settings }){

  const ref = useRef();

  const runeTex = useMemo(() => makeRuneTexture(512), []);

  const material = useMemo(() => {
    const mat = new NeonMaterial();
    mat.transparent = true;
    mat.depthWrite = false;
    mat.blending = THREE.AdditiveBlending;
    return mat;
  }, []);

  useFrame((state) =>{

    const t = state.clock.getElapsedTime();

    if (ref.current){

      ref.current.rotation.x = rotation[0] + Math.sin(t * 0.4) * 0.03;

      ref.current.rotation.y = rotation[1] + Math.cos(t * 0.5) * 0.02;

      ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.05;

    }

    if (material){

      material.uniforms.time.value = t;

      material.uniforms.pointer.value.set(mouse.current.x, mouse.current.y);

      material.uniforms.pulse.value = settings.pulse;

      material.uniforms.baseTint.value = new THREE.Color(...settings.baseTintRGB);

      material.uniforms.opacity.value = settings.opacity;

      if (!material.uniforms.runeTex.value) material.uniforms.runeTex.value = runeTex;

    }

  });

  return (

    <mesh ref={ref} position={position} rotation={rotation} material={material}>

      <planeGeometry args={size} />

    </mesh>

  );

}

