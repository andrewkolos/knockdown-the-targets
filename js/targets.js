function addQuadTower(scale, pieceCount, pos) {
    var width = 4 * scale;
    var height = 12 * scale;
    var depth = 4 * scale;

    for (var pc = 0; pc < pieceCount; pc++) {
        for (var i = 0; i < 4; i++) {
            var rgeometry = new THREE.BoxGeometry(width, height, depth);

            var rmaterial = Physijs.createMaterial(new THREE.MeshPhongMaterial({color: 0x00FFFF}), .95, .95);
            var rmesh = new Physijs.BoxMesh(rgeometry, rmaterial);
            rmesh.castShadow = true;
            rmesh.receiveShadow = true;

            switch (i) {
                case 0:
                    rmesh.position.set(pos.x, pos.y  + (pc * height) + height/2, pos.z + (5*scale));
                    break;
                case 1:
                    rmesh.position.set(pos.x, pos.y  + (pc * height) + height/2, pos.z - (5*scale));
                    break;
                case 2:
                    rmesh.position.set(pos.x + (5*scale), pos.y + (pc *height) + height/2, pos.z);
                    break;
                case 3:
                    rmesh.position.set(pos.x - (5 * scale), pos.y + (pc*height) + height/2, pos.z);
                    break;
            }
            scene.add(rmesh);
        }
    }

    var sg = new THREE.SphereGeometry( 6*scale, 32, 32 );
    var sm = new Physijs.createMaterial( new THREE.MeshPhongMaterial({color:'red'}), .95, .95 );
    smsh = new Physijs.SphereMesh( sg, sm, 100 );
    smsh.position.set(pos.x, pos.y + pieceCount * height + (6*scale), pos.z);
    smsh.castShadow = true;
    smsh.receiveShadow = true;
    scene.add(smsh);
}