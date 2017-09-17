function init() {

    Physijs.scripts.worker = './libs/physijs_worker.js';
    Physijs.scripts.ammo = './ammo.js';


    scene = new Physijs.Scene();
    scene.fog = new THREE.FogExp2(0x999aaa, 0.0002);
    scene.setGravity(new THREE.Vector3(0, -70, 0));

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT_RATIO, NEAR_CLIPPING_PLANE, FAR_CLIPPING_PLANE);
    //camera.position.set(CAMERA_X, CAMERA_Y, CAMERA_Z);
    //camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMapDarkness = 0.5;

    window.addEventListener('resize', onResize, false);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.PointerLockControls(camera, renderer.domElement);

    addControls();
    addLights();
    addGround();
    addSkyBox();
    addTargets();
    readyCannon();

    var axisHelper = new THREE.AxisHelper(5);
    scene.add(axisHelper);

    requestAnimationFrame(render);
}

function render() {
    scene.simulate();

    handleInput();

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControls() {
    prevTime = performance.now();
    // raycaster used to detect downward collision
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1,0), 0, 10);

    // html5rocks.com/en/tutorials/pointerLock/intro
    var havePointerLock = 'pointerLockElement' in document ||
        'mozPointerLockElement' in document ||
        'webkitPointerLockElement' in document; // browser supports pointer lock

    if (havePointerLock) {
        var body = document.body;
        var pointerlockchange = function (event) {
            if ( document.pointerLockElement === body || document.mozPointerLockElement === body || document.webkitPointerLockElement === body ) {
                controls.enabled = true;
                // blocker.style.display = 'none'
            } else {
                controls.enabled = false;
            }
        };

        // hooks
        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
        // errors

        body.addEventListener('click', function (event) {
            body.requestPointerLock = body.requestPointerLock || body.mozRequestPointerLock || body.webkitRequestPointerLock;
            body.requestPointerLock();
        }, false);


        controls = new THREE.PointerLockControls(camera);
        scene.add(controls.getObject());
        controls.getObject().position.y = 5;
    } else {
        alert("Your browser appears to not support the Pointer Lock API!");
    }
}

function addLights() {
    dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(-7 * 20, 17 * 10, 8 * -20);
    dirLight.castShadow = true; // expensive
    dirLight.shadow.camera.near = 2 * 20;
    dirLight.shadow.camera.far = 30 * 20;
    dirLight.shadow.camera.left = -10* 20;
    dirLight.shadow.camera.right = 10* 20;
    dirLight.shadow.camera.top = 10 * 20;
    dirLight.shadow.camera.bottom = -10 * 20;
    dirLight.shadow.mapSize.width = 1024 * 20;
    dirLight.shadow.mapSize.height = 1024 * 20;
    scene.add(dirLight);

    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 100, 0);
    scene.add(hemiLight);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    scene.add(new THREE.DirectionalLightHelper(dirLight));
    scene.add(new THREE.CameraHelper(dirLight.shadow.camera));
    scene.add(new THREE.HemisphereLightHelper(hemiLight));
}

function addGround() {

    var loader = new THREE.TextureLoader();

    loader.load('img/grass.png', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(6 * 500, 6 * 500);

        var ground_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                map: texture
            }),
            .8, // high friction
            .4 // low
        );

        ground = new Physijs.BoxMesh(
            new THREE.BoxGeometry(25000, 1, 25000),
            ground_material,
            0
        );
        ground.receiveShadow = true;
        ground.position.set(0,0,0);
        objects.push(ground);
        scene.add(ground);
    });
}

function addSkyBox() {

    function createMaterial(path) {
        var texture = THREE.ImageUtils.loadTexture(path);
        var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5, fog: false});

        return material;
    }

    var materials = [
        createMaterial('img/skybox/px.png'),
        createMaterial('img/skybox/nx.png'),
        createMaterial('img/skybox/py.png'),
        createMaterial('img/skybox/ny.png'),
        createMaterial('img/skybox/pz.png'),
        createMaterial('img/skybox/nz.png')
    ];

    var mesh = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), new THREE.MeshFaceMaterial(materials));

    mesh.scale.set(-1, 1, 1);
    scene.add(mesh);
}

function addTargets() {
    addQuadTower(1, 1, new THREE.Vector3(-100, 0, -100));
    addQuadTower(2, 5, new THREE.Vector3(100, 0, 100));
    addQuadTower(1.5, 3, new THREE.Vector3(-50, 0, -50));
    addQuadTower(4, 4, new THREE.Vector3(-200, 0, 150));
    addQuadTower(3, 2, new THREE.Vector3(-175, 0, 25));
    addQuadTower(1, 2, new THREE.Vector3(-125, 0, 50));
    addQuadTower(6, 5, new THREE.Vector3(155, 0, 0));
    addQuadTower(2, 6, new THREE.Vector3(65, 0, 65));
    addQuadTower(2, 3, new THREE.Vector3(0, 0, -100));
}

function readyCannon() {
    cannon = new Cannon(250);
}
