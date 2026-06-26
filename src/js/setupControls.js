import { state } from './state.js';
import { fireWeapon } from './fireWeapon.js';
import { restoreEnlargedScreen } from './createTerminalScreen.js';

let joystickTouchId = null;
let joystickStartX = 0;
let joystickStartY = 0;
const joystickMaxLimit = 50;
let touchLookId = null;
let lastTouchX = 0;
let lastTouchY = 0;

export function setupControls() {
    state.playButton.addEventListener('click', () => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) {
            state.isLocked = true;
            state.blocker.style.opacity = 0;
            setTimeout(() => {
                state.blocker.style.display = 'none';
            }, 500);
            const mobileControls = document.getElementById('mobile-controls');
            if (mobileControls) {
                mobileControls.style.display = 'flex';
            }
        } else {
            document.body.requestPointerLock();
        }
    });

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === document.body) {
            state.isLocked = true;
            state.blocker.style.opacity = 0;
            setTimeout(() => state.blocker.style.display = 'none', 500);
        } else {
            state.isLocked = false;
            state.isZoomed = false;
            if (state.enlargedScreen) {
                restoreEnlargedScreen(state.enlargedScreen);
            }
            state.blocker.style.display = 'flex';
            setTimeout(() => state.blocker.style.opacity = 1, 10);
            state.interactionPrompt.classList.remove('active');
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (state.isLocked) {
            const sens = state.isZoomed ? state.lookSensitivity * 0.45 : state.lookSensitivity;
            state.yaw -= e.movementX * sens;
            state.pitch -= e.movementY * sens;
            state.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, state.pitch));

            state.camera.rotation.set(0, 0, 0);
            state.camera.rotation.y = state.yaw;
            state.camera.rotation.x = state.pitch;

            state.targetSwayX = Math.max(-40, Math.min(40, e.movementX * 0.4));
            state.targetSwayY = Math.max(-30, Math.min(30, e.movementY * 0.4));
        }
    });

    window.addEventListener('keydown', (e) => {
        state.keysPressed[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
        state.keysPressed[e.code] = false;
    });

    window.addEventListener('click', () => {
        if (state.isLocked) {
            fireWeapon();
        }
    });

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    window.addEventListener('mousedown', (e) => {
        if (e.button === 2 && state.isLocked) {
            state.isZoomed = true;
        }
    });

    window.addEventListener('mouseup', (e) => {
        if (e.button === 2) {
            state.isZoomed = false;
        }
    });

    window.addEventListener('touchstart', (e) => {
        if (state.isLocked) {
            for (let i = 0; i < e.changedTouches.length; i++) {
                const touch = e.changedTouches[i];
                const el = document.elementFromPoint(touch.clientX, touch.clientY);
                const isControl = !!(el && (el.closest('#joystick-container') || el.closest('#mobile-action-buttons') || el.closest('#btn-mobile-pause')));
                if (!isControl && touchLookId === null) {
                    touchLookId = touch.identifier;
                    lastTouchX = touch.clientX;
                    lastTouchY = touch.clientY;
                }
            }
        }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (state.isLocked) {
            e.preventDefault();
            for (let i = 0; i < e.changedTouches.length; i++) {
                const touch = e.changedTouches[i];
                if (touch.identifier === touchLookId) {
                    const dx = touch.clientX - lastTouchX;
                    const dy = touch.clientY - lastTouchY;
                    lastTouchX = touch.clientX;
                    lastTouchY = touch.clientY;

                    const sens = state.isZoomed ? state.lookSensitivity * 0.25 : state.lookSensitivity * 0.5;
                    state.yaw -= dx * sens;
                    state.pitch -= dy * sens;
                    state.pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, state.pitch));

                    state.camera.rotation.set(0, 0, 0);
                    state.camera.rotation.y = state.yaw;
                    state.camera.rotation.x = state.pitch;

                    state.targetSwayX = Math.max(-40, Math.min(40, dx * 0.4));
                    state.targetSwayY = Math.max(-30, Math.min(30, dy * 0.4));
                }
            }
        }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            if (touch.identifier === touchLookId) {
                touchLookId = null;
            }
        }
    });

    const joystickContainer = document.getElementById('joystick-container');
    const joystickBase = document.getElementById('joystick-base');
    const joystickHandle = document.getElementById('joystick-handle');

    if (joystickContainer && joystickBase && joystickHandle) {
        joystickContainer.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (joystickTouchId === null) {
                const touch = e.changedTouches[0];
                joystickTouchId = touch.identifier;
                const rect = joystickBase.getBoundingClientRect();
                joystickStartX = rect.left + rect.width / 2;
                joystickStartY = rect.top + rect.height / 2;
            }
        }, { passive: false });

        joystickContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            for (let i = 0; i < e.changedTouches.length; i++) {
                const touch = e.changedTouches[i];
                if (touch.identifier === joystickTouchId) {
                    const dx = touch.clientX - joystickStartX;
                    const dy = touch.clientY - joystickStartY;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx);
                    const moveDist = Math.min(dist, joystickMaxLimit);
                    const handleX = Math.cos(angle) * moveDist;
                    const handleY = Math.sin(angle) * moveDist;

                    joystickHandle.style.transform = `translate(${handleX}px, ${handleY}px)`;

                    const normX = handleX / joystickMaxLimit;
                    const normY = handleY / joystickMaxLimit;

                    state.touchMoveForward = normY < -0.25;
                    state.touchMoveBackward = normY > 0.25;
                    state.touchMoveLeft = normX < -0.25;
                    state.touchMoveRight = normX > 0.25;
                }
            }
        }, { passive: false });

        const resetJoystick = (e) => {
            for (let i = 0; i < e.changedTouches.length; i++) {
                const touch = e.changedTouches[i];
                if (touch.identifier === joystickTouchId) {
                    joystickTouchId = null;
                    joystickHandle.style.transform = 'translate(0px, 0px)';
                    state.touchMoveForward = false;
                    state.touchMoveBackward = false;
                    state.touchMoveLeft = false;
                    state.touchMoveRight = false;
                }
            }
        };

        joystickContainer.addEventListener('touchend', (e) => {
            e.preventDefault();
            resetJoystick(e);
        }, { passive: false });

        joystickContainer.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            resetJoystick(e);
        }, { passive: false });
    }

    const btnPause = document.getElementById('btn-mobile-pause');
    if (btnPause) {
        btnPause.addEventListener('click', () => {
            state.isLocked = false;
            state.isZoomed = false;
            if (state.enlargedScreen) {
                restoreEnlargedScreen(state.enlargedScreen);
            }
            state.blocker.style.display = 'flex';
            setTimeout(() => {
                state.blocker.style.opacity = 1;
            }, 10);
            state.interactionPrompt.classList.remove('active');
            const mobileControls = document.getElementById('mobile-controls');
            if (mobileControls) {
                mobileControls.style.display = 'none';
            }
        });
    }

    const btnShoot = document.getElementById('btn-mobile-shoot');
    if (btnShoot) {
        btnShoot.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (state.isLocked) {
                fireWeapon();
            }
        });
    }

    const btnZoom = document.getElementById('btn-mobile-zoom');
    if (btnZoom) {
        btnZoom.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (state.isLocked) {
                state.isZoomed = !state.isZoomed;
                if (state.isZoomed) {
                    btnZoom.classList.add('active');
                } else {
                    btnZoom.classList.remove('active');
                }
            }
        });
    }
}
