import { createElement } from '../utils/dom.js';

export function renderContacts(data) {
    const container = createElement('div', 'flex flex-col gap-6 text-slate-200');

    const h1 = createElement('h1', 'text-2xl font-bold text-white font-mono uppercase tracking-wider', data.title);
    container.appendChild(h1);

    const header = createElement('div', 'flex items-center gap-5 border-b border-purple-500/20 pb-4 -mt-2');

    const img = createElement('img', 'w-16 h-16 rounded-full border-2 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] object-cover');
    img.src = data.profilePic;
    img.alt = data.name;
    header.appendChild(img);

    const info = createElement('div', 'flex flex-col');

    const h2 = createElement('h2', 'text-base font-bold text-white font-mono', data.name);
    info.appendChild(h2);

    const role = createElement('p', 'text-xs font-semibold text-teal-400', data.role);
    info.appendChild(role);

    const loc = createElement('p', 'text-[10px] text-slate-500 mt-0.5', `${data.location} | ${data.phone}`);
    info.appendChild(loc);

    header.appendChild(info);
    container.appendChild(header);

    const socketGrid = createElement('div', 'flex flex-col gap-3');

    data.links.forEach(link => {
        const card = createElement('a', 'flex items-center gap-4 bg-slate-900/30 border border-slate-800/80 p-3 rounded hover:bg-slate-800/40 hover:border-slate-700/60 transition-all duration-300 relative before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-0 hover:before:h-[80%] before:bg-teal-400 before:transition-all before:duration-300');
        card.href = link.url;
        card.target = '_blank';

        const icon = createElement('i', `${link.icon} text-lg text-teal-400 hover:drop-shadow-[0_0_4px_rgba(45,212,191,0.6)]`);
        card.appendChild(icon);

        const txtDiv = createElement('div', 'flex flex-col');

        const label = createElement('span', 'font-bold text-xs text-white', link.label);
        const addr = createElement('span', 'text-[9px] font-mono text-slate-500 mt-0.5', link.address);

        txtDiv.appendChild(label);
        txtDiv.appendChild(addr);
        card.appendChild(txtDiv);
        socketGrid.appendChild(card);
    });

    container.appendChild(socketGrid);
    return container;
}
