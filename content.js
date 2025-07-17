(() => {
  const textareaWrapper = document.querySelector('#thread-bottom .relative');
  const btnGroup = document.querySelector('[data-testid="composer-trailing-actions"]');//('#custom-btn-group');

  if (!textareaWrapper) {
    //console.log('❌ לא נמצא האלמנט #thread-bottom .relative');
    return;
  }

  if (!btnGroup) {
    //console.log('❌ לא נמצא האלמנט #custom-btn-group');
    return;
  }

  if (document.getElementById('snir-direction-btn')) {
    //console.log('🔁 כבר קיים כפתור שינוי כיוון');
    return;
  }

  const btn = document.createElement('button');
  btn.id = 'snir-direction-btn';
  btn.style.border = 'none';
  btn.style.background = 'transparent';
  btn.style.cursor = 'pointer';
  btn.style.padding = '4px';
  btn.style.marginLeft = '8px';

  const img = document.createElement('img');
  img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0MdbB27_Re6DEOc_b5s25cVPE6uxCAUR8JQ&s';
  img.alt = 'Toggle Direction';
  img.style.width = '24px';
  img.style.height = '24px';

  btn.appendChild(img);

  btn.addEventListener('click', () => {
    const dir = textareaWrapper.style.direction;
    textareaWrapper.style.direction = dir === 'rtl' ? 'ltr' : 'rtl';
    //console.log(`✅ כיוון הכתיבה שונה ל: ${textareaWrapper.style.direction}`);
  });

  btnGroup.appendChild(btn);
})();
