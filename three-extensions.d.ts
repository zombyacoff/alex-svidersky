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

// declare module "three/examples/jsm/controls/TrackballControls" {
//   import { Camera } from "three";
//   import { EventDispatcher } from "three/src/core/EventDispatcher";

//   export class TrackballControls extends EventDispatcher {
//     constructor(object: Camera, domElement?: HTMLElement);
//     rotateSpeed: number;
//     zoomSpeed: number;
//     panSpeed: number;
//     noZoom: boolean;
//     noPan: boolean;
//     static keys: any[];
//     update(): void;
//     reset(): void;
//     dispose(): void;
//   }
// }
