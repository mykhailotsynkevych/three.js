import Viewer from "./viewer.js";
import * as THREE from "./three.module.js";

export default class {
  constructor() {
    Viewer.init({
      renderer: {
        parent: document.body,
        //сглаживает и смягчает углы и ребра на стике
        antialias: true,
        //прозрачность
        alpha: true,
        //цвет фона
        setClearColor: "blue",
        //плотность пикселей
        pixelRatio: 1,
      },
    });
    this.createObject();
  }

  createObject() {
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: "gray" })
    );
    Viewer.scene.add(this.object);

    this.object.position.z = -5;

    var that = this;

    Viewer.addUpdate("rotate_object", () => {
      that.object.rotation.y += 0.005;
    });
  }
}
