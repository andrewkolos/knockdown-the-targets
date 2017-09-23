function handleInput() {
    if (controls.enabled) {
        scene.simulate();

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
            $('#modal').css('display', 'none');
            if (!timer.running)
                timer.start();
        }

        if (Key.LmbDown()) {
            if (blueAmmo > 0)
                cannon1.fire(controls, camera, 15000, 10000);
        }

        if (Key.RmbDown()) {
            if (orangeAmmo > 0)
                cannon2.fire(controls, camera, 45000, 10000);
        }

        if (Key.isDown(Key.H)) {
            $('#modal').css('display', 'block');
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
    $('#time').html(timeRemaining);
    $('#blue-ammo').html('' + blueAmmo);
    $('#orange-ammo').html('' + orangeAmmo);
    $('#targets').html(activeTargets.length);

    var message = $('#message');
    if (activeTargets.length > 0 && timeRemaining <= 0) {
        message.html("Time's up! Press R to restart");
        message.css("display", "block");
    }

    else if (activeTargets.length === 0 && timeRemaining > 0) {
        message.html("Congratulations!");
        cheerSound.play();
        cheerSound.onended = function () {
            cheerSound.volume = 0;
        };
        if (timer.running) {
            timer.stop();
        }
        message.css("display", 'block');
    } else {
        message.css("display", "none");
    }
}

function removeOobTargets() {
    for (var i = 0; i < activeTargets.length; i++) {
        var tar = activeTargets[i];
        if (tar.position.y > 500 || tar.position.y < -50) {
            if (tar.name !== "removed") {
                activeTargets.splice(i, 1);
                tar.name = 'removed';
                scoreSound.play();
                scene.remove(tar);
            }
        }
    }
}