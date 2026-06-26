import { state } from './state.js';

export function closeInspectionTerminal() {
    state.detailModal.classList.remove('active');
    state.isModalOpen = false;
    document.body.requestPointerLock();
}
