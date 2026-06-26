import { createElement } from '../utils/dom.js';

export function renderEducation(data) {
    const container = createElement('div', 'flex flex-col gap-6 text-slate-200');

    const h1 = createElement('h1', 'text-2xl font-bold text-white font-mono uppercase tracking-wider', data.title);
    container.appendChild(h1);

    const h2 = createElement('h2', 'text-xs text-purple-500 font-mono uppercase tracking-widest -mt-4', 'Academic Profile & NLP Research');
    container.appendChild(h2);

    data.publications.forEach(pub => {
        const pubDiv = createElement('div', 'border-b border-purple-500/20 pb-4');

        const h3 = createElement('h3', 'text-sm font-semibold text-white font-mono', pub.title);
        pubDiv.appendChild(h3);

        const sub = createElement('span', 'block text-[10px] text-slate-500 font-mono mt-0.5 mb-2', pub.duration);
        pubDiv.appendChild(sub);

        const p = createElement('p', 'text-xs text-purple-400 font-semibold italic mb-2', pub.paper);
        pubDiv.appendChild(p);

        const desc = createElement('p', 'text-xs text-slate-400 leading-relaxed', pub.description);
        pubDiv.appendChild(desc);

        container.appendChild(pubDiv);
    });

    data.degrees.forEach(deg => {
        const degDiv = createElement('div', 'border-l-2 border-purple-500/30 pl-4 py-1');

        const h3 = createElement('h3', 'text-sm font-semibold text-white font-mono', deg.name);
        degDiv.appendChild(h3);

        const inst = createElement('p', 'text-xs text-slate-400 mt-1', `${deg.institution} · `);

        const grade = createElement('strong', 'text-purple-400', deg.grade);
        inst.appendChild(grade);
        degDiv.appendChild(inst);

        const dur = createElement('span', 'block text-[10px] text-slate-500 font-mono mt-0.5', deg.duration);
        degDiv.appendChild(dur);

        container.appendChild(degDiv);
    });

    return container;
}
