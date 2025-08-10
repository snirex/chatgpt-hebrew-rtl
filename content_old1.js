javascript:(function(){
let textareaDirection='rtl';

function toggleDirection(){
  textareaDirection=textareaDirection==='rtl'?'ltr':'rtl';
  const textarea=document.querySelector('#prompt-textarea');
  if(textarea){textarea.style.direction=textareaDirection;}
  const img=document.querySelector('#direction-toggle-button img');
  if(img){img.style.transform=textareaDirection==='ltr'?'scaleX(-1)':'scaleX(1)';}

  // עדכון מיקום btnGroup לפי הכיוון החדש
  const btnGroup=document.querySelector('#custom-btn-group');
  if(btnGroup){
    if(textareaDirection === 'rtl'){
      btnGroup.style.right = 'auto';
      btnGroup.style.left = '95px';
    } else {
      btnGroup.style.left = 'auto';
      btnGroup.style.right = '95px';
    }
  }
}

function toggleMarkdownDirection(){
  const markdowns=document.querySelectorAll('.markdown');
  markdowns.forEach(el=>{el.dir=el.dir==='rtl'?'ltr':'rtl';});
  const img=document.querySelector('#markdown-toggle-button img');
  if(img){img.style.transform=img.style.transform==='scaleX(-1)'?'scaleX(1)':'scaleX(-1)';}
}

function toggleWhitespaceStyle(){
  document.querySelectorAll('.whitespace-pre-wrap').forEach(el=>{
    const isActive=el.classList.contains('styled-q');
    if(isActive){
      el.classList.remove('styled-q');
      el.style.border='';el.style.borderRadius='';el.style.background='';
    }else{
      el.classList.add('styled-q');
      el.style.border='1px solid red';
      el.style.borderRadius='10px';
      el.style.background='lightyellow';
    }
  });
}

function toggleQButtonGlow(){
  const qButton=document.querySelector('#q-style-toggle-button');
  if(!qButton)return;
  const glowing=qButton.classList.toggle('glowing-q');
  if(glowing){qButton.style.boxShadow='0 0 10px 4px yellow';}
  else{qButton.style.boxShadow='0 2px 6px rgba(0,0,0,0.2)';}
}

function createTooltip(btn){
  let tooltip=document.createElement('div');
  tooltip.textContent='Snir Elgabsi';
  tooltip.style.cssText=`
    position:absolute;
    bottom:120%;
    left:50%;
    transform:translateX(-50%) scale(0.5);
    padding:5px 10px;
    background:rgba(0,0,0,0.7);
    color:white;
    border-radius:6px;
    font-size:0.9rem;
    opacity:0;
    transition:opacity 0.3s ease, transform 0.3s ease;
    pointer-events:auto;
    cursor:pointer;
    z-index:10000;
    white-space:nowrap;
  `;
  tooltip.onclick=()=>{window.open('https://snir.blogspot.com','_blank')};
  btn.appendChild(tooltip);
  setTimeout(()=>{tooltip.style.opacity='1';tooltip.style.transform='translateX(-50%) scale(1)';},10);
  btn._tooltip=tooltip;
}

function removeTooltip(btn){
  if(btn._tooltip){
    btn._tooltip.style.opacity='0';
    btn._tooltip.style.transform='translateX(-50%) scale(0.5)';
    setTimeout(()=>{if(btn._tooltip){btn._tooltip.remove();btn._tooltip=null;}},300);
  }
}

function addTooltipEvents(btn){
  let hoverTimeout=null;
  let leaveTimeout=null;
  btn.addEventListener('mouseenter',()=>{
    clearTimeout(leaveTimeout);
    hoverTimeout=setTimeout(()=>createTooltip(btn),1500);
  });
  btn.addEventListener('mouseleave',()=>{
    clearTimeout(hoverTimeout);
    leaveTimeout=setTimeout(()=>removeTooltip(btn),1000);
  });
}

function createDirectionButton(){
  if(document.querySelector('#direction-toggle-button'))return;

  const textarea=document.querySelector('#prompt-textarea');
  const buttonContainer=textarea?.closest('form')?.querySelector('div.flex > div.flex');
  if(!textarea||!buttonContainer)return;

  let btnGroup=document.querySelector('#custom-btn-group');
  if(!btnGroup){
    btnGroup=document.createElement('div');
    btnGroup.id='custom-btn-group';
    btnGroup.style.cssText=`
      position:absolute;
      bottom:13px;
      display:flex;
      gap:10px;
      z-index:9999;
    `;
    buttonContainer.style.position='relative';
    buttonContainer.appendChild(btnGroup);
  }

  // עדכון המיקום לפי כיוון הטקסט
  if(textareaDirection === 'rtl'){
    btnGroup.style.right = 'auto';
    btnGroup.style.left = '95px';
  } else {
    btnGroup.style.left = 'auto';
    btnGroup.style.right = '95px';
  }

  function makeButton(id,title,imgSrc,imgAlt,clickHandler){
    const btn=document.createElement('button');
    btn.id=id;
    btn.title=title;
    btn.style.cssText='width:2.2rem;height:2.2rem;border-radius:50%;background:white;color:black;border:1px solid lightgray;font-size:1.2rem;box-shadow:0 2px 6px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;position:relative;';
    btn.onmouseover=()=>btn.style.backgroundColor='#f0f0f0';
    btn.onmouseout=()=>btn.style.backgroundColor='white';
    btn.onclick=(e)=>{e.preventDefault();clickHandler();};
    const img=document.createElement('img');
    img.src=imgSrc;
    img.alt=imgAlt;
    img.style.cssText='width:1.5rem;height:1.5rem;object-fit:contain;pointer-events:none;';
    btn.appendChild(img);
    addTooltipEvents(btn);
    return btn;
  }

  const dirBtn=makeButton(
    'direction-toggle-button',
    textareaDirection==='rtl'?'כיוון כתיבה מימין לשמאל':'כיוון כתיבה משמאל לימין',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA1CAMAAADBGsOLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAA5UExURYmJiS8vLyoqKmpqagAAABQUFJOTkxkZGYSEhJmZmYuLiyEhIXp6ejg4ODMzMwoKChcXFxEREQAAAMBO9z0AAAATdFJOU////////////////////////wCyfdwIAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGHRFWHRTb2Z0d2FyZQBQYWludC5ORVQgNS4xLjeL1vc5AAAAtmVYSWZJSSoACAAAAAUAGgEFAAEAAABKAAAAGwEFAAEAAABSAAAAKAEDAAEAAAACAAAAMQECABAAAABaAAAAaYcEAAEAAABqAAAAAAAAAGAAAAABAAAAYAAAAAEAAABQYWludC5ORVQgNS4xLjcAAwAAkAcABAAAADAyMzABoAMAAQAAAAEAAAAFoAQAAQAAAJQAAAAAAAAAAgABAAIABAAAAFI5OAACAAcABAAAADAxMDAAAAAAJUeejaM0tcUAAAC7SURBVEhL7ZbBEoIwDEQBIyiKaP//Y53GHYy2tAlcpPgOnPYdmrQklVvH349Q1XmawyvK3y/oqIBaH437nQI6+WiZPkqUhM4+GvX7S54u0T8DxfhXssLa5Kt6LiFWV/if92fr/oCq6mFt8l3bm4D49pfxez7Ol2Pu/CiuAo6HPtqbZeb/tx+f1cDXvwOOB76RMvwbhpoBOf/qETPVgpi/4x09tSDuz2PjfrOofmL/G7BUGkjtnwb27Tv3BMWXp4OR2SRUAAAAAElFTkSuQmCC',
    'כיוון כתיבה',
    toggleDirection
  );
  dirBtn.querySelector('img').style.transform=textareaDirection==="ltr"?"scaleX(-1)":"scaleX(1)";

  const mdBtn=makeButton(
    'markdown-toggle-button',
    'החלף כיוון כתיבה של התשובות',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAIAAAAByLdKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALeSURBVHhe7ZsxjuIwFIZTU+0RKLkBJWlX4gLT0SPtDZBAokFcAYFoqaDZFiqQQKKAHi5ARUvB/orfWCSZOF7ivDHM+ypiXvL7ix2HSCG4/xhE9R2xVV0ul61Wq1qtBiyEYXg+nynbEVaqCKYuMILT6tY2XzXtiU6UCsW4ts1R7Xa7FBsE+Ox8UqXBZUJ5EQ5tTarIoMAgwLVKrSWTUAWubE2qk8lEhWE8qal8tCpC9WR2YmtS1bP3W1Qxj4BDW5PqYyo1lU8i1KGt76rAle0LqAIntq+hCorbvowqKGj7SqqgiK2/qrirU1Ocp229U9W/W5BOTSmes/VOFVkqFBgcnrD1ThVoB/NT6//a+qiKTmsHAGH05Esey3JtfVQFjyNmj/m3uqeqAEOUGLdcUE87f4W/qhqkA6zMWegnsJdXzQXdU/0UVUJUI0TVO0Q1iahGiGqMTqdTq9VQ87s0cHBEIIgiU3CojkYjVcAD4ig4Dofq4XBQBTwcj0cKjsOhCi6Xy5oFBFFkCiZVHxDVJKIakat6vV7VnYaBRqOBOAqOw6E6GAxUAQ+Io+A4HKq3263ZbKoazS9H0OE+QRDiKDgOh6oniGoSUY2wUT2dTn9ZQBBFpuBQ3W63qoAHxFFwHA7V6XSqCnhAHAXH4VAFw+GwXq+j5qM0cHBEIIgiUzCp+oCoJhHVCBvV8Xj8x5per0e7RUsaWjabDW0XgEN1NpupAnva7TZ2nM/ntB0EWc8r9nCorlYrVWBPv9/Hjuv1Wm1WKhV1qCJwqILdboepaMlisaDd7vf9fo+W4kMKmFR9QFSTiGqEqHqHqCYR1QhR9Q5RTSKqET9RdZLxGr0nWP6hzaQKQ3UI89n6drSqeUhMqpgY+nVcb+ewnr2AmjLI+VqfMIDPue/HM5PoHrVmkKMKnnixnB90krqbTb4q0OuTn1guJVaqAFd8GIY4ef4Msvqnhv0iYqv6Bojq+3G//wN9rsRvy4i5OAAAAABJRU5ErkJggg==',
    'כיוון תשובות',
    toggleMarkdownDirection
  );

  const qBtn=document.createElement('button');
  qBtn.id='q-style-toggle-button';
  qBtn.title='הדגש תיבות של שאלה';
  qBtn.textContent='Q';
  qBtn.style.cssText=dirBtn.style.cssText;
  qBtn.onclick=(e)=>{e.preventDefault();toggleWhitespaceStyle();toggleQButtonGlow();};
  addTooltipEvents(qBtn);

  btnGroup.appendChild(qBtn);
  btnGroup.appendChild(mdBtn);
  btnGroup.appendChild(dirBtn);
}

document.addEventListener("keydown",e=>{
  if(e.ctrlKey&&e.shiftKey&&!e.altKey){
    e.preventDefault();
    toggleDirection();
  }
});

const observer=new MutationObserver(()=>{createDirectionButton();});
observer.observe(document.body,{childList:true,subtree:true});
createDirectionButton();
toggleDirection();
toggleDirection();
})();
