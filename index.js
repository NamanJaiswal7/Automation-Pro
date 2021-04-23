const puppeteer=require('puppeteer');
const getData=require('./getData');
const path=require('path');
const fs=require('fs')


const fullPath=path.join(__dirname,'test.txt');
const input=process.argv[2];

(async function(){

  try{
    const browser=await puppeteer.launch({
      headless:false,
      defaultViewport:null,
      args: ["--start-maximized"]
    })
    const page= await browser.newPage();
    

      await page.goto("https://www.ixigo.com/trains/stations-list");
      
    
   let link= getData.getLink(fullPath,"https://www.ixigo.com/trains/stations-list",input);
    const newPage=await browser.newPage();
    await newPage.goto(link);
    let allLinks=await newPage.evaluate(evaluation,"tr>td:nth-child(2) a");
    // restaurants near ${stationNameArr[j]} railway station
    for(let i=0;i<allLinks.length;i++){
      const newPageAgain=await browser.newPage();
      await newPageAgain.goto(allLinks[i]);
      let stationNameArr=await newPageAgain.evaluate(trainDetails,"td>a");
      console.log(stationNameArr)
      for(let j=0;j<stationNameArr.length;j++){
        let nameIdx=stationNameArr[j].indexOf("Jn");
       
        if(nameIdx!=-1){
          let count=0;
          const newPageFirSe=await browser.newPage();
          
            await newPageFirSe.goto(`https://www.google.com/maps`),
            
      
         
          await newPageFirSe.waitForSelector("#searchboxinput",{visible:true})
          await newPageFirSe.type("#searchboxinput",`${stationNameArr[j]} railway station`)
          await newPageFirSe.keyboard.press("Enter")
          await newPageFirSe.waitForTimeout(5000);
          await waitAndClick('#searchboxinput',newPageFirSe);
          await newPageFirSe.keyboard.down("Control");
          await newPageFirSe.keyboard.press("a");
          await newPageFirSe.keyboard.press("Backspace")
          await newPageFirSe.keyboard.up("Control");
          await newPageFirSe.keyboard.type(`restaurants`)
          
          await newPageFirSe.keyboard.press("Enter")
          
          // await waitAndClick("input[value='Google Search']",newPageFirSe)
          await newPageFirSe.waitForTimeout(5000);
         
          // await waitAndClick(".place-result-container-place-link",newPageFirSe);
          await newPageFirSe.waitForSelector('.sJKr7qpXOXd__content-container.sJKr7qpXOXd__result-container-clickable.sJKr7qpXOXd__content-container-is-link',{visible:true})
          let newArr=await newPageFirSe.evaluate(trainDetails,'.sJKr7qpXOXd__content-container.sJKr7qpXOXd__result-container-clickable.sJKr7qpXOXd__content-container-is-link'); 
          // await waitAndClick(".MXl0lf.mtqGb.EhIML",newPageFirSe);
          console.log(newArr);
          let finalArr= await newPageFirSe.evaluate(pushInto,newArr);
          let data=JSON.stringify(finalArr);
          let pathfile=path.join(__dirname,`${stationNameArr[j]}.json`)
          fs.writeFileSync(pathfile,data,'utf8');
         
          count++;
          
          await newPageFirSe.close();
        
        }
      }

      await newPageAgain.close();
    }
    await newPage.close();



  }catch(err){
    console.log(err);
  }


})()


async function waitAndClick(selector, newTab) {
  await newTab.waitForSelector(selector, { visible: true });
  // we didn't wait this promise because we want  the calling perspn to await this promise based async function 
  let selectorClickPromise = newTab.click(selector);
  return selectorClickPromise;
}

function evaluation(selector){
  let linkArr=document.querySelectorAll(selector);
  let allLinks=[];
  for(let i=0;i<linkArr.length;i++){
    allLinks.push(linkArr[i].href);
  }
  return allLinks;
}

function trainDetails(selector){
let stationName=document.querySelectorAll(selector);
let sNameArr=[];
for(let i=0;i<stationName.length;i++){
  let name=stationName[i].innerText
  sNameArr.push(name);
}
return sNameArr;
}


function pushInto(newArr){
  let arr=[];
  for(let k=0;k<newArr.length;k++){
    let singleDetailArr=newArr[k];
    ;
        let obj={
      Name:singleDetailArr,
     
    }
    arr.push(obj);
  }
  
  return arr;
}
