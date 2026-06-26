import { state } from './state.js';

export function createTerminalScreen(spec) {
    const screenW = 6;
    const screenH = 4.5;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d');
    
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
    ctx.fillText(`${spec.title}`, 60, 88);

    ctx.fillStyle = spec.color;
    ctx.font = "bold 24px 'Orbitron', Arial, sans-serif";
    ctx.fillText("ARCHIVE LOGS", 720, 85);

    ctx.fillStyle = '#ffffff';
    ctx.font = "bold 32px 'Orbitron', Arial, sans-serif";
    
    const rawData = state.TERMINAL_DATA[spec.key];
    ctx.fillText(`MODULE  : ${rawData.title.toUpperCase()}`, 70, 220);
    
    ctx.fillStyle = '#a8b2d1';
    ctx.font = "28px 'Outfit', sans-serif";
    
    const textLines = [
        `Summary : ${rawData.subtitle}`,
        `Status  : SYNCHRONIZED`,
        `Access  : AIM RETICLE & PRESS [E] TO DECRYPT DATA`
    ];
    
    textLines.forEach((line, index) => {
        ctx.fillText(line, 70, 340 + (index * 80));
    });

    ctx.strokeStyle = spec.color;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(40, 180); ctx.lineTo(40, 150); ctx.lineTo(70, 150); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(canvas.width - 40, canvas.height - 60); ctx.lineTo(canvas.width - 40, canvas.height - 30); ctx.lineTo(canvas.width - 70, canvas.height - 30); ctx.stroke();

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

    screenMesh.userData = { terminalKey: spec.key };
    state.screenMeshes.push(screenMesh);

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
