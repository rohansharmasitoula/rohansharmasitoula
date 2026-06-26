import { state } from './state.js';

export function updateWeaponBobSway(delta) {
    if (state.weaponBobContainer) {
        let bobX = 0;
        let bobY = 0;
        const time = state.clock.getElapsedTime();

        const targetFOV = state.isZoomed ? 32 : 70;
        state.camera.fov += (targetFOV - state.camera.fov) * 10 * delta;
        state.camera.updateProjectionMatrix();

        const isMoving = !!(state.moveForward || state.moveBackward || state.moveLeft || state.moveRight);
        const bobSpeed = state.isZoomed ? 6 : 12;
        const bobAmtX = state.isZoomed ? 2 : 12;
        const bobAmtY = state.isZoomed ? 1.5 : 10;

        if (state.isLocked && isMoving) {
            bobX = Math.sin(time * bobSpeed) * bobAmtX;
            bobY = Math.abs(Math.cos(time * bobSpeed)) * bobAmtY;
        } else {
            bobX = Math.sin(time * 2) * (state.isZoomed ? 0.8 : 2);
            bobY = Math.cos(time * 2) * (state.isZoomed ? 1 : 3);
        }

        const swayFactor = state.isZoomed ? 0.15 : 1.0;
        state.swayX += (state.targetSwayX * swayFactor - state.swayX) * 12 * delta;
        state.swayY += (state.targetSwayY * swayFactor - state.swayY) * 12 * delta;
        state.targetSwayX += (0 - state.targetSwayX) * 8 * delta;
        state.targetSwayY += (0 - state.targetSwayY) * 8 * delta;

        if (state.zoomScaleVal === undefined) {
            state.zoomScaleVal = 1.0;
        }
        const targetScale = state.isZoomed ? 1.25 : 1.0;
        state.zoomScaleVal += (targetScale - state.zoomScaleVal) * 10 * delta;

        if (state.currentZoomY === undefined) {
            state.currentZoomY = 0;
        }
        const targetZoomY = state.isZoomed ? 30 : 0;
        state.currentZoomY += (targetZoomY - state.currentZoomY) * 10 * delta;

        const finalX = bobX - state.swayX;
        const finalY = bobY - state.swayY + state.currentZoomY;

        state.weaponBobContainer.style.transform = `translate(${finalX}px, ${finalY}px) scale(${state.zoomScaleVal})`;
    }
}
