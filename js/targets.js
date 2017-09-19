
function addQuadTower(scale, pieceCount, pos) {
    var width = 4 * scale;
    var height = 12 * scale;
    var depth = 4 * scale;

    (new THREE.TextureLoader).load('img/wood.png', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0);
        texture.repeat.set(10);
        for (var pc = 0; pc < pieceCount; pc++) {
            for (var i = 0; i < 4; i++) {
                var rgeometry = new THREE.BoxGeometry(width, height, depth);

                var rmaterial = Physijs.createMaterial(new THREE.MeshPhongMaterial({map: texture}), .95, .95);
                var rmesh = new Physijs.BoxMesh(rgeometry, rmaterial);
                rmesh.castShadow = true;
                rmesh.receiveShadow = true;

                switch (i) {
                    case 0:
                        rmesh.position.set(pos.x, pos.y + (pc * height) + height / 2, pos.z + (5 * scale));
                        break;
                    case 1:
                        rmesh.position.set(pos.x, pos.y + (pc * height) + height / 2, pos.z - (5 * scale));
                        break;
                    case 2:
                        rmesh.position.set(pos.x + (5 * scale), pos.y + (pc * height) + height / 2, pos.z);
                        break;
                    case 3:
                        rmesh.position.set(pos.x - (5 * scale), pos.y + (pc * height) + height / 2, pos.z);
                        break;
                }

                scene.add(rmesh);
            }
        }
    });


        var ballMesh = createBeachBall(6 * scale, beachballTexture);
        ballMesh.position.set(pos.x, pos.y + pieceCount * height + (6 * scale), pos.z);
        ballMesh.castShadow = true;
        ballMesh.receiveShadow = true;
        ballMesh.setCcdMotionThreshold(1);
        ballMesh.addEventListener('collision', function (other_object) {
            if (other_object.name === 'ground' || other_object.name === 'cannonball') {

                if (activeTargets.indexOf(ballMesh) > -1) {
                    setTimeout(function () {
                        if (activeTargets.indexOf(ballMesh) > -1) { // make sure object still exists
                            activeTargets.splice(activeTargets.indexOf(ballMesh), 1);
                            scene.remove(ballMesh);
                        }
                    }, 5000);
                }
            }
            if (other_object.name === 'beachball') {

            }

        });
        scene.add(ballMesh);
        activeTargets.push(ballMesh);

}

function createBeachBall(radius, texture) {
    var geometry = new THREE.SphereGeometry(radius, 32, 32);
    var material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({map: texture}), 2, 1.5);
    return new Physijs.SphereMesh(geometry, material, 1);
}