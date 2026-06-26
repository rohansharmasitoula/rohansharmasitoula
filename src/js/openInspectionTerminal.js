import { state } from './state.js';
import { renderSkills } from './renderSkills.js';
import { renderWork } from './renderWork.js';
import { renderProjects } from './renderProjects.js';
import { renderEducation } from './renderEducation.js';
import { renderAchievements } from './renderAchievements.js';
import { renderContacts } from './renderContacts.js';

export function openInspectionTerminal(key) {
    const data = state.TERMINAL_DATA[key];
    if (data) {
        state.isModalOpen = true;
        state.modalTitle.textContent = data.title.toUpperCase();
        state.modalBody.innerHTML = '';
        
        let component = null;
        if (key === 'skills') {
            component = renderSkills(data);
        } else if (key === 'work') {
            component = renderWork(data);
        } else if (key === 'projects') {
            component = renderProjects(data);
        } else if (key === 'education') {
            component = renderEducation(data);
        } else if (key === 'achievements') {
            component = renderAchievements(data);
        } else if (key === 'contacts') {
            component = renderContacts(data);
        }
        
        if (component) {
            state.modalBody.appendChild(component);
        }
        
        state.detailModal.classList.add('active');
        document.exitPointerLock();
    }
}
