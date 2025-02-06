declare module "three/examples/jsm/effects/AsciiEffect" {
  import { WebGLRenderer, Scene, Camera } from "three";

  export interface AsciiEffectOptions {
    invert?: boolean;
  }

  export class AsciiEffect {
    constructor(
      renderer: WebGLRenderer,
      charSet?: string,
      options?: AsciiEffectOptions
    );
    domElement: HTMLElement;
    setSize(width: number, height: number): void;
    render(scene: Scene, camera: Camera): void;
  }

  export default AsciiEffect;
}

declare module "three/examples/jsm/geometries/ParametricGeometry" {
  import { ParametricBufferGeometry, Vector3 } from "three";

  export class ParametricGeometry extends ParametricBufferGeometry {
    constructor(
      func: (u: number, v: number, target: Vector3) => void,
      slices: number,
      stacks: number
    );
  }

  export default ParametricGeometry;
}
