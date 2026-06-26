import { state } from './state.js';

export function updateRaycasting() {
    if (state.isLocked) {
        state.raycaster.set(state.camera.position, new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion));
        const intersects = state.raycaster.intersectObjects(state.screenMeshes);

        if (intersects.length > 0 && intersects[0].distance < 9.5) {
            const hitScreen = intersects[0].object;
            const key = hitScreen.userData.terminalKey;
            
            state.targetableTerminal = key;
            state.interactionPrompt.classList.add('active');
            hitScreen.material.emissiveIntensity = 0.65;

            const promptText = state.interactionPrompt.querySelector('.sci-prompt-text');
            if (promptText) {
                if (state.screenStates[key].isBroken) {
                    promptText.innerHTML = '<span class="action-highlight">LEFT CLICK</span> TO SHOOT';
                } else {
                    promptText.innerHTML = '<span class="action-highlight">LEFT CLICK</span> TO SHOOT & DECRYPT';
                }
            }
        } else {
            state.screenMeshes.forEach(mesh => {
                mesh.material.emissiveIntensity = 0.15;
            });
            state.targetableTerminal = null;
            state.interactionPrompt.classList.remove('active');
        }
    }
}
