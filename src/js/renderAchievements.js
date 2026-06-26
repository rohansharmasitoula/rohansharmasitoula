import { createElement } from '../utils/dom.js';

export function renderAchievements(data) {
    const container = createElement('div', 'flex flex-col gap-6 text-slate-200');

    const h1 = createElement('h1', 'text-2xl font-bold text-white font-mono uppercase tracking-wider', data.title);
    container.appendChild(h1);

    const h2 = createElement('h2', 'text-xs text-amber-500 font-mono uppercase tracking-widest -mt-4', 'Talview Recognition & Industry Milestones');
    container.appendChild(h2);

    const socketGrid = createElement('div', 'flex flex-col gap-3');

    data.items.forEach(item => {
        const card = createElement('a', 'flex items-center gap-4 bg-slate-900/30 border border-slate-800/80 p-3.5 rounded hover:bg-slate-800/40 hover:border-slate-700/60 transition-all duration-300 relative before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-0 hover:before:h-[80%] before:bg-amber-500 before:transition-all before:duration-300');
        card.href = item.url;
        card.target = '_blank';

        const icon = createElement('i', `${item.icon} text-lg ${item.colorClass}`);
        card.appendChild(icon);

        const txtDiv = createElement('div', 'flex flex-col');

        const label = createElement('span', 'font-bold text-xs text-white', item.title);
        const addr = createElement('span', 'text-[10px] text-slate-400 mt-0.5 leading-relaxed', item.description);

        txtDiv.appendChild(label);
        txtDiv.appendChild(addr);
        card.appendChild(txtDiv);
        socketGrid.appendChild(card);
    });

    container.appendChild(socketGrid);
    return container;
}
