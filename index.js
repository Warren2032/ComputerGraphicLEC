import * as THREE from "./three.js/build/three.module.js";
import { OrbitControls } from "./three.js/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, control;

function createLight() {
  let light = new THREE.SpotLight("#ffffff", 1);
  light.position.set(100, 200, 300);
  light.castShadow = true;

  scene.add(light);
}

function createFloor() {
  let floor = new THREE.Mesh(
    new THREE.BoxGeometry(250, 2, 150),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/floor.png"),
    })
  );
  floor.position.set(35, -14, 35);
  floor.rotation.set(0, (Math.PI / 4) * -1, 0);
  floor.receiveShadow = true;

  scene.add(floor);
}

function createPin(x,y,z) {
  //upper
  let upper = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 8, 20, 12, 12),
    new THREE.MeshPhongMaterial({ color: "#ffffff" })
  );
  upper.position.set(0+x, 9+y, 0+z);
  upper.castShadow = true;

  scene.add(upper);

  //lower
  let lower = new THREE.Mesh(
    new THREE.CylinderGeometry(8, 5, 12, 12, 12),
    new THREE.MeshPhongMaterial({ color: "#ffffff" })
  );
  lower.position.set(0+x, -7+y, 0+z);
  lower.castShadow = true;

  scene.add(lower);

  //neck
  let neck = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 3, 12, 12, 12),
    new THREE.MeshPhongMaterial({ color: "#ffffff" })
  );
  neck.position.set(0+x, 23+y, 0+z);
  neck.castShadow = true;

  scene.add(neck);

  //head
  let head = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 16),
    new THREE.MeshPhongMaterial({ color: "#ff0000" })
  );
  head.position.set(0+x, 25+y, 0+z);
  head.castShadow = true;

  scene.add(head);
}

function createBall() {
  let ball = new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 16),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("./assets/bowling-ball.png"),
    })
  );
  ball.position.set(90, -3, 90);
  ball.rotation.set(Math.PI / 2, Math.PI / 2, Math.PI / 2);
  ball.castShadow = true;

  scene.add(ball);
}

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // camera.position.set(20, 60, 180);
  camera.position.set(0, 200, 0);

  //tidak diminta tetapi agar tampilan mirip seperti contoh
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialiasing: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  createLight();
  createFloor();
  createBall();

  createPin(0,0,0);

  createPin(-20,0,-5);
  createPin(-5,0,-20);

  createPin(-40,0,-10);
  createPin(-25,0,-25);
  createPin(-10,0,-40);

  createPin(-30,0,-45);
  createPin(-15,0,-60);
  createPin(-45,0,-30);
  createPin(-60,0,-15);
  

  control = new OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);

}
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

window.onload = function () {
  init();
  render();
  addEventListener();
};

window.onresize = function (){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function addEventListener() {
  document.addEventListener("mousedown", onMouseDown);
}

// let raycaster = new THREE.Raycaster();
// let mouse = new THREE.Vector2()
// function onMouseDown( event ) {

//   // Get screen-space x/y
//   mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
//   mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

//   // Perform raycast
//   raycaster.setFromCamera( mouse, camera );

//   // See if the ray from the camera into the world hits our mesh
//   const intersects = raycaster.intersectObject( floor );

//   // Check if an intersection took place
//   if ( intersects.length > 0 ) {
//       const posX = intersects[0].point.x;
//       const posZ = intersects[0].point.z;
//       console.log(posX, posZ);
//   }

// }