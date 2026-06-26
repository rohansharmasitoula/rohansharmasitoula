import { state } from './state.js';
import { init3D } from './init3D.js';
import { setupControls } from './setupControls.js';
import { animate } from './animate.js';

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('data.json');
    state.TERMINAL_DATA = await response.json();

    state.blocker = document.getElementById('blocker');
    state.instructions = document.getElementById('instructions');
    state.playButton = document.getElementById('play-button');
    state.posDisplay = document.getElementById('pos-display');
    state.scoreDisplay = document.getElementById('score-display');
    state.interactionPrompt = document.getElementById('interaction-prompt');
    state.detailModal = document.getElementById('detail-modal');
    state.closeModal = document.getElementById('close-modal');
    state.modalTitle = document.getElementById('modal-title');
    state.modalBody = document.getElementById('modal-body');

    init3D();
    setupControls();
    if (window.location.search.includes('autostart=true')) {
        state.blocker.style.display = 'none';
        state.isLocked = true;
    }
    animate();
});
