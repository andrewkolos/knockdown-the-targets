
function Cannon(firingRate) {
    this.firingRate = firingRate;
    this.lastShot = performance.now() - firingRate;
    this.fire = function (radius, mass, controls,  camera, impulse, timeToLive) {
        function makeCannonBall(radius) {
            var geometry = new THREE.SphereGeometry(radius, 32, 32);
            var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({color: 0xFFF, specular: 0x050505, shininess: 100}), 1, 1);

            var mesh = new Physijs.SphereMesh(geometry, material, mass);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            return mesh;
        }

        if (performance.now() - this.lastShot >= this.firingRate) {
            var cameraPos = controls.getObject().position;
            var ball = makeCannonBall(radius);

            var projectileVector = new THREE.Vector3();
            camera.getWorldDirection(projectileVector);

            ball.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
            scene.add(ball);
            ball.applyCentralImpulse(projectileVector.multiplyScalar(impulse));

            this.lastShot = performance.now();

            setTimeout(function () {
                scene.remove(ball);
            }, timeToLive);
        }
    };
    this.ready = function() {
        this.lastShot = performance.now() - firingRate;
    }
}