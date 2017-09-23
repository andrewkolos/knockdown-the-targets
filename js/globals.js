// CONSTANTS
var beachballTexture;
var font;

const DEBUG = false;

// perspective camera
const VIEW_ANGLE = 60;
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const NEAR_CLIPPING_PLANE = 0.1;
const FAR_CLIPPING_PLANE = 3000000;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;


// GLOBALS //

var renderer, scene, camera;
var ground;
var dirLight, hemiLight, ambientLight;

// controls
var controls, controlsEnabled;
var prevTime, velocity = new THREE.Vector3(), raycaster;
var objects = [];

var cannon1, cannon2;

// beach balls that have not touched the ground
var activeTargets = [];

var blueAmmo = 60;
var orangeAmmo = 30;

var cheerSound = new Audio('sound/cheer.mp3');
var scoreSound = new Audio('sound/player_score.mp3');
scoreSound.volume = 0.3;

var timer;

var timeRemaining = 120;

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


