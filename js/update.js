function handleInput() {
    if (controls.enabled) {

        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        var intersections = raycaster.intersectObjects(objects);

        var isOnObject = intersections.length > 0;

        var time = performance.now();

        var delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 50.0 * delta; // 100.0 = mass

        if (Key.isDown(Key.W)) velocity.z -= 600.0 * delta;
        if (Key.isDown(Key.S)) velocity.z += 600.0 * delta;

        if (Key.isDown(Key.A)) velocity.x -= 600.0 * delta;
        if (Key.isDown(Key.D)) velocity.x += 600.0 * delta;

        if (Key.isDown(Key.SPACE)) {
            if (canJump) velocity.y = 150;
            canJump = false;
        }

        if (Key.LmbDown()) {
            cannon.fire(1, 75, controls, camera, 15000, 10000);
        }

        if (isOnObject === true) {
            velocity.y = Math.max(0, velocity.y);

            canJump = true;
        }

        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);

        if (controls.getObject().position.y < 5) {

            velocity.y = 0;
            controls.getObject().position.y = 5;

            canJump = true;

        }



        prevTime = time;
    }
}

function updateGui() {

}