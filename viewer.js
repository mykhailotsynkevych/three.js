import * as THREE from "./three.module.js";
export default {
  init() {
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createLight();

    this.update();
  },

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    document.body.appendChild(this.renderer.domElement);

    this.renderer.setSize(
      document.body.offsetWidth,
      document.body.offsetHeight
    );
  },

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      document.body.offsetWidth / document.body.offsetHeight,
      1,
      100
    );
  },

  createScene() {
    this.scene = new THREE.Scene();
  },

  createLight () {
    this.light1 = new THREE.DirectionalLight(0xffffff, .5);
    this.scene.add(this.light1);
    this.light1.position.set(5, 5, 5);
  },

  setUpdate(name, func) {
    this.updatePool[name] = func;
  },

  removeUpdate(name) {
    delete this.updatePool[name];
  },

  updatePool : {},

  update () {
    this.renderer.render(this.scene, this.camera);
    let that = this;
    requestAnimationFrame(() => {that.update();});

    for(let key in this.updatePool)this.updatePool[key]();
  }
}