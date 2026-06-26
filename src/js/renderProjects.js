export function renderProjects(data) {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-6 text-slate-200';

    const h1 = document.createElement('h1');
    h1.className = 'text-2xl font-bold text-white font-mono uppercase tracking-wider';
    h1.textContent = data.title;
    container.appendChild(h1);

    const h2 = document.createElement('h2');
    h2.className = 'text-xs text-teal-400 font-mono uppercase tracking-widest -mt-4';
    h2.textContent = 'Open Source Contributions';
    container.appendChild(h2);

    data.contributions.forEach(project => {
        const projDiv = document.createElement('div');
        projDiv.className = 'flex flex-col gap-3';

        const h3 = document.createElement('h3');
        h3.className = 'text-sm font-semibold text-white font-mono';
        h3.textContent = project.title;
        projDiv.appendChild(h3);

        const sub = document.createElement('span');
        sub.className = 'block text-[10px] text-slate-500 font-mono -mt-2';
        sub.textContent = project.subtitle;
        projDiv.appendChild(sub);

        const d1 = document.createElement('p');
        d1.className = 'text-xs text-slate-400 leading-relaxed';
        d1.textContent = project.description;
        projDiv.appendChild(d1);

        const d2 = document.createElement('p');
        d2.className = 'text-xs text-slate-400 leading-relaxed';
        d2.textContent = project.subdescription;
        projDiv.appendChild(d2);

        const statGrid = document.createElement('div');
        statGrid.className = 'grid grid-cols-2 gap-4 mt-2';

        project.stats.forEach(stat => {
            const card = document.createElement('div');
            card.className = 'bg-slate-900/30 border border-slate-800/80 p-3 rounded text-center relative before:content-[""] before:absolute before:top-0 before:left-0 before:w-1 before:h-2.5 before:bg-teal-400';
            
            const val = document.createElement('span');
            val.className = 'block font-mono text-lg font-bold text-teal-400 drop-shadow-[0_0_5px_rgba(45,212,191,0.3)]';
            val.textContent = stat.value;
            
            const lbl = document.createElement('span');
            lbl.className = 'block text-[9px] text-slate-500 uppercase tracking-wider mt-0.5';
            lbl.textContent = stat.label;

            card.appendChild(val);
            card.appendChild(lbl);
            statGrid.appendChild(card);
        });

        projDiv.appendChild(statGrid);
        container.appendChild(projDiv);
    });

    return container;
}
