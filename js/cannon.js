function Cannon(firingRate, radius, mass, color) {
    this.firingRate = firingRate;
    this.lastShot = performance.now() - firingRate;
    this.onFire = function() {};
    this.fire = function (controls, camera, impulse, timeToLive) {
        function makeCannonBall(radius) {
            var geometry = new THREE.SphereGeometry(radius, 32, 32);
            var material = Physijs.createMaterial(new THREE.MeshPhongMaterial({
                color: color,
                specular: 0x050505,
                shininess: 100
            }), 1, 1);

            var mesh = new Physijs.SphereMesh(geometry, material, mass);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.name = "cannonball";
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
            playBallSound();

            this.onFire();
            this.lastShot = performance.now();

            setTimeout(function () {
                scene.remove(ball);
            }, timeToLive);
        }
    };
    this.ready = function () {
        this.lastShot = performance.now() - firingRate;
    }
}