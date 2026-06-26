export function renderEducation(data) {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-6 text-slate-200';

    const h1 = document.createElement('h1');
    h1.className = 'text-2xl font-bold text-white font-mono uppercase tracking-wider';
    h1.textContent = data.title;
    container.appendChild(h1);

    const h2 = document.createElement('h2');
    h2.className = 'text-xs text-purple-500 font-mono uppercase tracking-widest -mt-4';
    h2.textContent = 'Academic Profile & NLP Research';
    container.appendChild(h2);

    data.publications.forEach(pub => {
        const pubDiv = document.createElement('div');
        pubDiv.className = 'border-b border-purple-500/20 pb-4';

        const h3 = document.createElement('h3');
        h3.className = 'text-sm font-semibold text-white font-mono';
        h3.textContent = pub.title;
        pubDiv.appendChild(h3);

        const sub = document.createElement('span');
        sub.className = 'block text-[10px] text-slate-500 font-mono mt-0.5 mb-2';
        sub.textContent = pub.duration;
        pubDiv.appendChild(sub);

        const p = document.createElement('p');
        p.className = 'text-xs text-purple-400 font-semibold italic mb-2';
        p.textContent = pub.paper;
        pubDiv.appendChild(p);

        const desc = document.createElement('p');
        desc.className = 'text-xs text-slate-400 leading-relaxed';
        desc.textContent = pub.description;
        pubDiv.appendChild(desc);

        container.appendChild(pubDiv);
    });

    data.degrees.forEach(deg => {
        const degDiv = document.createElement('div');
        degDiv.className = 'border-l-2 border-purple-500/30 pl-4 py-1';

        const h3 = document.createElement('h3');
        h3.className = 'text-sm font-semibold text-white font-mono';
        h3.textContent = deg.name;
        degDiv.appendChild(h3);

        const inst = document.createElement('p');
        inst.className = 'text-xs text-slate-400 mt-1';
        inst.textContent = `${deg.institution} · `;

        const grade = document.createElement('strong');
        grade.className = 'text-purple-400';
        grade.textContent = deg.grade;
        inst.appendChild(grade);
        degDiv.appendChild(inst);

        const dur = document.createElement('span');
        dur.className = 'block text-[10px] text-slate-500 font-mono mt-0.5';
        dur.textContent = deg.duration;
        degDiv.appendChild(dur);

        container.appendChild(degDiv);
    });

    return container;
}
