const puppeteer = require('puppeteer');

async function getImage(searchName,howMany=1){
    const urlImages = `https://www.google.com/search?q=${searchName}+roca&sxsrf=ALeKk00JBA_VepXKAmlh-lVJ2v_nxqAeyA:1600803164118&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiI08m_wP3rAhUKT6wKHVwKBpkQ_AUoAXoECBUQAw&biw=1516&bih=425`;
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0); 
    console.log("Buscando Imagen(es)");
    await page.goto(urlImages);
    const searchValue = await page.$$('img[jsname=Q4LuWd]');
    var imageb64 = [];
    if(howMany !== 1){
        for(let count=1 ; count <= howMany; count++){
            imageb64[count-1] = await page.evaluate(el => el.src, searchValue[count-1]);
        }
    }
    else{
        var imageb64 = await page.evaluate(el => el.src, searchValue[howMany]);
    }
    console.log("Imagen(es) encontrada(s)");
    await browser.close();
    console.log(imageb64);
    console.log(imageb64.length);
}

getImage("arcilla",2);