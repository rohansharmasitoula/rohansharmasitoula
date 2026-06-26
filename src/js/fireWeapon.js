import { state } from './state.js';
import { redrawTerminalScreen } from './createTerminalScreen.js';

export function fireWeapon() {
    const weaponContainer = document.getElementById('weapon-container');
    const muzzleFlash = document.getElementById('muzzle-flash');
    const weaponImg = document.querySelector('.weapon-img');

    if (weaponContainer) {
        weaponContainer.style.animation = 'none';
        void weaponContainer.offsetWidth;
        weaponContainer.style.animation = 'fire-recoil 0.15s ease-out';
    }

    if (muzzleFlash) {
        muzzleFlash.style.animation = 'none';
        void muzzleFlash.offsetWidth;
        muzzleFlash.style.animation = 'flash-burst 0.1s ease-out';
    }

    if (weaponImg) {
        weaponImg.style.filter = 'brightness(1.8) contrast(1.25) drop-shadow(0 0 35px rgba(45, 212, 191, 0.65))';
        setTimeout(() => {
            if (weaponImg) {
                weaponImg.style.filter = 'brightness(1.15) contrast(1.15) drop-shadow(0 0 25px rgba(45, 212, 191, 0.2))';
            }
        }, 120);
    }

    state.raycaster.set(state.camera.position, new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion));
    const intersects = state.raycaster.intersectObjects(state.screenMeshes);

    let isHit = false;
    let endPoint = state.camera.position.clone().add(new THREE.Vector3(0, 0, -50).applyQuaternion(state.camera.quaternion));
    
    if (intersects.length > 0) {
        const hitPt = intersects[0].point;
        const distance = intersects[0].distance;

        if (distance < 9.5) {
            isHit = true;
            endPoint = hitPt;

            const hitScreen = intersects[0].object;
            const key = hitScreen.userData.terminalKey;
            
            const localPt = hitPt.clone();
            hitScreen.worldToLocal(localPt);
            
            const canvasX = ((localPt.x + 3) / 6) * 1024;
            const canvasY = ((2.25 - localPt.y) / 4.5) * 768;

            const isBroken = state.screenStates[key].isBroken;

            if (!isBroken) {
                state.screenStates[key].isBroken = true;
                state.screenStates[key].impacts.push({ x: canvasX, y: canvasY });
                redrawTerminalScreen(hitScreen);

                const shardCount = 35;
                const glassColor = hitScreen.userData.spec.color;

                for (let i = 0; i < shardCount; i++) {
                    const shardGeo = new THREE.TetrahedronGeometry(0.04 + Math.random() * 0.08, 0);
                    const shardMat = new THREE.MeshStandardMaterial({
                        color: new THREE.Color(glassColor),
                        transparent: true,
                        opacity: 0.7,
                        roughness: 0.1,
                        metalness: 0.9,
                        side: THREE.DoubleSide
                    });
                    const shardMesh = new THREE.Mesh(shardGeo, shardMat);
                    shardMesh.position.copy(hitPt);
                    state.scene.add(shardMesh);

                    const vel = new THREE.Vector3(
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.2) * 7 + 2,
                        (Math.random() - 0.5) * 8
                    );
                    const rotVel = new THREE.Vector3(
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    );

                    state.particleSystems.push({
                        mesh: shardMesh,
                        velocity: vel,
                        angularVelocity: rotVel,
                        age: 0,
                        maxAge: 1.2,
                        type: 'shards'
                    });
                }
            } else {
                state.screenStates[key].impacts.push({ x: canvasX, y: canvasY });
                redrawTerminalScreen(hitScreen);
            }

            const sparkGeo = new THREE.BufferGeometry();
            const count = 25;
            const posArray = new Float32Array(count * 3);
            const velArray = [];

            for (let i = 0; i < count; i++) {
                posArray[i * 3] = hitPt.x;
                posArray[i * 3 + 1] = hitPt.y;
                posArray[i * 3 + 2] = hitPt.z;

                velArray.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 5,
                    (Math.random() - 0.5) * 5,
                    (Math.random() - 0.5) * 5
                ));
            }
            sparkGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            const sparkMat = new THREE.PointsMaterial({
                size: 0.1,
                color: new THREE.Color(hitScreen.userData.spec.color),
                transparent: true,
                opacity: 1
            });
            const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
            state.scene.add(sparkPoints);
            state.particleSystems.push({
                mesh: sparkPoints,
                velocities: velArray,
                age: 0,
                maxAge: 0.4,
                type: 'sparks'
            });
        }
    }

    if (isHit) {
        state.hits += 1;
    } else {
        state.misses += 1;
    }

    if (state.scoreDisplay) {
        state.scoreDisplay.textContent = `HITS: ${state.hits} | MISSES: ${state.misses}`;
    }

    const startPoint = state.camera.position.clone().add(new THREE.Vector3(0, -0.2, -0.5).applyQuaternion(state.camera.quaternion));
    const laserGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        startPoint.x, startPoint.y, startPoint.z,
        endPoint.x, endPoint.y, endPoint.z
    ]);
    laserGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const laserMat = new THREE.LineBasicMaterial({
        color: 0x2dd4bf,
        transparent: true,
        opacity: 1
    });
    const laserLine = new THREE.Line(laserGeo, laserMat);
    state.scene.add(laserLine);
    state.laserBeams.push({
        mesh: laserLine,
        age: 0,
        maxAge: 0.12
    });
}
