import { state } from './state.js';
import { closeInspectionTerminal } from './closeInspectionTerminal.js';
import { fireWeapon } from './fireWeapon.js';

export function setupControls() {
    state.playButton.addEventListener('click', () => {
        document.body.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === document.body) {
            state.isLocked = true;
            state.blocker.style.opacity = 0;
            setTimeout(() => state.blocker.style.display = 'none', 500);
            state.modeDisplay.textContent = "LOCKED";
        } else {
            state.isLocked = false;
            if (!state.isModalOpen) {
                state.blocker.style.display = 'flex';
                setTimeout(() => state.blocker.style.opacity = 1, 10);
                state.modeDisplay.textContent = "FREE";
            }
            state.interactionPrompt.classList.remove('active');
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (state.isLocked) {
            state.yaw -= e.movementX * state.lookSensitivity;
            state.pitch -= e.movementY * state.lookSensitivity;
            state.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, state.pitch));

            state.camera.rotation.set(0, 0, 0);
            state.camera.rotation.y = state.yaw;
            state.camera.rotation.x = state.pitch;
        }
    });

    window.addEventListener('keydown', (e) => {
        state.keysPressed[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
        state.keysPressed[e.code] = false;
    });

    window.addEventListener('click', () => {
        if (state.isLocked && !state.isModalOpen) {
            fireWeapon();
        }
    });

    state.closeModal.addEventListener('click', closeInspectionTerminal);
    
    state.detailModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}
