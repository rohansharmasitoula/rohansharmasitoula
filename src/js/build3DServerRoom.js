import { state } from './state.js';
import { createTerminalScreen } from './createTerminalScreen.js';

export function build3DServerRoom() {
    const gridHelper = new THREE.GridHelper(24, 24, 0x2dd4bf, 0x11162d);
    gridHelper.position.y = 0;
    state.scene.add(gridHelper);

    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
        color: 0x050714,
        roughness: 0.8,
        metalness: 0.9
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.01;
    state.scene.add(floorMesh);

    const ceilingGeo = new THREE.PlaneGeometry(24, 24);
    const ceilingMat = new THREE.MeshStandardMaterial({
        color: 0x020306,
        roughness: 0.9,
        metalness: 0.5
    });
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.y = 12;
    state.scene.add(ceilingMesh);

    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 22;
        posArray[i+1] = Math.random() * 11;
        posArray[i+2] = (Math.random() - 0.5) * 22;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
        size: 0.08,
        color: 0x2dd4bf,
        transparent: true,
        opacity: 0.65
    });
    const starField = new THREE.Points(particleGeo, particleMat);
    state.scene.add(starField);

    const monitorSpecs = [
        { key: "education", x: -11.5, z: -4, rotY: Math.PI / 2, title: "EDUCATION & PUBS", color: "#a855f7" },
        { key: "contacts", x: -11.5, z: 4, rotY: Math.PI / 2, title: "CONTACT INFO", color: "#a855f7" },
        { key: "skills", x: -5.5, z: -11.5, rotY: 0, title: "TECHNICAL SKILLS", color: "#2dd4bf" },
        { key: "achievements", x: 5.5, z: -11.5, rotY: 0, title: "ACHIEVEMENTS", color: "#fbbf24" },
        { key: "work", x: 11.5, z: -4, rotY: -Math.PI / 2, title: "WORK EXPERIENCE", color: "#f43f5e" },
        { key: "projects", x: 11.5, z: 4, rotY: -Math.PI / 2, title: "PROJECTS & OPEN SOURCE", color: "#2dd4bf" }
    ];

    monitorSpecs.forEach(spec => {
        createTerminalScreen(spec);
    });
}
