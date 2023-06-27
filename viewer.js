import * as THREE from "./three.module.js";
export default {
  init(data) {
    this.createResize();
    this.createRenderer(data.renderer);
    this.createCamera();
    this.createScene();
    this.createLight();

    this.update();
  },

  createRenderer(settings) {
    if (this.renderer) {
      //удаляем старый рендер
      this.renderer.domElement.parentNode.removeChild(thos.renderer.domElement);

      //удаляем старый рендер с опер памяти (если будет рендер в цикле то память скоро заполниться)
      this.renderer.dispose();
    }

    //создаем новый
    this.renderer = new THREE.WebGLRenderer(settings);
    document.body.appendChild(this.renderer.domElement);

    this.renderer.setClearColor(settings.setClearColor ?? "black");

    this.renderer.setPixelRatio(settings.pixelRatio ?? devicePixelRatio);

    var that = this;

    this.addResize("resize_render", () => {
      that.renderer.setSize(
        that.renderer.domElement.parentNode.offsetWidth,
        that.renderer.domElement.parentNode.offsetHeight
      );
    });

    this.resizePool["resize_render"]();
  },
  
  createResize(){
		var that = this;
		window.addEventListener("resize",()=>{that.resize();});
		
		
	},
	resizePool:{},
	addResize(name,func){
		this.resizePool[name] = func;
	},
	removeRize(name){
		delete this.resizePool[name];
	},
	resize(){
		for(var key in this.resizePool)this.resizePool[key]();
	},
	createCamera(){
		
		this.camera = new THREE.PerspectiveCamera(
			45,
			this.renderer.domElement.width/this.renderer.domElement.height,
			1,
			100
		)
		
		this.camera.position.set(5,10,10);
		this.camera.lookAt(0,0,0);
		
		var that = this;
	
		this.addResize("resize_camera",()=>{
			that.camera.aspect = that.renderer.domElement.width/that.renderer.domElement.height;
			
			that.camera.updateProjectionMatrix();
		});
	},
	createScene(){
		
		this.scene = new THREE.Scene();
	},
	createLight(){
		this.light1 = new THREE.DirectionalLight(0xffffff,.5);
		
		this.scene.add(this.light1);
		
		
		this.light1.position.set(-1,3,10);
		
		this.light2 = new THREE.AmbientLight(0xffffff,.5);
		
		this.scene.add(this.light2);
	},
	addUpdate(name,func){
		this.updatePool[name] = func;
	},
	removeUpdate(name){
		delete this.updatePool[name];
	},
	updatePool : {},
	update(){
		
		this.renderer.render(this.scene,this.camera);
		
		var that = this;
		
		requestAnimationFrame(()=>{that.update();});
		
		for(var key in this.updatePool)this.updatePool[key]();
	}
};