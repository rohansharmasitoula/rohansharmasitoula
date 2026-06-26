import { state } from './state.js';

function drawCracks(ctx, x, y) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;

    for (let r = 25; r < 140; r += 35) {
        ctx.beginPath();
        const steps = 16;
        for (let j = 0; j <= steps; j++) {
            const angle = (j / steps) * Math.PI * 2;
            const rad = r + (Math.random() - 0.5) * 12;
            const px = x + Math.cos(angle) * rad;
            const py = y + Math.sin(angle) * rad;
            if (j === 0) {
                ctx.moveTo(px, py);
            } else {
                if (Math.random() > 0.15) {
                    ctx.lineTo(px, py);
                } else {
                    ctx.moveTo(px, py);
                }
            }
        }
        ctx.stroke();
    }

    const numRays = 12;
    for (let i = 0; i < numRays; i++) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        let curX = x;
        let curY = y;
        const angle = (i / numRays) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
        const length = 120 + Math.random() * 160;
        const steps = 4;
        for (let j = 0; j < steps; j++) {
            const stepLen = length / steps;
            curX += Math.cos(angle) * stepLen + (Math.random() - 0.5) * 18;
            curY += Math.sin(angle) * stepLen + (Math.random() - 0.5) * 18;
            ctx.lineTo(curX, curY);
        }
        ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    words.forEach(word => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth) {
            ctx.fillText(line, x, curY);
            line = word + ' ';
            curY += lineHeight;
        } else {
            line = testLine;
        }
    });
    ctx.fillText(line, x, curY);
    const result = curY + lineHeight;
    return result;
}

function typewriterText(text, progress) {
    const len = Math.floor(text.length * progress);
    const result = text.substring(0, len);
    return result;
}

