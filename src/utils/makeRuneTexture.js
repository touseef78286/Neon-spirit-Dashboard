import * as THREE from 'three';

export default function makeRuneTexture(size = 512){

  const canvas = document.createElement('canvas');

  canvas.width = canvas.height = size;

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, size, size);

  ctx.fillStyle = 'rgba(0,0,0,0)';

  ctx.fillRect(0, 0, size, size);

  ctx.globalCompositeOperation = 'source-over';

  ctx.strokeStyle = 'rgba(255,255,255,0.95)';

  ctx.lineWidth = Math.max(3, size * 0.02);

  ctx.lineCap = 'round';

  const glyphs = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᛉ','ᛋ','ᛏ','ᛗ'];

  for (let i = 0; i < 6; i++){

    ctx.save();

    const x = Math.random() * size;

    const y = Math.random() * size;

    ctx.translate(x, y);

    ctx.rotate((Math.random() - 0.5) * Math.PI);

    ctx.font = `${Math.floor(size * 0.07 + Math.random() * size * 0.08)}px serif`;

    ctx.strokeText(glyphs[Math.floor(Math.random() * glyphs.length)], 0, 0);

    ctx.restore();

  }

  ctx.strokeStyle = 'rgba(255,255,255,0.12)';

  ctx.lineWidth = 1;

  for (let j = 0; j < 12; j++){

    ctx.beginPath();

    ctx.moveTo(Math.random() * size, Math.random() * size);

    ctx.lineTo(Math.random() * size, Math.random() * size);

    ctx.stroke();

  }

  const tex = new THREE.CanvasTexture(canvas);

  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;

  return tex;

}


