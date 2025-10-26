// src/effects/Pixelation.js
import { EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import { Uniform } from "three";
import { Effect } from "postprocessing";

class PixelateEffect extends Effect {
  constructor({ granularity = 4 } = {}) {
    super("PixelateEffect", fragmentShader, {
      uniforms: new Map([["granularity", new Uniform(granularity)]]),
    });
  }
}

const fragmentShader = /* glsl */ `
uniform float granularity;
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 coord = floor(uv * granularity) / granularity;
  outputColor = texture2D(inputBuffer, coord);
}
`;

extend({ PixelateEffect });

export default function Pixelation({ granularity = 512 }) {
  const { gl, scene, camera, size } = useThree();

  const composer = useMemo(() => {
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const pixelEffect = new PixelateEffect({ granularity });
    const effectPass = new EffectPass(camera, pixelEffect);
    composer.addPass(renderPass);
    composer.addPass(effectPass);
    return composer;
  }, [gl, scene, camera, granularity]);

  useFrame((_, delta) => composer.render(delta), 1);

  return null;
}
