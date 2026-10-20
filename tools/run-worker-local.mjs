// Usage: node --experimental-sqlite tools/run-worker-local.mjs ./lwb-worker/src/index.js 8787
// Then open index.html?pvpapi=http://127.0.0.1:8787 in two browsers to test online matches without Cloudflare.
// Local runner for lwb-worker: real worker code + a D1 shim on node:sqlite.
import { DatabaseSync } from 'node:sqlite';
import http from 'node:http';
const worker = (await import(process.argv[2])).default;
const sql = new DatabaseSync(':memory:');
class Stmt { constructor(q){this.q=q;this.args=[];} bind(...a){this.args=a;return this;}
  async run(){const r=sql.prepare(this.q).run(...this.args);return {meta:{changes:Number(r.changes)}};}
  async first(){return sql.prepare(this.q).get(...this.args)??null;}
  async all(){return {results:sql.prepare(this.q).all(...this.args)};} }
const DB={prepare:q=>new Stmt(q),batch:async s=>{const out=[];for(const x of s)out.push(await x.run());return out;}};
http.createServer(async (req,res)=>{const chunks=[];for await(const c of req)chunks.push(c);const body=Buffer.concat(chunks);
  const r=await worker.fetch(new Request('http://x'+req.url,{method:req.method,headers:req.headers,body:['GET','HEAD'].includes(req.method)?undefined:body}),{DB});
  res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()));}).listen(+process.argv[3]||8787,()=>console.log('worker on',process.argv[3]||8787));
