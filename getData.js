const cheerio=require('cheerio');
const request=require('request');
const fs=require('fs');
const path=require('path');

// let url="https://www.ixigo.com/trains/stations-list"
// let input="Varanasi Jn";

function getData(url,input){
  
  request(url,function(err,res,html){
    if(err){
      console.log(err);
    }else{
      scrapData(html,input);
    }
  })

}

function scrapData(html,input){
  let $=cheerio.load(html);
  let station=$(".station-name");
  let stationed=$("tr>td:first-child")
  let link="https://www.ixigo.com";
  
  for(let i=0;i<station.length;i++){
    let stationFor=$(station[i]);
    let stationData=stationFor.text();
    let finalStationData=stationData.trim();
    let stationCodeData=$(stationed[i]);
    let data=stationCodeData.text();
   
    if(data==input){
      
      let halfLink=stationFor.attr("href");
   
      let halfLinkTrimmed=halfLink.trim();
     let  finalLink=link+halfLinkTrimmed;
    createFile(finalLink)
    }
  }
}
function createFile(str){
  let finalPath=path.join(__dirname,"test.txt");
  fs.writeFileSync(finalPath,str,"utf8");
}




function readFile(fullPath,url,input){
  getData(url,input)
let link=fs.readFileSync(fullPath,'utf8');
return link;
}
module.exports={
  getLink:readFile
}
