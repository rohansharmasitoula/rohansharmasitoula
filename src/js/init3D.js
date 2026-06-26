import { state } from './state.js';
import { addNeonLights } from './addNeonLights.js';
import { build3DServerRoom } from './build3DServerRoom.js';
import { onWindowResize } from './onWindowResize.js';

export function init3D() {
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color(0x020306);
    state.scene.fog = new THREE.FogExp2(0x020306, 0.05);

    state.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
    state.camera.rotation.order = 'YXZ';
    state.camera.position.set(0, state.playerHeight, 8);

    state.renderer = new THREE.WebGLRenderer({ antialias: true });
    state.renderer.setSize(window.innerWidth, window.innerHeight);
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    state.renderer.shadowMap.enabled = true;
    document.getElementById('canvas-container').appendChild(state.renderer.domElement);

    state.raycaster = new THREE.Raycaster();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    state.scene.add(ambientLight);

    addNeonLights();
    build3DServerRoom();

    window.addEventListener('resize', onWindowResize);
}
