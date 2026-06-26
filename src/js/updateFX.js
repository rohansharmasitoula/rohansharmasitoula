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
            if (sys.type === 'shards') {
                sys.velocity.y -= 9.8 * delta;
                sys.mesh.position.addScaledVector(sys.velocity, delta);

                if (sys.mesh.position.y < 0.08 && sys.velocity.y < 0) {
                    sys.mesh.position.y = 0.08;
                    sys.velocity.y = -sys.velocity.y * 0.4;
                    sys.velocity.x *= 0.6;
                    sys.velocity.z *= 0.6;
                }

                sys.mesh.rotation.x += sys.angularVelocity.x * delta;
                sys.mesh.rotation.y += sys.angularVelocity.y * delta;
                sys.mesh.rotation.z += sys.angularVelocity.z * delta;

                sys.mesh.material.opacity = 0.7 * (1 - sys.age / sys.maxAge);
            } else {
                const posAttr = sys.mesh.geometry.getAttribute('position');
                const arr = posAttr.array;
                for (let i = 0; i < sys.velocities.length; i++) {
                    const vel = sys.velocities[i];
                    arr[i * 3] += vel.x * delta;
                    arr[i * 3 + 1] += vel.y * delta;
                    arr[i * 3 + 2] += vel.z * delta;
                }
                posAttr.needsUpdate = true;
                sys.mesh.material.opacity = 1 - (sys.age / sys.maxAge);
            }
            activeParticles.push(sys);
        } else {
            state.scene.remove(sys.mesh);
            sys.mesh.geometry.dispose();
            sys.mesh.material.dispose();
        }
    });
    state.particleSystems = activeParticles;
}
