// CONSTANTS

const DEBUG = false;

// perspective camera
const VIEW_ANGLE = 45;
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const NEAR_CLIPPING_PLANE = 0.1;
const FAR_CLIPPING_PLANE = 1000;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const CAMERA_X = 0;
const CAMERA_Y = -20;
const CAMERA_Z = 10;

// GLOBALS //

var renderer, scene, camera;