function makeCannonBall(radius) {
    var geometry = new THREE.SphereGeometry(radius, 32, 32);
    var material = Physijs.createMaterial(new THREE.MeshLambertMaterial({color: 0x040404}), 1, 1);

    var mesh = new Physijs.SphereMesh(geometry, material, 1);

    scene.add(mesh);

    mesh.applyCentralImpulse(new THREE.Vector3(1,1,1));
}