export function redrawTerminalScreen(screenMesh) {
    const canvas = screenMesh.userData.canvas;
    const ctx = canvas.getContext('2d');
    const spec = screenMesh.userData.spec;
    const key = spec.key;
    const isBroken = state.screenStates[key]?.isBroken;
    const shootAnim = state.screenStates[key]?.shootAnimProgress || 0.0;

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
        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 24px 'Outfit', sans-serif";
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
    } else if (shootAnim > 0.0) {
        const flashVal = Math.floor(shootAnim * 15) % 2;
        ctx.fillStyle = flashVal === 0 ? '#0a0d1d' : 'rgba(239, 68, 68, 0.12)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = spec.color;
        ctx.lineWidth = 14;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
        ctx.fillStyle = '#ef4444';
        ctx.font = "bold 44px 'Orbitron', Arial, sans-serif";
        ctx.textAlign = 'center';
        const shakeX = (Math.random() - 0.5) * 12;
        const shakeY = (Math.random() - 0.5) * 12;
        ctx.fillText("SECURITY OVERRIDE DETECTED", canvas.width / 2 + shakeX, 240 + shakeY);
        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 26px 'Orbitron', Arial, sans-serif";
        ctx.fillText("DECRYPTING DATA CORE...", canvas.width / 2, 320);
        const barW = 500;
        const barH = 32;
        const barX = canvas.width / 2 - barW / 2;
        const barY = 380;
        ctx.strokeStyle = spec.color;
        ctx.lineWidth = 4;
        ctx.strokeRect(barX, barY, barW, barH);
        const progressRatio = Math.max(0.0, Math.min(1.0, 1.0 - shootAnim));
        ctx.fillStyle = spec.color;
        ctx.fillRect(barX + 6, barY + 6, Math.max(0, (barW - 12) * progressRatio), barH - 12);
        ctx.fillStyle = spec.color;
        for (let i = 0; i < 4; i++) {
            const gX = Math.random() * (canvas.width - 300) + 150;
            const gY = Math.random() * (canvas.height - 200) + 100;
            const gW = Math.random() * 200 + 40;
            const gH = Math.random() * 8 + 2;
            ctx.fillRect(gX, gY, gW, gH);
        }
    } else {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = spec.color;
        ctx.lineWidth = 14;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
        
        const progress = state.screenStates[key]?.revealProgress || 0.0;

        ctx.fillStyle = spec.color;
        ctx.font = "bold 32px 'Orbitron', Arial, sans-serif";
        ctx.textAlign = 'left';
        ctx.fillText(typewriterText(spec.title.toUpperCase(), progress), 50, 75);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(50, 95, canvas.width - 100, 2);

        const rawData = state.TERMINAL_DATA[key];

        if (key === 'skills') {
            ctx.fillStyle = '#ffffff';
            ctx.font = "bold 22px 'Outfit', sans-serif";
            wrapText(ctx, typewriterText(rawData.description, progress), 50, 135, 920, 28);

            let colY = 220;
            rawData.categories.forEach((cat, idx) => {
                const colX = (idx % 2 === 0) ? 50 : 520;
                const rowY = colY + Math.floor(idx / 2) * 250;

                ctx.fillStyle = spec.color;
                ctx.font = "bold 24px 'Orbitron', Arial, sans-serif";
                ctx.fillText(typewriterText(cat.name.toUpperCase(), progress), colX, rowY);

                ctx.fillStyle = '#ffffff';
                ctx.font = "bold 20px 'Outfit', sans-serif";
                cat.skills.forEach((skill, sIdx) => {
                    ctx.fillText(typewriterText(`· ${skill}`, progress), colX + 15, rowY + 35 + sIdx * 30);
                });
            });
        } else if (key === 'work') {
            let itemY = 140;
            rawData.roles.forEach((role, idx) => {
                if (idx < 3) {
                    ctx.fillStyle = '#ffffff';
                    ctx.font = "bold 24px 'Orbitron', Arial, sans-serif";
                    ctx.fillText(typewriterText(role.title.toUpperCase(), progress), 50, itemY);

                    ctx.fillStyle = spec.color;
                    ctx.font = "bold 18px 'Orbitron', Arial, sans-serif";
                    const durW = ctx.measureText(role.duration).width;
                    ctx.fillText(typewriterText(role.duration.toUpperCase(), progress), canvas.width - 50 - durW, itemY);

                    ctx.fillStyle = '#ffffff';
                    ctx.font = "bold 18px 'Outfit', sans-serif";
                    role.highlights.forEach((high, hIdx) => {
                        if (hIdx < 2) {
                            itemY = wrapText(ctx, typewriterText(`- ${high}`, progress), 70, itemY + 30, 880, 24);
                        }
                    });
                    itemY += 35;
                }
            });
        } else if (key === 'projects') {
            let itemY = 140;
            rawData.contributions.forEach(project => {
                ctx.fillStyle = '#ffffff';
                ctx.font = "bold 32px 'Orbitron', Arial, sans-serif";
                ctx.fillText(typewriterText(project.title.toUpperCase(), progress), 50, itemY);

                ctx.fillStyle = spec.color;
                ctx.font = "bold 20px 'Orbitron', Arial, sans-serif";
                ctx.fillText(typewriterText(project.subtitle.toUpperCase(), progress), 50, itemY + 35);

                ctx.fillStyle = '#ffffff';
                ctx.font = "bold 22px 'Outfit', sans-serif";
                itemY = wrapText(ctx, typewriterText(project.description, progress), 50, itemY + 80, 920, 28);
                itemY = wrapText(ctx, typewriterText(project.subdescription, progress), 50, itemY + 15, 920, 28);

                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.strokeStyle = 'rgba(45, 212, 191, 0.2)';
                ctx.lineWidth = 2;

                project.stats.forEach((stat, sIdx) => {
                    const boxX = 50 + sIdx * 450;
                    const boxY = itemY + 40;
                    ctx.fillRect(boxX, boxY, 420, 140);
                    ctx.strokeRect(boxX, boxY, 420, 140);

                    ctx.fillStyle = spec.color;
                    ctx.font = "bold 44px 'Orbitron', Arial, sans-serif";
                    ctx.textAlign = 'center';
                    ctx.fillText(typewriterText(stat.value, progress), boxX + 210, boxY + 65);

                    ctx.fillStyle = '#ffffff';
                    ctx.font = "bold 18px 'Orbitron', Arial, sans-serif";
                    ctx.fillText(typewriterText(stat.label.toUpperCase(), progress), boxX + 210, boxY + 110);
                    ctx.textAlign = 'left';
                });
            });
        } else if (key === 'education') {
            let itemY = 140;
            rawData.publications.forEach(pub => {
                ctx.fillStyle = spec.color;
                ctx.font = "bold 24px 'Orbitron', Arial, sans-serif";
                ctx.fillText(typewriterText(pub.title.toUpperCase(), progress), 50, itemY);

                ctx.fillStyle = '#ffffff';
                ctx.font = "bold 22px 'Outfit', sans-serif";
                ctx.fillText(typewriterText(pub.paper, progress), 50, itemY + 35);

                ctx.fillStyle = '#ffffff';
                ctx.font = "bold 20px 'Outfit', sans-serif";
                itemY = wrapText(ctx, typewriterText(pub.description, progress), 50, itemY + 75, 920, 26);
                itemY += 40;
            });

            rawData.degrees.forEach(deg => {
                ctx.fillStyle = '#ffffff';
                ctx.font = "bold 24px 'Orbitron', Arial, sans-serif";
                ctx.fillText(typewriterText(deg.name.toUpperCase(), progress), 50, itemY);

                ctx.fillStyle = spec.color;
                ctx.font = "bold 20px 'Orbitron', Arial, sans-serif";
                const durW = ctx.measureText(deg.duration).width;
                ctx.fillText(typewriterText(deg.duration.toUpperCase(), progress), canvas.width - 50 - durW, itemY);

                ctx.fillStyle = '#ffffff';
                ctx.font = "bold 22px 'Outfit', sans-serif";
                ctx.fillText(typewriterText(`${deg.institution}  ·  ${deg.grade}`, progress), 50, itemY + 35);
                itemY += 80;
            });
        } else if (key === 'achievements') {
            ctx.textAlign = 'left';
            const cardW = 440;
            const cardH = 280;
            const positions = [
                { x: 50, y: 130 },
                { x: 530, y: 130 },
                { x: 50, y: 430 },
                { x: 530, y: 430 }
            ];

            rawData.items.forEach((item, idx) => {
                if (idx < 4) {
                    const pos = positions[idx];
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
                    ctx.fillRect(pos.x, pos.y, cardW, cardH);
                    ctx.strokeStyle = 'rgba(251, 191, 36, 0.1)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(pos.x, pos.y, cardW, cardH);

                    const img = state.achievementImages[idx];
                    if (img && img.complete && progress > 0.8) {
                        ctx.drawImage(img, pos.x + 15, pos.y + 20, 180, 240);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = spec.color;
                        ctx.strokeRect(pos.x + 15, pos.y + 20, 180, 240);
                    }

                    ctx.fillStyle = spec.color;
                    ctx.font = "bold 18px 'Orbitron', Arial, sans-serif";
                    wrapText(ctx, typewriterText(item.title.toUpperCase(), progress), pos.x + 210, pos.y + 40, 215, 22);

                    ctx.fillStyle = '#ffffff';
                    ctx.font = "bold 16px 'Outfit', sans-serif";
                    wrapText(ctx, typewriterText(item.description, progress), pos.x + 210, pos.y + 110, 215, 20);
                }
            });
        } else if (key === 'contacts') {
            if (state.profilePicImage && state.profilePicImage.complete && progress > 0.8) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(150, 240, 90, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(state.profilePicImage, 60, 150, 180, 180);
                ctx.restore();

                ctx.lineWidth = 4;
                ctx.strokeStyle = spec.color;
                ctx.beginPath();
                ctx.arc(150, 240, 90, 0, Math.PI * 2);
                ctx.stroke();
            }

            ctx.fillStyle = '#ffffff';
            ctx.font = "bold 38px 'Orbitron', Arial, sans-serif";
            ctx.fillText(typewriterText(rawData.name.toUpperCase(), progress), 280, 195);

            ctx.fillStyle = spec.color;
            ctx.font = "bold 24px 'Orbitron', Arial, sans-serif";
            ctx.fillText(typewriterText(rawData.role.toUpperCase(), progress), 280, 240);

            ctx.fillStyle = '#ffffff';
            ctx.font = "bold 22px 'Outfit', sans-serif";
            ctx.fillText(typewriterText(`${rawData.location}  ·  ${rawData.phone}`, progress), 280, 280);
            ctx.fillText(typewriterText(rawData.email, progress), 280, 315);

            let gridY = 390;
            rawData.links.forEach((link, lIdx) => {
                const colX = (lIdx % 2 === 0) ? 50 : 520;
                const rowY = gridY + Math.floor(lIdx / 2) * 160;

                ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
                ctx.fillRect(colX, rowY, 450, 120);
                ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
                ctx.strokeRect(colX, rowY, 450, 120);

                ctx.fillStyle = '#ffffff';
                ctx.font = "bold 22px 'Orbitron', Arial, sans-serif";
                ctx.fillText(typewriterText(link.label.toUpperCase(), progress), colX + 25, rowY + 45);

                ctx.fillStyle = spec.color;
                ctx.font = "bold 18px 'Outfit', sans-serif";
                ctx.fillText(typewriterText(link.address, progress), colX + 25, rowY + 85);
            });
        }

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
        state.screenStates[spec.key] = { isBroken: false, impacts: [], revealProgress: 0.0, shootAnimProgress: 0.0 };
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;

    const texture = new THREE.CanvasTexture(canvas);
    
    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);
    const screenMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
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
