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

	createObject(){
		this.object = new THREE.Mesh(
			new THREE.BoxGeometry(.1,.1,1),
			new THREE.MeshStandardMaterial({color:"gray"})
		)
		
		Viewer.scene.add(this.object);
		
		
		
		var that = this;
		
		this.object.visible = true;
		
		var cone =  new THREE.Mesh(
			new THREE.ConeGeometry(.1,.2,8),
			new THREE.MeshStandardMaterial({color:"red"})
		)
		cone.position.z = -.5;
		cone.rotation.x = -Math.PI/2;
		
		cone.name = "cone1";
		
		this.object.add(cone);
		
		
		this.object.scale.set(1,3,4);
		
		var sphere =  new THREE.Mesh(
			new THREE.SphereGeometry(.5,8,8),
			new THREE.MeshStandardMaterial({color:"green"})
		)
		
		sphere.position.set(5,0,-6);
		
		Viewer.scene.add(sphere);
		
		
		Viewer.addUpdate("look_at_sphere",()=>{
			sphere.position.x -= .05;
			
			that.object.lookAt(sphere.position.clone().multiplyScalar(-1));
		})
		
		this.object.geometry
		this.object.material
	}
}
