// Production asset ingestion: split generated atlases; preserve transparent alpha.
const sharp=require('sharp'),fs=require('fs');
const [sprites,ground,materials]=process.argv.slice(2);if(!materials)throw Error('Usage: node tools/import-terrain-art.cjs SPRITES GROUND MATERIALS');
const out='assets/mesbg/terrain';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const sm=await sharp(sprites).metadata(),cw=Math.floor(sm.width/4),ch=Math.floor(sm.height/4),types=['oak','pine','dead','rock','stone','fence','palisade','ruin','whitewall','darkwall','cliff','rim','woodbridge','stonebridge','rubble','burnt'];
 for(let i=0;i<16;i++)await sharp(await sharp(sprites).extract({left:i%4*cw,top:Math.floor(i/4)*ch,width:cw,height:ch}).png().toBuffer()).trim({threshold:4}).png().toFile(out+'/'+types[i]+'.png');
 for(const [file,names]of[[ground,['meadow','gondor','ash','forest']],[materials,['shallow','deep','chasm','road']]]){
  const m=await sharp(file).metadata(),w=Math.floor(m.width/2),h=Math.floor(m.height/2);
  for(let i=0;i<4;i++)await sharp(file).extract({left:i%2*w+5,top:Math.floor(i/2)*h+5,width:w-10,height:h-10}).resize(512,512).webp({quality:88}).toFile(out+'/'+names[i]+'.webp');
 }
 console.log('Imported 16 RGBA objects + 8 material textures');
})();
