import hashlib,json,os,pathlib,subprocess,tempfile,zipfile
def git(*args,data=None):
 return subprocess.check_output(['git',*args],input=data).decode().strip()
parts=sorted(pathlib.Path('.art-transfer').glob('part-*.bin'))
meta=json.loads(pathlib.Path('.art-transfer/release-meta.json').read_text())
assert len(parts)==meta['chunks'],f"Incomplete transfer: {len(parts)}/{meta['chunks']}"
with tempfile.TemporaryDirectory() as td:
 td=pathlib.Path(td);archive=td/'release.zip';h=hashlib.sha256()
 with archive.open('wb') as out:
  for p in parts:
   b=p.read_bytes();h.update(b);out.write(b)
 assert h.hexdigest()==meta['archiveSHA256'],'Archive checksum mismatch'
 with zipfile.ZipFile(archive) as z:
  m=json.loads(z.read('manifest.json'))
  git('fetch','--no-tags','--filter=blob:none','--depth=1','origin','+refs/heads/main:refs/remotes/origin/main','+refs/heads/'+m['target']+':refs/remotes/origin/release-target')
  assert git('rev-parse','refs/remotes/origin/main')==m['base'],'Main moved: stop to preserve newer work'
  assert git('rev-parse','refs/remotes/origin/release-target')==meta['expectedIntegration'],'Integration branch moved: stop to preserve newer work'
  git('read-tree',m['base'])
  count=0
  for name in z.namelist():
   if not name.startswith('blobs/'):continue
   b=z.read(name);sha=git('hash-object','-w','--stdin',data=b)
   assert sha==name.split('/')[1],'Blob checksum mismatch'
   count+=1
  entries=[]
  for r in m['files']:
   p=pathlib.PurePosixPath(r['path']);assert not p.is_absolute() and '..' not in p.parts and '\n' not in r['path'] and '\t' not in r['path']
   entries.append('100644 '+r['sha']+'\t'+r['path']+'\n')
  git('update-index','--index-info',data=''.join(entries).encode())
  tree=git('write-tree','--missing-ok')
  os.environ.update(GIT_AUTHOR_NAME='Codex',GIT_AUTHOR_EMAIL='noreply@openai.com',GIT_COMMITTER_NAME='Codex',GIT_COMMITTER_EMAIL='noreply@openai.com')
  commit=git('commit-tree',tree,'-p',meta['expectedIntegration'],'-m','Complete game integration: 510 unit assets, 27 regional maps and mobile title dock')
  git('push','origin',commit+':refs/heads/'+m['target'])
  result={'commit':commit,'tree':tree,'files':len(entries),'newBlobs':count,'units':m['units'],'mapStates':m['mapStates'],'titleConditions':m['titleConditions']}
  print(json.dumps(result,indent=2))
  if os.environ.get('GITHUB_STEP_SUMMARY'):
   with open(os.environ['GITHUB_STEP_SUMMARY'],'a') as f:f.write('Remote integration committed successfully.\n\n```json\n'+json.dumps(result,indent=2)+'\n```\n')
