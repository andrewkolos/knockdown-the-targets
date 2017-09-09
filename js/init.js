function init() {

    Physijs.scripts.worker = './libs/physijs_worker.js';
    Physijs.scripts.ammo = './ammo.js';


    scene = new Physijs.Scene();
    scene.fog = new THREE.FogExp2(0xaabbbb, 0.001);
    scene.setGravity(new THREE.Vector3(0, -30, 0));

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT_RATIO, NEAR_CLIPPING_PLANE, FAR_CLIPPING_PLANE);
    camera.position.set(CAMERA_X, CAMERA_Y, CAMERA_Z);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    window.addEventListener('resize', onResize, false);
    document.body.appendChild(renderer.domElement);

    addLights();
    addGround();
    addSkyBox();

    var axisHelper = new THREE.AxisHelper(5);
    scene.add(axisHelper);

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

function addLights() {
    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-7, 5, 8);
    dirLight.castShadow = true; // expensive
    dirLight.shadow.camera.near = 4;
    dirLight.shadow.camera.far = 20;
    dirLight.shadow.camera.left = -7;
    dirLight.shadow.camera.right = 7;
    dirLight.shadow.camera.top = 12;
    dirLight.shadow.camera.bottom = -12;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 0, 10);
    scene.add(hemiLight);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
}

function addGround() {

    var loader = new THREE.TextureLoader();

    loader.load('img/grass.png', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.repeat.set(6 * 50, 6 * 50);

        var ground_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                map: texture
            }),
            .8, // high friction
            .4 // low
        );

        ground = new Physijs.BoxMesh(
            new THREE.BoxGeometry(2500, 1, 2500),
            ground_material,
            0
        );
        ground.receiveShadow = true;
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
