import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    // renderer.setClearColorHex( 0xffffff, 1 )
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
// renderer.clear(op)
camera.position.setZ(100);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(30, 1, 3, 100)
const material = new THREE.MeshStandardMaterial({color: 0x110C2A}); //0xFF6347
const torus = new THREE.Mesh(geometry, material);

const geom = new THREE.TorusGeometry(30, 1, 3, 200)
const materials = new THREE.MeshStandardMaterial({color: 0x110C2A}); //0xFF6347
const toruses = new THREE.Mesh(geom, materials);

const geo = new THREE.TorusGeometry(30, 1, 3, 200)
const mater = new THREE.MeshStandardMaterial({color: 0x110C2A}); //0xFF6347
const toru = new THREE.Mesh(geom, materials);

scene.add(torus, toruses, toru)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(10, 10, 100)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.14,16,24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star)
}

Array(200).fill().forEach(addStar)

// const spaceTexture = new THREE.TextureLoader().load('Space_Planet_Wallpaper.jpeg')
// scene.background = spaceTexture;

const marsTexture = new THREE.TextureLoader().load('mars-volcano.jpeg');

const mars = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: marsTexture

    })
);
scene.add(mars);

// mars.position.z = 30;
// mars.position.setX(-10);

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    mars.rotation.x += 0.05;
    mars.rotation.y += 0.075;
    mars.rotation.z += 0.05;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera


function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.003;
    torus.rotation.z += 0.01;

    toruses.rotation.y += 0.01;
    toruses.rotation.z += 0.003;
    toruses.rotation.x += 0.01;

    toru.rotation.z += 0.01;
    toru.rotation.x += 0.003;
    toru.rotation.y += 0.01;

    mars.rotation.x += 0.001;
    mars.rotation.y += 0.001;
    mars.rotation.z += 0.001;


    controls.update();

    renderer.render(scene, camera);
}
animate()



    // , wireframe: true


