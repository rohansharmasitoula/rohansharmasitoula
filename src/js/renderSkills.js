export function renderSkills(data) {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-6 text-slate-200';

    const h1 = document.createElement('h1');
    h1.className = 'text-2xl font-bold text-white font-mono uppercase tracking-wider';
    h1.textContent = data.title;
    container.appendChild(h1);

    const h2 = document.createElement('h2');
    h2.className = 'text-xs text-amber-500 font-mono uppercase tracking-widest -mt-4';
    h2.textContent = 'Core Stack & Competencies';
    container.appendChild(h2);

    const desc = document.createElement('p');
    desc.className = 'text-sm text-slate-400 leading-relaxed';
    desc.textContent = data.description;
    container.appendChild(desc);

    data.categories.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = 'border border-slate-800 bg-slate-900/30 p-4 rounded';

        const h3 = document.createElement('h3');
        h3.className = 'text-xs font-semibold text-teal-400 font-mono uppercase tracking-widest border-b border-teal-500/20 pb-2 mb-3';
        h3.textContent = cat.name;
        catDiv.appendChild(h3);

        const tagList = document.createElement('div');
        tagList.className = 'flex flex-wrap gap-2';

        cat.skills.forEach(skill => {
            const badge = document.createElement('span');
            badge.className = 'bg-slate-800/50 border border-slate-700/50 text-[10px] font-mono py-1 px-2.5 rounded text-teal-400 tracking-wider';
            badge.textContent = skill;
            tagList.appendChild(badge);
        });

        catDiv.appendChild(tagList);
        container.appendChild(catDiv);
    });

    return container;
}
