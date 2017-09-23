function Cannon(firingRate, radius, mass, color, explody) {
    this.firingRate = firingRate;
    this.lastShot = performance.now() - firingRate;
    this.onFire = function() {};
    this.fire = function (controls, camera, impulse, timeToLive) {
        function makeCannonBall() {
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

            setTimeout(function () {
                scene.remove(mesh);
            }, timeToLive);

            if(explody) {
                mesh.addEventListener('collision', function (other_object) {
                    if (mesh.name !== "removed" && other_object.name !== "cannonball") {
                        mesh.name = 'removed';
                        for(var i = 1; i < Math.random()*3; i++) {
                            var newBall = makeCannonBall();

                            newBall.position.copy(mesh.position);
                            scene.add(newBall);

                            var direction = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
                            newBall.applyCentralImpulse(direction.multiplyScalar(impulse));
                        }
                        console.log("EXPLODE");
                        //scene.remove(mesh);
                    }

                });
            }
            return mesh;
        }

        if (performance.now() - this.lastShot >= this.firingRate) {
            var cameraPos = controls.getObject().position;
            var ball = makeCannonBall();

            var projectileVector = new THREE.Vector3();
            camera.getWorldDirection(projectileVector);


            ball.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
            scene.add(ball);
            
            ball.applyCentralImpulse(projectileVector.multiplyScalar(impulse));
            playBallSound();

            this.onFire();
            this.lastShot = performance.now();
        }
    };
    this.ready = function () {
        this.lastShot = performance.now() - firingRate;
    }
}