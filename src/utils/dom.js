export function createElement(tag, className, textContent) {
    const el = document.createElement(tag);
    if (className) {
        el.className = className;
    }
    if (textContent !== undefined && textContent !== null) {
        el.textContent = textContent;
    }
    return el;
}
