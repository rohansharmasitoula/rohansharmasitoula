import { state } from './state.js';

export function addNeonLights() {
    const rLight = new THREE.PointLight(0xa855f7, 1.2, 25);
    rLight.position.set(-8, 6, -8);
    state.scene.add(rLight);
    
    const cLight = new THREE.PointLight(0x2dd4bf, 1.2, 25);
    cLight.position.set(8, 6, -8);
    state.scene.add(cLight);

    const pLight = new THREE.PointLight(0xf43f5e, 1.2, 25);
    pLight.position.set(8, 6, 8);
    state.scene.add(pLight);
}
