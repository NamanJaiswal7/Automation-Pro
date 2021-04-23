const fs=require('fs');
const path=require('path');



function writingFile(TextArr){
let newArr=[];
for(let i=0;i<TextArr.length;i++){
  
let obj={name:TextArr[i]};

newArr.push(obj);



}
let ans=JSON.stringify(newArr)
let finalPath=path.join(__dirname,'new.json');
fs.writeFileSync(finalPath,ans,"utf8");
}


function readingFile(idx){
  let rPath=path.join(__dirname,"new.json")
  let content=fs.readFileSync(rPath,'utf8');
  let obj=JSON.parse(content);
  let ans=obj[idx].name;
return ans;
}

module.exports={
  writingFile:writingFile,
  readingFile:readingFile
}