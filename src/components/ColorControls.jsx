import React, { useEffect } from 'react';

import { Leva, useControls } from 'leva';

export default function ColorControls({ settings, setSettings }){

  const vals = useControls({

    baseR: { value: settings.baseTintRGB[0], min: 0, max: 1, step: 0.01 },

    baseG: { value: settings.baseTintRGB[1], min: 0, max: 1, step: 0.01 },

    baseB: { value: settings.baseTintRGB[2], min: 0, max: 1, step: 0.01 },

    pulse: { value: settings.pulse, min: 0, max: 2, step: 0.01 },

    opacity: { value: settings.opacity, min: 0.1, max: 1, step: 0.01 }

  });

  useEffect(()=>{

    setSettings(prev => ({ ...prev, baseTintRGB: [vals.baseR, vals.baseG, vals.baseB], pulse: vals.pulse, opacity: vals.opacity }));

  }, [vals, setSettings]);

  return <Leva collapsed={false} />;

}

