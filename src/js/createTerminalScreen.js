import { state } from './state.js';

function drawCracks(ctx, x, y) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    const numRays = 10;
    for (let i = 0; i < numRays; i++) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        let curX = x;
        let curY = y;
        const angle = (i / numRays) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const length = 80 + Math.random() * 120;
        const steps = 3;
        for (let j = 0; j < steps; j++) {
            const stepLen = length / steps;
            curX += Math.cos(angle) * stepLen + (Math.random() - 0.5) * 15;
            curY += Math.sin(angle) * stepLen + (Math.random() - 0.5) * 15;
            ctx.lineTo(curX, curY);
        }
        ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.stroke();
}

export function redrawTerminalScreen(screenMesh) {
    const canvas = screenMesh.userData.canvas;
    const ctx = canvas.getContext('2d');
    const spec = screenMesh.userData.spec;
    const key = spec.key;
    const isBroken = state.screenStates[key]?.isBroken;

    if (!isBroken) {
        ctx.fillStyle = '#0a0d1d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = spec.color;
        ctx.lineWidth = 14;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        for (let y = 30; y < canvas.height - 30; y += 8) {
            ctx.fillRect(30, y, canvas.width - 60, 2);
        }
        ctx.fillStyle = spec.color;
        ctx.font = "bold 44px 'Orbitron', Arial, sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText("DATA ARCHIVE SECURED", canvas.width / 2, 280);
        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 26px 'Orbitron', Arial, sans-serif";
        ctx.fillText(`MODULE: ${spec.title}`, canvas.width / 2, 380);
        ctx.fillStyle = '#94a3b8';
        ctx.font = "24px 'Outfit', sans-serif";
        ctx.fillText("FIRE COBALT BLASTER TO SHATTER SECURITY GLASS", canvas.width / 2, 480);
        ctx.strokeStyle = spec.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 40, 120);
        ctx.lineTo(canvas.width / 2 + 40, 120);
        ctx.lineTo(canvas.width / 2 + 40, 160);
        ctx.quadraticCurveTo(canvas.width / 2 + 40, 200, canvas.width / 2, 220);
        ctx.quadraticCurveTo(canvas.width / 2 - 40, 200, canvas.width / 2 - 40, 160);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = spec.color;
        ctx.fill();
    } else {
        ctx.fillStyle = '#05070d';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = spec.color;
        ctx.lineWidth = 14;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        ctx.fillStyle = 'rgba(255, 123, 0, 0.05)';
        ctx.fillRect(20, 20, canvas.width - 40, 110);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, canvas.width - 40, 110);
        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 38px 'Orbitron', Arial, sans-serif";
        ctx.textAlign = 'left';
        ctx.fillText(`${spec.title}`, 60, 88);
        ctx.fillStyle = spec.color;
        ctx.font = "bold 24px 'Orbitron', Arial, sans-serif";
        ctx.fillText("DECRYPTED", 720, 85);
        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 32px 'Orbitron', Arial, sans-serif";
        const rawData = state.TERMINAL_DATA[key];
        ctx.fillText(`MODULE  : ${rawData.title.toUpperCase()}`, 70, 220);
        ctx.fillStyle = '#a8b2d1';
        ctx.font = "28px 'Outfit', sans-serif";
        const textLines = [
            `Summary : ${rawData.subtitle}`,
            `Status  : UNLOCKED & DECRYPTED`,
            `Access  : SHOOT AGAIN TO EXPAND FULL RECORDS`
        ];
        textLines.forEach((line, index) => {
            ctx.fillText(line, 70, 340 + (index * 80));
        });
        const screenState = state.screenStates[key];
        if (screenState && screenState.impacts) {
            screenState.impacts.forEach(impact => {
                drawCracks(ctx, impact.x, impact.y);
            });
        }
    }
    screenMesh.userData.texture.needsUpdate = true;
}

export function createTerminalScreen(spec) {
    const screenW = 6;
    const screenH = 4.5;

    if (!state.screenStates[spec.key]) {
        state.screenStates[spec.key] = { isBroken: false, impacts: [] };
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;

    const texture = new THREE.CanvasTexture(canvas);
    
    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);
    const screenMat = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color(spec.color),
        emissiveIntensity: 0.15,
        roughness: 0.3,
        metalness: 0.8
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(spec.x, 3.5, spec.z);
    screenMesh.rotation.y = spec.rotY;
    state.scene.add(screenMesh);

    screenMesh.userData = { 
        terminalKey: spec.key,
        canvas: canvas,
        texture: texture,
        spec: spec
    };
    state.screenMeshes.push(screenMesh);

    redrawTerminalScreen(screenMesh);

    const frameGeo = new THREE.BoxGeometry(screenW + 0.5, screenH + 0.5, 0.4);
    const frameMat = new THREE.MeshStandardMaterial({
        color: 0x111624,
        roughness: 0.6,
        metalness: 0.8
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    const offsetDir = new THREE.Vector3(0, 0, -0.22).applyAxisAngle(new THREE.Vector3(0, 1, 0), spec.rotY);
    frameMesh.position.copy(screenMesh.position).add(offsetDir);
    frameMesh.rotation.y = spec.rotY;
    state.scene.add(frameMesh);
}
