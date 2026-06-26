import { createElement } from '../utils/dom.js';

export function renderWork(data) {
    const container = createElement('div', 'flex flex-col gap-6 text-slate-200');

    const h1 = createElement('h1', 'text-2xl font-bold text-white font-mono uppercase tracking-wider', data.title);
    container.appendChild(h1);

    const h2 = createElement('h2', 'text-xs text-rose-500 font-mono uppercase tracking-widest -mt-4', data.company);
    container.appendChild(h2);

    data.roles.forEach(role => {
        const roleDiv = createElement('div', 'border-l-2 border-rose-500/30 pl-4 py-1');

        const h3 = createElement('h3', 'text-sm font-semibold text-white font-mono', role.title);
        roleDiv.appendChild(h3);

        const duration = createElement('span', 'block text-[10px] text-slate-500 font-mono mt-0.5 mb-2', role.duration);
        roleDiv.appendChild(duration);

        const ul = createElement('ul', 'list-disc list-outside ml-4 text-xs text-slate-400 space-y-1.5');

        role.highlights.forEach(high => {
            const li = createElement('li', null, high);
            ul.appendChild(li);
        });

        roleDiv.appendChild(ul);
        container.appendChild(roleDiv);
    });

    return container;
}
