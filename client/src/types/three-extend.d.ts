declare module "three/examples/jsm/controls/OrbitControls" {
  import { Camera } from "three";
  import { EventDispatcher } from "three";

  export default class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    enabled: boolean;
    enableDamping?: boolean;
    dampingFactor?: number;
    minDistance?: number;
    maxDistance?: number;
    target: any;
    update(): void;
    dispose(): void;
    reset(): void;
  }
  export { OrbitControls };
}

declare module "three/examples/jsm/controls/OrbitControls.js" {
  import OrbitControlsDefault from "three/examples/jsm/controls/OrbitControls";
  export default OrbitControlsDefault;
  export { OrbitControlsDefault as OrbitControls };
}
