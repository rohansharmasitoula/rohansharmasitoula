export function renderWork(data) {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-6 text-slate-200';

    const h1 = document.createElement('h1');
    h1.className = 'text-2xl font-bold text-white font-mono uppercase tracking-wider';
    h1.textContent = data.title;
    container.appendChild(h1);

    const h2 = document.createElement('h2');
    h2.className = 'text-xs text-rose-500 font-mono uppercase tracking-widest -mt-4';
    h2.textContent = data.company;
    container.appendChild(h2);

    data.roles.forEach(role => {
        const roleDiv = document.createElement('div');
        roleDiv.className = 'border-l-2 border-rose-500/30 pl-4 py-1';

        const h3 = document.createElement('h3');
        h3.className = 'text-sm font-semibold text-white font-mono';
        h3.textContent = role.title;
        roleDiv.appendChild(h3);

        const duration = document.createElement('span');
        duration.className = 'block text-[10px] text-slate-500 font-mono mt-0.5 mb-2';
        duration.textContent = role.duration;
        roleDiv.appendChild(duration);

        const ul = document.createElement('ul');
        ul.className = 'list-disc list-outside ml-4 text-xs text-slate-400 space-y-1.5';

        role.highlights.forEach(high => {
            const li = document.createElement('li');
            li.textContent = high;
            ul.appendChild(li);
        });

        roleDiv.appendChild(ul);
        container.appendChild(roleDiv);
    });

    return container;
}
