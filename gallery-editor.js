/* Gallery-only drafts. Production art is changed through a reviewed repository PR. */
(() => {
 'use strict';
 const DB='mesbg-gallery-editor-v1', STORE='drafts', MAX=8*1024*1024;
 const drafts=new Map(), originals=new Map(), entries=new Map();
 let db, active, working, returnFocus, busy=false, previewURL='';
 const el=(tag,attrs={},text='')=>{const n=document.createElement(tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);n.textContent=text;return n;};
 const button=(text,fn)=>{const b=el('button',{type:'button'},text);b.addEventListener('click',fn);return b;};
 const status=el('p',{id:'ge-status',role:'status','aria-live':'polite'});
 const toolbar=el('section',{class:'ge-toolbar','aria-label':'에셋 편집'});
 const count=el('strong'), search=el('input',{type:'search',placeholder:'캐릭터 이름 / ID 검색','aria-label':'에셋 이름 검색'});
 const only=el('input',{type:'checkbox'}), onlyLabel=el('label',{},'수정한 항목만 ');onlyLabel.prepend(only);
 toolbar.append(el('strong',{},'에셋 편집'),search,onlyLabel,count);
 const exportButton=button('수정본 내보내기',()=>run(exportDrafts));
 const importInput=el('input',{type:'file',accept:'.json,application/json',hidden:''});
 toolbar.append(exportButton,button('수정본 불러오기',()=>importInput.click()),importInput,
  el('p',{class:'ge-note'},'저장은 이 브라우저에만 유지됩니다. 게임 반영은 수정본을 내보낸 뒤 GitHub PR로 진행합니다.'),status);
 document.querySelector('.tabs').after(toolbar);
 const dialog=el('dialog',{class:'ge-dialog','aria-labelledby':'ge-title'});
 const heading=el('h2',{id:'ge-title'}), close=button('닫기',()=>dialog.close());close.className='ge-close';
 const upload=el('input',{id:'ge-upload',type:'file',accept:'image/png,image/webp,image/jpeg'});
 const drop=el('label',{class:'ge-drop',for:'ge-upload',tabindex:'0'},'이미지를 끌어놓거나 파일을 선택하세요 · PNG / WebP / JPG, 최대 8MB');drop.append(upload);
 const previews=el('div',{class:'ge-previews'}), oldBox=el('div'), newBox=el('div');
 oldBox.append(el('h3',{},'원본'));newBox.append(el('h3',{},'수정 미리보기'));
 const oldFig=el('div',{class:'ge-figure'}), newFig=el('div',{class:'ge-figure'}), oldImg=el('img',{alt:'원본 이미지'}),newImg=el('img',{alt:'교체 이미지 미리보기'});
 oldFig.append(oldImg);newFig.append(newImg);oldBox.append(oldFig);newBox.append(newFig);previews.append(oldBox,newBox);
 const controls=el('div',{class:'ge-controls'}), sliders={};
 for(const[key,title,min,max,step]of [['scale','크기 (%)',25,300,1],['x','좌우 위치 (px)',-160,160,1],['y','위아래 위치 (px)',-160,160,1]]){
  const label=el('label',{for:'ge-'+key},title), value=el('output'), input=el('input',{id:'ge-'+key,type:'range',min,max,step});
  input.addEventListener('input',()=>{working[key]=Number(input.value);renderEditor();});
  label.append(value);controls.append(label,input);sliders[key]={input,value};
 }
 const error=el('p',{class:'ge-error',role:'alert'}), save=button('브라우저에 저장',()=>run(saveDraft)), reset=button('원본으로 복원',()=>run(resetDraft));
 const actions=el('div',{class:'ge-actions'});actions.append(reset,button('조절값 초기화',()=>{working.scale=100;working.x=0;working.y=0;renderEditor();}),save);
 dialog.append(heading,close,drop,previews,controls,
  el('p',{class:'ge-note'},'이미지 비율은 유지됩니다. 바닥선을 기준으로 크기와 위치를 맞추세요. 이 조절값은 갤러리 검토용이며 인게임 몸체 기준 보정은 반영 PR에서 확인합니다.'),error,actions);
 document.body.append(dialog);
 dialog.addEventListener('close',()=>{if(previewURL)URL.revokeObjectURL(previewURL);previewURL='';upload.value='';active=null;returnFocus?.focus();});
 dialog.addEventListener('cancel',e=>{if(busy)e.preventDefault();});
 drop.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();upload.click();}});
 upload.addEventListener('change',()=>{if(upload.files[0])run(()=>readUpload(upload.files[0]));});
 drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('drag');});
 drop.addEventListener('dragleave',()=>drop.classList.remove('drag'));
 drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('drag');if(e.dataTransfer.files[0])run(()=>readUpload(e.dataTransfer.files[0]));});
 document.addEventListener('dragover',e=>{if(e.dataTransfer.types.includes('Files'))e.preventDefault();});
 document.addEventListener('drop',e=>{if(e.dataTransfer.types.includes('Files'))e.preventDefault();});
 function message(text,bad=false){status.textContent=text;status.classList.toggle('ge-error',bad);}
 async function run(fn){if(busy)return;busy=true;save.disabled=true;reset.disabled=true;close.disabled=true;upload.disabled=true;try{error.textContent='';await fn();}catch(e){error.textContent=e.message;message(e.message,true);}finally{busy=false;save.disabled=!db;reset.disabled=!db;close.disabled=false;upload.disabled=false;}}
 const pathFor=img=>{const url=new URL(img.getAttribute('src'),location.href);if(url.origin!==location.origin)return null;const path=decodeURIComponent(url.pathname).slice(new URL('.',location.href).pathname.length);return /^(tokens|tokens_painted)\/[a-zA-Z0-9_-]+\.png$/.test(path)?path:null;};
 function snapshot(img){return{src:img.getAttribute('src'),style:img.getAttribute('style')||'',height:parseFloat(img.style.height)||99};}
 for(const card of document.querySelectorAll('.card.ucard')){
  const img=card.querySelector('.fig img'), id=card.querySelector('.id')?.textContent;if(!img||!pathFor(img)||!id)continue;
  const record={card,img,id,path:pathFor(img),name:card.querySelector('.ko')?.textContent||id};originals.set(img,snapshot(img));
  const edit=button('이미지 편집',()=>openEditor(record,edit));edit.className='ge-edit';card.append(edit);card.classList.add('ge-editable');
  entries.set(img,record);
 }
 function currentPath(record){return record.path||pathFor(record.img);}
 function apply(record){
  const original=originals.get(record.img), path=currentPath(record),d=drafts.get(path);
  record.img.setAttribute('style',original.style);record.img.setAttribute('src',d?.dataURL||original.src);
  if(d){record.img.style.width='auto';record.img.style.height=(original.height*d.scale/100)+'px';record.img.style.maxWidth='none';record.img.style.transform='translate('+d.x+'px,'+d.y+'px)';}
  record.card.classList.toggle('ge-changed',!!d);record.card.querySelector('.ge-edit').textContent=d?'수정본 편집':'이미지 편집';
 }
 // Keep style switching scoped to catalog images. Draft data URLs never enter its string replacement.
 const switcher=document.getElementById('vsw');if(switcher){switcher.removeAttribute('onclick');switcher.addEventListener('click',()=>{
  const painted=document.body.dataset.pt!=='1';document.body.dataset.pt=painted?'1':'0';
  document.querySelectorAll('.card img').forEach(img=>{
   const o=originals.get(img),src=o?.src||img.getAttribute('src');if(!src)return;
   const next=src.replace(painted?'tokens/':'tokens_painted/',painted?'tokens_painted/':'tokens/');
   if(o){o.src=next;const r=entries.get(img);r.path=next.split('?')[0];apply(r);}else img.setAttribute('src',next);
  });switcher.textContent=painted?'보는중: 도색 (클릭→픽셀)':'보는중: 픽셀 (클릭→도색)';filter();
 });}
 function filter(){let visible=0;for(const r of entries.values()){
  const match=(r.name+' '+r.id).toLowerCase().includes(search.value.trim().toLowerCase())&&(!only.checked||drafts.has(currentPath(r)));
  r.card.hidden=!match;if(match)visible++;
 }count.textContent='저장된 수정 '+drafts.size+'건';exportButton.disabled=!drafts.size;}
 search.addEventListener('input',filter);only.addEventListener('change',filter);
 function openEditor(record,focus){
  active=record;active.path=currentPath(record);returnFocus=focus;
  working=structuredClone(drafts.get(active.path)||{path:active.path,id:active.id,name:active.name,scale:100,x:0,y:0});
  heading.textContent=active.name+' · '+(active.path.startsWith('tokens_painted/')?'도색':'픽셀');
  oldImg.src=originals.get(record.img).src;newImg.src=working.dataURL||oldImg.src;error.textContent='';save.disabled=!db;reset.disabled=!db;renderEditor();dialog.showModal();
 }
 function renderEditor(){
  if(!active)return;for(const[key,v]of Object.entries(sliders)){v.input.value=working[key];v.value.textContent=working[key]+(key==='scale'?'%':'px');}
  const h=originals.get(active.img).height;oldImg.style.height=h+'px';newImg.style.height=(h*working.scale/100)+'px';newImg.style.transform='translate('+working.x+'px,'+working.y+'px)';
 }
 async function imageFrom(src){const img=new Image();img.src=src;await img.decode();return img;}
 async function readUpload(file){
  if(!['image/png','image/webp','image/jpeg'].includes(file.type))throw Error('PNG, WebP, JPG 이미지만 선택하세요.');
  if(file.size>MAX)throw Error('파일 크기는 8MB 이하여야 합니다.');
  const url=URL.createObjectURL(file);try{
   const img=await imageFrom(url);if(img.width>4096||img.height>4096||img.width*img.height>12000000)throw Error('이미지는 가로·세로 4096px 이하, 총 1200만 화소 이하여야 합니다.');
   const canvas=document.createElement('canvas');canvas.width=img.width;canvas.height=img.height;canvas.getContext('2d').drawImage(img,0,0);const dataURL=canvas.toDataURL('image/png');
   if(dataURL.length>MAX*4/3+100)throw Error('PNG 변환 후 8MB를 넘습니다. 더 작은 이미지를 선택하세요.');
   working.dataURL=dataURL;working.width=img.width;working.height=img.height;working.filename=file.name;newImg.src=dataURL;
   working.scale=100;working.x=0;working.y=0;renderEditor();
  }finally{URL.revokeObjectURL(url);}
 }
 function transaction(mode,fn){return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||Error('저장 실패'));tx.onabort=()=>reject(tx.error||Error('저장 공간이 부족합니다. 수정본을 내보내세요.'));try{fn(tx.objectStore(STORE));}catch(e){tx.abort();reject(e);}});}
 async function saveDraft(){
  const d={...working,updatedAt:new Date().toISOString()};checkBudget([d]);await transaction('readwrite',s=>s.put(d));drafts.set(d.path,d);for(const r of entries.values())if(currentPath(r)===d.path)apply(r);
  filter();dialog.close();message('이 브라우저에 저장했습니다. 실제 게임은 아직 바뀌지 않았습니다.');
 }
 async function resetDraft(){const path=active.path;await transaction('readwrite',s=>s.delete(path));drafts.delete(path);for(const r of entries.values())if(currentPath(r)===path)apply(r);filter();dialog.close();message('현재 이미지의 수정본을 지우고 원본으로 복원했습니다.');}
 function checkBudget(items){const merged=new Map(drafts);items.forEach(d=>merged.set(d.path,d));if([...merged.values()].reduce((n,d)=>n+(d.dataURL?.length||0),0)>64*1024*1024)throw Error('저장 이미지 합계가 한도를 넘습니다. 수정본을 내보내고 적용이 끝난 항목을 원본 복원하세요.');}
 function download(blob,name){const a=el('a',{href:URL.createObjectURL(blob),download:name});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
 async function exportDrafts(){
  const data={format:'mesbg-gallery-edits',version:1,exportedAt:new Date().toISOString(),scope:'gallery-review-only',edits:[...drafts.values()]};
  download(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),'MESBG-gallery-edits.json');
  message('수정본을 내보냈습니다. 이 파일에는 이미지와 조절값이 포함됩니다. 게임 반영을 요청할 때 첨부하세요.');
 }
 async function validateEdit(d){
  if(!d||! /^(tokens|tokens_painted)\/[a-zA-Z0-9_-]+\.png$/.test(d.path)||!Number.isFinite(d.scale)||d.scale<25||d.scale>300||!Number.isFinite(d.x)||Math.abs(d.x)>160||!Number.isFinite(d.y)||Math.abs(d.y)>160)throw Error('수정본의 경로 또는 조절값이 올바르지 않습니다.');
  if(![...entries.values()].some(r=>{const p=originals.get(r.img).src.split('?')[0];return p.replace('tokens_painted/','tokens/')===d.path.replace('tokens_painted/','tokens/');}))throw Error('이 갤러리에 없는 에셋입니다: '+d.path);
  const clean={path:d.path,id:String(d.id||'').slice(0,100),name:String(d.name||'').slice(0,150),scale:d.scale,x:d.x,y:d.y,updatedAt:new Date().toISOString()};
  if(d.dataURL){if(typeof d.dataURL!=='string'||d.dataURL.length>MAX*4/3+100||!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(d.dataURL))throw Error('수정본 이미지가 올바르지 않습니다.');const image=await imageFrom(d.dataURL);if(image.width>4096||image.height>4096||image.width*image.height>12000000)throw Error('수정본 이미지가 너무 큽니다.');Object.assign(clean,{dataURL:d.dataURL,width:image.width,height:image.height,filename:String(d.filename||'image.png').slice(0,150)});}
  return clean;
 }
 importInput.addEventListener('change',()=>run(async()=>{
  const file=importInput.files[0];try{if(!file)return;if(file.size>100*1024*1024)throw Error('수정본 파일은 100MB 이하여야 합니다.');const data=JSON.parse(await file.text());if(data.format!=='mesbg-gallery-edits'||data.version!==1||!Array.isArray(data.edits)||data.edits.length>1000)throw Error('지원하지 않는 수정본 형식입니다.');
   const clean=[],seen=new Set();for(const d of data.edits){const item=await validateEdit(d);if(seen.has(item.path))throw Error('중복 이미지 경로입니다.');seen.add(item.path);clean.push(item);}
   checkBudget(clean);await transaction('readwrite',s=>clean.forEach(d=>s.put(d)));clean.forEach(d=>drafts.set(d.path,d));for(const r of entries.values())apply(r);filter();message(clean.length+'개 수정본을 이 브라우저에 저장했습니다.');
  }finally{importInput.value='';}
 }));
 const request=indexedDB.open(DB,1);request.onupgradeneeded=()=>request.result.createObjectStore(STORE,{keyPath:'path'});
 request.onerror=()=>message('브라우저 저장소를 열지 못했습니다. 브라우저의 사이트 저장 권한을 확인하세요.',true);
 request.onsuccess=()=>{db=request.result;db.onversionchange=()=>{db.close();db=null;message('편집기가 갱신되었습니다. 새로고침하세요.',true);};const tx=db.transaction(STORE),req=tx.objectStore(STORE).getAll();req.onsuccess=()=>{req.result.forEach(d=>drafts.set(d.path,d));for(const r of entries.values())apply(r);filter();message('편집할 캐릭터의 ‘이미지 편집’을 누르세요.');};req.onerror=()=>message('저장된 수정본을 읽지 못했습니다.',true);};
 filter();
})();
