function init() {

    Physijs.scripts.worker = './libs/physijs_worker.js';
    Physijs.scripts.ammo = './ammo.js';


    scene = new Physijs.Scene();

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT_RATIO, NEAR_CLIPPING_PLANE, FAR_CLIPPING_PLANE);
    camera.position.set(CAMERA_X, CAMERA_Y, CAMERA_Z);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    window.addEventListener('resize', onResize, false);
    document.body.appendChild( renderer.domElement );

    requestAnimationFrame(render);
}

function render() {
    scene.simulate();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}