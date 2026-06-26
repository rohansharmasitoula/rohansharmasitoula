import { state } from './state.js';

export function updateWeaponBobSway(delta) {
    if (state.weaponBobContainer) {
        let bobX = 0;
        let bobY = 0;
        const time = state.clock.getElapsedTime();

        const isMoving = !!(state.moveForward || state.moveBackward || state.moveLeft || state.moveRight);
        if (state.isLocked && isMoving) {
            bobX = Math.sin(time * 12) * 12;
            bobY = Math.abs(Math.cos(time * 12)) * 10;
        } else {
            bobX = Math.sin(time * 2) * 2;
            bobY = Math.cos(time * 2) * 3;
        }

        state.swayX += (state.targetSwayX - state.swayX) * 12 * delta;
        state.swayY += (state.targetSwayY - state.swayY) * 12 * delta;
        state.targetSwayX += (0 - state.targetSwayX) * 8 * delta;
        state.targetSwayY += (0 - state.targetSwayY) * 8 * delta;

        const finalX = bobX - state.swayX;
        const finalY = bobY - state.swayY;

        state.weaponBobContainer.style.transform = `translate(${finalX}px, ${finalY}px)`;
    }
}
