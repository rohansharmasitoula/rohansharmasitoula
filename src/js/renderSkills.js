import { createElement } from '../utils/dom.js';

export function renderSkills(data) {
    const container = createElement('div', 'flex flex-col gap-6 text-slate-200');

    const h1 = createElement('h1', 'text-2xl font-bold text-white font-mono uppercase tracking-wider', data.title);
    container.appendChild(h1);

    const h2 = createElement('h2', 'text-xs text-amber-500 font-mono uppercase tracking-widest -mt-4', 'Core Stack & Competencies');
    container.appendChild(h2);

    const desc = createElement('p', 'text-sm text-slate-400 leading-relaxed', data.description);
    container.appendChild(desc);

    data.categories.forEach(cat => {
        const catDiv = createElement('div', 'border border-slate-800 bg-slate-900/30 p-4 rounded');

        const h3 = createElement('h3', 'text-xs font-semibold text-teal-400 font-mono uppercase tracking-widest border-b border-teal-500/20 pb-2 mb-3', cat.name);
        catDiv.appendChild(h3);

        const tagList = createElement('div', 'flex flex-wrap gap-2');

        cat.skills.forEach(skill => {
            const badge = createElement('span', 'bg-slate-800/50 border border-slate-700/50 text-[10px] font-mono py-1 px-2.5 rounded text-teal-400 tracking-wider', skill);
            tagList.appendChild(badge);
        });

        catDiv.appendChild(tagList);
        container.appendChild(catDiv);
    });

    return container;
}
