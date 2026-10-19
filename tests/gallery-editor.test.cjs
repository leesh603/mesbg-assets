const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lL8AAAAASUVORK5CYII=','base64');
(async()=>{
const server=http.createServer((req,res)=>{const name=decodeURIComponent(req.url.split('?')[0]);if(name.includes('..')){res.writeHead(400);return res.end();}if(name.startsWith('/tokens/')||name.startsWith('/tokens_painted/')){res.setHeader('Content-Type','image/png');return res.end(png);}const file=path.join(root,name);if(!fs.existsSync(file)){res.writeHead(404);return res.end();}res.setHeader('Content-Type',name.endsWith('.js')?'text/javascript':name.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));});
await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,...(process.env.GALLERY_CHROMIUM?{executablePath:process.env.GALLERY_CHROMIUM,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']}: {})});
try{
const page=await browser.newPage({viewport:{width:1365,height:900}}), errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(base+'/gallery.html');await page.getByText('편집할 캐릭터의', {exact:false}).waitFor();
const first=page.locator('.ge-editable').first(), img=first.locator('.fig img');const original=await img.getAttribute('src');
await first.locator('.ge-edit').click();await page.locator('#ge-upload').setInputFiles({name:'replacement.png',mimeType:'image/png',buffer:png});await page.waitForFunction(()=>document.querySelector('.ge-previews img[alt="교체 이미지 미리보기"]').src.startsWith('data:'));
await page.locator('#ge-scale').fill('145');await page.locator('#ge-scale').dispatchEvent('input');await page.locator('#ge-x').fill('12');await page.locator('#ge-x').dispatchEvent('input');
await page.getByRole('button',{name:'브라우저에 저장',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('dialog').open);
assert((await img.getAttribute('src')).startsWith('data:image/png'));assert.equal(await img.evaluate(n=>n.style.transform),'translate(12px, 0px)');
await page.reload();await page.getByText('편집할 캐릭터의',{exact:false}).waitFor();assert((await img.getAttribute('src')).startsWith('data:image/png'));
// Separate pixel and painted drafts, no accidental rewriting of data URLs.
await page.locator('#vsw').click();assert((await img.getAttribute('src')).startsWith('tokens_painted/'));await page.locator('#vsw').click();assert((await img.getAttribute('src')).startsWith('data:image/png'));
const dlPromise=page.waitForEvent('download');await page.getByRole('button',{name:'수정본 내보내기'}).click();const dl=await dlPromise;const data=JSON.parse(fs.readFileSync(await dl.path(),'utf8'));assert.equal(data.edits.length,1);assert.equal(data.edits[0].scale,145);
await first.locator('.ge-edit').click();await page.getByRole('button',{name:'원본으로 복원',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('dialog').open);assert.equal(await img.getAttribute('src'),original);
await page.locator('.ge-toolbar input[type=file]').setInputFiles({name:'edits.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await page.getByText('1개 수정본을 이 브라우저에 저장했습니다.',{exact:true}).waitFor();assert((await img.getAttribute('src')).startsWith('data:image/png'));
// Reject malformed imports atomically.
data.edits.push({...data.edits[0],path:'../../index.html'});await page.locator('.ge-toolbar input[type=file]').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(data))});await page.locator('#ge-status.ge-error').waitFor();assert.equal(await page.locator('.ge-changed').count(),1);
// Invalid upload leaves the saved image intact.
await first.locator('.ge-edit').click();await page.locator('#ge-upload').setInputFiles({name:'bad.svg',mimeType:'image/svg+xml',buffer:Buffer.from('<svg/>')});await page.locator('.ge-dialog .ge-error').filter({hasText:'PNG, WebP, JPG'}).waitFor();await page.getByRole('button',{name:'닫기',exact:true}).click();
await page.locator('.ge-toolbar input[type=search]').fill('아라곤');assert((await page.locator('.ge-editable:visible').count())>0);await page.locator('.ge-toolbar input[type=search]').fill('');
fs.mkdirSync(path.join(root,'qa'),{recursive:true});await first.locator('.ge-edit').click();await page.screenshot({path:path.join(root,'qa/desktop.png')});await page.getByRole('button',{name:'닫기',exact:true}).click();
await page.setViewportSize({width:390,height:844});await first.locator('.ge-edit').click();await page.screenshot({path:path.join(root,'qa/mobile.png')});assert(await page.locator('dialog').evaluate(n=>n.scrollWidth<=n.clientWidth));assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
assert.deepEqual(errors,[]);console.log('PASS: upload, scale/offset, IndexedDB reload, style isolation, export/import, atomic rejection, reset, search, desktop/mobile layout, no JS errors.');
}finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
