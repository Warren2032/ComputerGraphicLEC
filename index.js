import * as THREE from "./three.js/build/three.module.js";

let scene, camera, renderer;

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

function createPin() {
  //upper
  let upper = new THREE.Mesh(
    new THREE.CylinderGeometry(3, 8, 20, 12, 12),
    new THREE.MeshPhongMaterial({ color: "#ffffff" })
  );
  upper.position.set(0, 9, 0);
  upper.castShadow = true;

  scene.add(upper);

  //lower
  let lower = new THREE.Mesh(
    new THREE.CylinderGeometry(8, 5, 12, 12, 12),
    new THREE.MeshPhongMaterial({ color: "#ffffff" })
  );
  lower.position.set(0, -7, 0);
  lower.castShadow = true;

  scene.add(lower);

  //neck
  let neck = new THREE.Mesh(
    new THREE.CylinderGeometry(4, 3, 12, 12, 12),
    new THREE.MeshPhongMaterial({ color: "#ffffff" })
  );
  neck.position.set(0, 23, 0);
  neck.castShadow = true;

  scene.add(neck);

  //head
  let head = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 16),
    new THREE.MeshPhongMaterial({ color: "#ff0000" })
  );
  head.position.set(0, 25, 0);
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
  camera.position.set(20, 60, 180);

  //tidak diminta tetapi agar tampilan mirip seperti contoh
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialiasing: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  createLight();
  createFloor();
  createPin();
  createBall();

  document.body.appendChild(renderer.domElement);
}
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

window.onload = function () {
  init();
  render();
};
