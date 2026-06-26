import { state } from './state.js';
import { updateMovement } from './updateMovement.js';
import { updateRaycasting } from './updateRaycasting.js';
import { updateFX } from './updateFX.js';

export function animate() {
    requestAnimationFrame(animate);
    const delta = state.clock.getDelta();
    updateMovement(delta);
    updateRaycasting();
    updateFX(delta);
    state.renderer.render(state.scene, state.camera);
}
