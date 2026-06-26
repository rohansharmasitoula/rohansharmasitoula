export function renderAchievements(data) {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-6 text-slate-200';

    const h1 = document.createElement('h1');
    h1.className = 'text-2xl font-bold text-white font-mono uppercase tracking-wider';
    h1.textContent = data.title;
    container.appendChild(h1);

    const h2 = document.createElement('h2');
    h2.className = 'text-xs text-amber-500 font-mono uppercase tracking-widest -mt-4';
    h2.textContent = 'Talview Recognition & Industry Milestones';
    container.appendChild(h2);

    const socketGrid = document.createElement('div');
    socketGrid.className = 'flex flex-col gap-3';

    data.items.forEach(item => {
        const card = document.createElement('a');
        card.href = item.url;
        card.target = '_blank';
        card.className = 'flex items-center gap-4 bg-slate-900/30 border border-slate-800/80 p-3.5 rounded hover:bg-slate-800/40 hover:border-slate-700/60 transition-all duration-300 relative before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-0 hover:before:h-[80%] before:bg-amber-500 before:transition-all before:duration-300';

        const icon = document.createElement('i');
        icon.className = `${item.icon} text-lg ${item.colorClass}`;
        card.appendChild(icon);

        const txtDiv = document.createElement('div');
        txtDiv.className = 'flex flex-col';

        const label = document.createElement('span');
        label.className = 'font-bold text-xs text-white';
        label.textContent = item.title;

        const addr = document.createElement('span');
        addr.className = 'text-[10px] text-slate-400 mt-0.5 leading-relaxed';
        addr.textContent = item.description;

        txtDiv.appendChild(label);
        txtDiv.appendChild(addr);
        card.appendChild(txtDiv);
        socketGrid.appendChild(card);
    });

    container.appendChild(socketGrid);
    return container;
}
