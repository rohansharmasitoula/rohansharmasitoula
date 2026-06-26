import { state } from './state.js';

export function updateFX(delta) {
    const activeLasers = [];
    state.laserBeams.forEach(laser => {
        laser.age += delta;
        if (laser.age < laser.maxAge) {
            laser.mesh.material.opacity = 1 - (laser.age / laser.maxAge);
            activeLasers.push(laser);
        } else {
            state.scene.remove(laser.mesh);
            laser.mesh.geometry.dispose();
            laser.mesh.material.dispose();
        }
    });
    state.laserBeams = activeLasers;

    const activeParticles = [];
    state.particleSystems.forEach(sys => {
        sys.age += delta;
        if (sys.age < sys.maxAge) {
            const posAttr = sys.mesh.geometry.getAttribute('position');
            const arr = posAttr.array;
            for (let i = 0; i < sys.velocities.length; i++) {
                const vel = sys.velocities[i];
                if (sys.type === 'shards') {
                    vel.y -= 9.8 * delta;
                }
                arr[i * 3] += vel.x * delta;
                arr[i * 3 + 1] += vel.y * delta;
                arr[i * 3 + 2] += vel.z * delta;
            }
            posAttr.needsUpdate = true;
            sys.mesh.material.opacity = 1 - (sys.age / sys.maxAge);
            activeParticles.push(sys);
        } else {
            state.scene.remove(sys.mesh);
            sys.mesh.geometry.dispose();
            sys.mesh.material.dispose();
        }
    });
    state.particleSystems = activeParticles;
}
