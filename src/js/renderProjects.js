import { createElement } from '../utils/dom.js';

export function renderProjects(data) {
    const container = createElement('div', 'flex flex-col gap-6 text-slate-200');

    const h1 = createElement('h1', 'text-2xl font-bold text-white font-mono uppercase tracking-wider', data.title);
    container.appendChild(h1);

    const h2 = createElement('h2', 'text-xs text-teal-400 font-mono uppercase tracking-widest -mt-4', 'Open Source Contributions');
    container.appendChild(h2);

    data.contributions.forEach(project => {
        const projDiv = createElement('div', 'flex flex-col gap-3');

        const h3 = createElement('h3', 'text-sm font-semibold text-white font-mono', project.title);
        projDiv.appendChild(h3);

        const sub = createElement('span', 'block text-[10px] text-slate-500 font-mono -mt-2', project.subtitle);
        projDiv.appendChild(sub);

        const d1 = createElement('p', 'text-xs text-slate-400 leading-relaxed', project.description);
        projDiv.appendChild(d1);

        const d2 = createElement('p', 'text-xs text-slate-400 leading-relaxed', project.subdescription);
        projDiv.appendChild(d2);

        const statGrid = createElement('div', 'grid grid-cols-2 gap-4 mt-2');

        project.stats.forEach(stat => {
            const card = createElement('div', 'bg-slate-900/30 border border-slate-800/80 p-3 rounded text-center relative before:content-[""] before:absolute before:top-0 before:left-0 before:w-1 before:h-2.5 before:bg-teal-400');
            
            const val = createElement('span', 'block font-mono text-lg font-bold text-teal-400 drop-shadow-[0_0_5px_rgba(45,212,191,0.3)]', stat.value);
            const lbl = createElement('span', 'block text-[9px] text-slate-500 uppercase tracking-wider mt-0.5', stat.label);

            card.appendChild(val);
            card.appendChild(lbl);
            statGrid.appendChild(card);
        });

        projDiv.appendChild(statGrid);
        container.appendChild(projDiv);
    });

    return container;
}
