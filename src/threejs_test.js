// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------



let THREE = require('./libs/three/three')
let TerrainGenerator = require('./terrain_generator')
// import THREEx from "./extensions/threex.fullscreen"

let clock = new THREE.Clock()

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
// camera.position.z = 60;

// Place camera on x axis
camera.position.set(30,40,60);
camera.up = new THREE.Vector3(0,1,0);
camera.lookAt(new THREE.Vector3(0,0,0));

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

console.log(document)
// Append Renderer to DOM
document.body.appendChild( renderer.domElement );
// document.getElementById("myContainer").appendChild( renderer.domElement )
// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a Cube Mesh with basic material
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
var cube = new THREE.Mesh( geometry, material );

// Add cube to Scene
//scene.add( cube );

TerrainGenerator.generateTerrain(scene);

let pos_offset = 0

// Render Loop
var render = function () {

  requestAnimationFrame( render );

  let delta = clock.getDelta()

  pos_offset = pos_offset + delta

  // console.log(delta)

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;


  camera.position.set(5000 * Math.cos(pos_offset),Math.sin(pos_offset) * 500 + 1500, 5000 * Math.sin(pos_offset));
  camera.up = new THREE.Vector3(0,1,0);
  camera.lookAt(new THREE.Vector3(0,0,0));


  // Render the scene
  renderer.render(scene, camera);
};

render();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
