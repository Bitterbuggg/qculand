import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Campus() {
  const { scene: mapScene } = useGLTF("/models/university_map.glb");
  const { scene: bldgScene } = useGLTF("/models/Bldg 1.glb");
  const group = useRef();

  const buildings = useMemo(() => {
    const dorm = bldgScene.clone();
    const library = bldgScene.clone();
    const admin = bldgScene.clone();
    const cafeteria = bldgScene.clone();
    const compLabs = bldgScene.clone();

    dorm.position.set(-2.1, 0, -2.35);
    dorm.rotation.y = Math.PI / 2;

    library.position.set(2.1, 0, 0.5);
    library.rotation.y = -Math.PI / 2;

    admin.position.set(-2.1, 0, 0.6);
    admin.rotation.y = Math.PI / 2;

    cafeteria.position.set(0, 0, -4.7);

    compLabs.position.set(2.1, 0, -2.4);
    compLabs.rotation.y = -Math.PI / 2;

    [dorm, library, admin, cafeteria, compLabs].forEach((b) => {
      b.scale.set(0.695, 0.695, 0.695);
    });

    return [dorm, library, admin, cafeteria, compLabs];
  }, [bldgScene]);

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <primitive object={mapScene} />
      {buildings.map((b, i) => (
        <primitive key={i} object={b} />
      ))}
    </group>
  );
}
