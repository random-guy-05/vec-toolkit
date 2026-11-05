(() => {
  const form = document.querySelector('#tool-form');
  const output = document.querySelector('#result');
  let markdown = '';

  function fieldLabel(field) {
    if (field.closest('fieldset')) return field.closest('fieldset').querySelector('legend')?.textContent.trim() || 'Checklist';
    return field.labels?.[0]?.textContent.trim() || field.getAttribute('aria-label') || field.name || field.id;
  }

  function generate() {
    const titleField = document.body.dataset.titleField ? document.getElementById(document.body.dataset.titleField) : null;
    const title = titleField?.value.trim() || document.querySelector('h1').textContent.trim();
    const lines = [`# ${title}`, '', `Created locally: ${new Date().toLocaleDateString()}`, ''];
    const done = new Set();
    for (const field of form.querySelectorAll('input, textarea, select')) {
      if (field.disabled || field.type === 'button' || field.type === 'submit' || field.type === 'reset') continue;
      const group = field.closest('fieldset');
      const isChoice = field.type === 'checkbox' || field.type === 'radio';
      const key = isChoice && group ? group : field;
      if (done.has(key)) continue;
      done.add(key);
      lines.push(`## ${fieldLabel(field)}`);
      if (isChoice && group) {
        const choices = [...group.querySelectorAll('input[type="checkbox"], input[type="radio"]')];
        const picked = choices.filter(item => item.checked).map(item => item.labels?.[0]?.textContent.trim()).filter(Boolean);
        lines.push(picked.length ? picked.map(item => `- [x] ${item}`).join('\n') : '- No items selected.');
      } else if (field.type === 'checkbox') {
        lines.push(field.checked ? '- [x] Confirmed' : '- [ ] Not confirmed');
      } else if (field.type === 'radio') {
        const checked = form.querySelector(`input[name="${CSS.escape(field.name)}"]:checked`);
        lines.push(checked?.labels?.[0]?.textContent.trim() || '_Not selected._');
      } else if (field.tagName === 'SELECT') {
        lines.push(field.selectedOptions[0]?.textContent.trim() || '_Not selected._');
      } else {
        lines.push(field.value.trim() || '_Not recorded._');
      }
      lines.push('');
    }
    lines.push('---', 'Generated in the browser. This is a planning aid; verify facts and decisions with the relevant people and current official sources.');
    markdown = lines.join('\n');
    output.replaceChildren();
    const heading = document.createElement('h2');
    heading.textContent = 'Preview';
    const pre = document.createElement('pre');
    pre.style.whiteSpace = 'pre-wrap';
    pre.textContent = markdown;
    output.append(heading, pre);
    output.className = 'output';
    return markdown;
  }

  document.querySelector('#make').addEventListener('click', generate);
  document.querySelector('#download').addEventListener('click', () => {
    const text = markdown || generate();
    const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = document.body.dataset.filename || 'vec-community-notes.md';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  document.querySelector('#copy').addEventListener('click', async () => {
    const text = markdown || generate();
    try {
      await navigator.clipboard.writeText(text);
      document.querySelector('#copy').textContent = 'Copied';
    } catch {
      output.className = 'output warning';
      output.insertAdjacentText('beforeend', ' Clipboard access is unavailable; select and copy the preview.');
    }
  });
  document.querySelector('#reset').addEventListener('click', () => {
    form.reset();
    markdown = '';
    output.className = 'output';
    output.textContent = 'Your entries stay on this page until you export them.';
    document.querySelector('#copy').textContent = 'Copy Markdown';
  });
})();
