import { state } from './state.js';
import { init3D } from './init3D.js';
import { setupControls } from './setupControls.js';
import { animate } from './animate.js';
import { redrawTerminalScreen } from './createTerminalScreen.js';

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('data.json');
    state.TERMINAL_DATA = await response.json();

    state.blocker = document.getElementById('blocker');
    state.instructions = document.getElementById('instructions');
    state.playButton = document.getElementById('play-button');
    state.posDisplay = document.getElementById('pos-display');
    state.scoreDisplay = document.getElementById('score-display');
    state.weaponBobContainer = document.getElementById('weapon-bob-container');
    state.interactionPrompt = document.getElementById('interaction-prompt');

    state.profilePicImage = new Image();
    state.profilePicImage.src = 'assets/profile_pic.jpg';
    state.profilePicImage.onload = () => {
        state.screenMeshes.forEach(mesh => {
            if (mesh.userData.terminalKey === 'contacts') {
                redrawTerminalScreen(mesh);
            }
        });
    };

    state.championAwardImage = new Image();
    state.championAwardImage.src = 'assets/alvy_ai_proctor_post.jpg';
    state.championAwardImage.onload = () => {
        state.screenMeshes.forEach(mesh => {
            if (mesh.userData.terminalKey === 'achievements') {
                redrawTerminalScreen(mesh);
            }
        });
    };

    state.blocknotePostImage = new Image();
    state.blocknotePostImage.src = 'assets/blocknote_py_post.jpg';
    state.blocknotePostImage.onload = () => {
        state.screenMeshes.forEach(mesh => {
            if (mesh.userData.terminalKey === 'achievements') {
                redrawTerminalScreen(mesh);
            }
        });
    };

    init3D();
    setupControls();
    if (window.location.search.includes('autostart=true')) {
        state.blocker.style.display = 'none';
        state.isLocked = true;
    }
    animate();
});
