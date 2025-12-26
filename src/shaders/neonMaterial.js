import * as THREE from 'three';

import { shaderMaterial } from '@react-three/drei';

const vertex = `

varying vec2 vUv;

varying vec3 vNormal;

void main(){

  vUv = uv;

  vNormal = normalize(normalMatrix * normal);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);

}

`;

const fragment = `

uniform float time;

uniform vec2 pointer;

uniform float pulse;

uniform sampler2D runeTex;

uniform vec3 baseTint;

uniform float opacity;

varying vec2 vUv;

varying vec3 vNormal;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }

float noise(vec2 p){

  vec2 i = floor(p);

  vec2 f = fract(p);

  float a = hash(i);

  float b = hash(i + vec2(1.0, 0.0));

  float c = hash(i + vec2(0.0, 1.0));

  float d = hash(i + vec2(1.0, 1.0));

  vec2 u = f*f*(3.0-2.0*f);

  return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;

}

void main(){

  vec3 base = baseTint * 0.08;

  float fres = pow(1.0 - dot(normalize(vNormal), vec3(0.0,0.0,1.0)), 2.0);

  vec2 ru = vUv;

  vec4 rune = texture2D(runeTex, ru * vec2(1.0, -1.0));

  vec2 p = pointer * 0.5 + 0.5;

  float d = distance(vUv, p);

  float influence = smoothstep(0.6, 0.0, d + 0.12 * sin(time * 1.8));

  float n = noise(vUv * 6.0 + vec2(time * 0.08));

  vec3 neon1 = vec3(0.0, 0.95, 0.85);

  vec3 neon2 = vec3(0.98, 0.2, 0.9);

  vec3 neon = mix(neon1, neon2, clamp(rune.r + 0.2 * sin(time * 0.9), 0.0, 1.0));

  float runeGlow = rune.r * 1.6 + influence * pulse * 2.0;

  float rim = fres * 0.9;

  vec3 color = base + neon * (runeGlow + rim) * (0.6 + 0.4 * n);

  float alpha = opacity * (0.5 + rune.r * 0.6);

  float vig = smoothstep(0.9, 0.2, distance(vUv, vec2(0.5)));

  color *= vig;

  gl_FragColor = vec4(color, alpha);

}

`;

const NeonMaterialBase = shaderMaterial(
  {
    time: 0,
    pointer: new THREE.Vector2(0, 0),
    pulse: 0.5,
    runeTex: null,
    baseTint: new THREE.Color(0.05, 0.12, 0.18),
    opacity: 0.6,
  },
  vertex,
  fragment
);

NeonMaterialBase.prototype.constructorName = 'NeonMaterial';

export const NeonMaterial = NeonMaterialBase;
export default NeonMaterialBase;

