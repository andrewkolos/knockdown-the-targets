// CONSTANTS

const DEBUG = false;

// perspective camera
const VIEW_ANGLE = 45;
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const NEAR_CLIPPING_PLANE = 0.1;
const FAR_CLIPPING_PLANE = 3000000;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const CAMERA_X = 0;
const CAMERA_Y = 5;
const CAMERA_Z = 40;

// light brightness
const INIT_DIR_LIGHT_BRIGHTNESS = 1;
const INIT_HEMI_LIGHT_BRIGHTNESS = 0.6;
const INIT_AMBIENT_LIGHT_BRIGHTNESS = 0.1;

// GLOBALS //

var renderer, scene, camera;
var ground;
var dirLight, hemiLight, ambientLight;

// controls
var controls, controlsEnabled;
var prevTime, velocity = new THREE.Vector3(), raycaster;
var objects = [];

var cannon;

// beach balls that have not touched the ground
var activeTargets = [];


var ballChannels = [];
var cball = 0;
for (var i = 0; i < 5; i++) {
    ballChannels.push(new Audio('sound/ball.mp3'));
}
function playBallSound() {
    ballChannels[cball].volume = 0.2;
    ballChannels[cball++].play();
    if (cball === 5) cball = 0;
}


