import { state } from './state.js';

export function updateMovement(delta) {
    if (state.isLocked) {
        state.velocity.x -= state.velocity.x * state.friction * delta;
        state.velocity.z -= state.velocity.z * state.friction * delta;

        state.moveForward = !!(state.keysPressed['KeyW'] || state.keysPressed['ArrowUp']);
        state.moveBackward = !!(state.keysPressed['KeyS'] || state.keysPressed['ArrowDown']);
        state.moveLeft = !!(state.keysPressed['KeyA'] || state.keysPressed['ArrowLeft']);
        state.moveRight = !!(state.keysPressed['KeyD'] || state.keysPressed['ArrowRight']);

        state.direction.z = Number(state.moveForward) - Number(state.moveBackward);
        state.direction.x = Number(state.moveRight) - Number(state.moveLeft);
        state.direction.normalize();

        const camDir = new THREE.Vector3();
        state.camera.getWorldDirection(camDir);
        camDir.y = 0;
        camDir.normalize();

        const camRight = new THREE.Vector3();
        camRight.crossVectors(camDir, state.camera.up).normalize();

        if (state.moveForward || state.moveBackward) {
            state.velocity.z += state.direction.z * state.moveSpeed * delta;
        }
        if (state.moveLeft || state.moveRight) {
            state.velocity.x += state.direction.x * state.moveSpeed * delta;
        }

        state.camera.position.addScaledVector(camDir, state.velocity.z * delta);
        state.camera.position.addScaledVector(camRight, state.velocity.x * delta);

        state.camera.position.x = Math.max(-state.collisionBounds.x, Math.min(state.collisionBounds.x, state.camera.position.x));
        state.camera.position.z = Math.max(-state.collisionBounds.z, Math.min(state.collisionBounds.z, state.camera.position.z));
        state.camera.position.y = state.playerHeight;

        state.posDisplay.textContent = `X: ${state.camera.position.x.toFixed(1)}, Z: ${state.camera.position.z.toFixed(1)}`;
    }
}
