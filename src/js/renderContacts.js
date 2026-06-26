export function renderContacts(data) {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-6 text-slate-200';

    const h1 = document.createElement('h1');
    h1.className = 'text-2xl font-bold text-white font-mono uppercase tracking-wider';
    h1.textContent = data.title;
    container.appendChild(h1);

    const header = document.createElement('div');
    header.className = 'flex items-center gap-5 border-b border-purple-500/20 pb-4 -mt-2';

    const img = document.createElement('img');
    img.src = data.profilePic;
    img.alt = data.name;
    img.className = 'w-16 h-16 rounded-full border-2 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.4)] object-cover';
    header.appendChild(img);

    const info = document.createElement('div');
    info.className = 'flex flex-col';

    const h2 = document.createElement('h2');
    h2.className = 'text-base font-bold text-white font-mono';
    h2.textContent = data.name;
    info.appendChild(h2);

    const role = document.createElement('p');
    role.className = 'text-xs font-semibold text-teal-400';
    role.textContent = data.role;
    info.appendChild(role);

    const loc = document.createElement('p');
    loc.className = 'text-[10px] text-slate-500 mt-0.5';
    loc.textContent = `${data.location} | ${data.phone}`;
    info.appendChild(loc);

    header.appendChild(info);
    container.appendChild(header);

    const socketGrid = document.createElement('div');
    socketGrid.className = 'flex flex-col gap-3';

    data.links.forEach(link => {
        const card = document.createElement('a');
        card.href = link.url;
        card.target = '_blank';
        card.className = 'flex items-center gap-4 bg-slate-900/30 border border-slate-800/80 p-3 rounded hover:bg-slate-800/40 hover:border-slate-700/60 transition-all duration-300 relative before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-0 hover:before:h-[80%] before:bg-teal-400 before:transition-all before:duration-300';

        const icon = document.createElement('i');
        icon.className = `${link.icon} text-lg text-teal-400 hover:drop-shadow-[0_0_4px_rgba(45,212,191,0.6)]`;
        card.appendChild(icon);

        const txtDiv = document.createElement('div');
        txtDiv.className = 'flex flex-col';

        const label = document.createElement('span');
        label.className = 'font-bold text-xs text-white';
        label.textContent = link.label;

        const addr = document.createElement('span');
        addr.className = 'text-[9px] font-mono text-slate-500 mt-0.5';
        addr.textContent = link.address;

        txtDiv.appendChild(label);
        txtDiv.appendChild(addr);
        card.appendChild(txtDiv);
        socketGrid.appendChild(card);
    });

    container.appendChild(socketGrid);
    return container;
}
