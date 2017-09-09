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