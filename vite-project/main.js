import * as THREE from './node_modules/three';
import "./style.css";
import {OrbitControls} from "./node_modules/three/examples/jsm/controls/OrbitControls";
import gsap from "/node_modules/gsap";
const scene = new THREE.Scene()
const geometry = new THREE.SphereGeometry(7,64,64)
const material = new THREE.MeshStandardMaterial({
  color: "#00E0FF",
  roughness:0.2,
});
//hello world

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const width = 10;
const height = 20;
const intensity = 1;
const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
rectLight.position.set( 0, 10, 10 );
rectLight.lookAt( 0, 0, 0 );
scene.add( rectLight )

const sizes = {
  width: window.innerWidth*0.5,
  height: window.innerHeight,
}
const camera = new THREE.PerspectiveCamera(45, sizes.width /sizes.height, 0.1,100);
camera.position.z = 50;
scene.add(camera);


const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(6)
renderer.render(scene,camera)

//constrols
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePen=false
controls.enableZoom = false
controls.autoRotate = true


window.addEventListener("resize", () =>{
  sizes.width = window.innerWidth
  sizes.height =  window.innerHeight
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width,sizes.height)
})

const loop =() => {
  // mesh.position.x +=0.1
  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
  
}
loop();
const tl = gsap.timeline({defaults: {duration:1}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0},{z:1, x:1, y:1})

let mousedown = false
let rgb =[12,33,55];
window.addEventListener('mousedown',() => (mousedown = true) )
window.addEventListener('mouseup',() => (mousedown = false) )

window.addEventListener(mousemove,(e) =>{
  if(mousedown){
    rgb =[
      Math.round((e.pageX /sizes.width) *255)
    ]
    console.log(rgb);

  }

})























