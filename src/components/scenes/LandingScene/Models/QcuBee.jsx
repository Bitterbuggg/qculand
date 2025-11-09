import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function QcuBee(props) {
  const { scene, animations } = useGLTF('./models/qcu_bee.glb');
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions['Idle.1']) {
      actions['Idle.1'].play(); 
    }
  }, [actions]);

  return <primitive object={scene} {...props} />;
}
