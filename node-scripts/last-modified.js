const fs = require('fs');

const patternsFn = {
  js(filename){
    return `<script\\ssrc="${filename}"[\\s\\S]*?><\\/script>`
  },
  css(filename){
    return `<link\\srel="stylesheet"\\shref="${filename}">`
  }
}

const replacesFn = {
  js(content){
    return `<script defer>\n${content}\n</script>\n`
  },
  css(content){
    return `<style>\n${content}\n</style>\n`
  }
}



const dirDist = './dist';
const suffixId = '-modified';

const files = fs.readdirSync(dirDist).map(filename => {
  const filenameList = filename.split('.');
  const type = filenameList.pop();
  const name = filenameList.join('');

  if(filename.indexOf(suffixId) > -1) return null;
  return {
    filename,
    name,
    type,
    content: fs.readFileSync(`${dirDist}/${filename}`, 'utf8')
  }
}).filter(Boolean);

const indexHtml = files.find(metadata => metadata.type === 'html');

if(!indexHtml){
  return console.error('> Not found file .html')
}



files.forEach(metadata=>{
  const {type, content, filename} = metadata;
  const pattern = patternsFn[type];
  const replace = replacesFn[type];

  if(pattern && replace) {
    const regex  = new RegExp(pattern(filename), 'gi');
    indexHtml.content =  indexHtml.content.replace(regex, replace(content))
  }

})

const metaLastModified = `<meta http-equiv="last-modified" content="${new Date()}" />`;
indexHtml.content = indexHtml.content.replace(/(\<\/title\>)/, '$1\n\t\t' + metaLastModified)


const newIndexHtml = `${dirDist}/${indexHtml.name}${suffixId}.${indexHtml.type}`;
fs.writeFile(newIndexHtml, indexHtml.content, 'utf8', (error)=>{

  if(error){
    return console.error('> '+ error)
  }

  console.log(`> ${newIndexHtml} create with success`);

})





