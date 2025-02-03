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

declare module "three/examples/jsm/loaders/FontLoader" {
  import { Loader, LoadingManager, Font } from "three";

  export class FontLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (font: Font) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(json: any): Font;
  }

  export default FontLoader;
}

declare module "three/examples/jsm/geometries/TextGeometry" {
  import { BufferGeometry, Font } from "three";

  export interface TextGeometryParameters {
    font: Font;
    size?: number;
    height?: number;
    curveSegments?: number;
    bevelEnabled?: boolean;
    bevelThickness?: number;
    bevelSize?: number;
    bevelOffset?: number;
    bevelSegments?: number;
  }

  export class TextGeometry extends BufferGeometry {
    constructor(text: string, parameters: TextGeometryParameters);
  }

  export default TextGeometry;
}
