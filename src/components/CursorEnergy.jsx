import React, { useEffect } from 'react';

export default function CursorEnergy(){

  useEffect(()=>{

    const el = document.getElementById('cursor-energy');

    if (!el) return;

    function onMove(e){

      el.style.left = `${e.clientX}px`;

      el.style.top = `${e.clientY}px`;

    }

    window.addEventListener('mousemove', onMove);

    return () => window.removeEventListener('mousemove', onMove);

  }, []);

  return (

    <div id="cursor-energy" style={{position:'fixed', left:0, top:0, width:28, height:28, marginLeft:-14, marginTop:-14, borderRadius:9999, pointerEvents:'none', boxShadow:'0 0 32px 12px rgba(0,240,220,0.14), 0 0 10px 3px rgba(220,100,240,0.08)', mixBlendMode:'screen'}} />

  );

}


