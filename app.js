const puppeteer = require('puppeteer');
const express = require('express');
const express_layouts = require('express-ejs-layouts'); 
let ejs = require('ejs');
const server = express();

// settings
server.set('port','4000');

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
            await page.waitForSelector('img[jsname=Q4LuWd]');
            imageb64[count-1] = await page.evaluate(el => el.src, searchValue[count-1]);
        }
    }
    else{
        var imageb64 = await page.evaluate(el => el.src, searchValue[howMany]);
    }
    console.log("Imagen(es) encontrada(s)");
    await browser.close();
    return imageb64;
}

// view settings
server.use(express.static('public'));
server.use('/css',express.static(__dirname + 'public/css'));
server.use('/js',express.static(__dirname + 'public/js'));
server.use('/img',express.static(__dirname + 'public/img'));
server.use(express_layouts);
server.set('view engine','ejs');

// Routes
server.get("/",(req,res) => {
    res.render('index',{array:["xD","xD"]});
});

server.get("/image/:rock",(req,res) => {
    getImage(req.params.rock,20).then(function(imageb64){
        res.send(imageb64);
    });
});

const port = server.get('port');
server.listen(port,() => {
    console.log(`Listen on port ${port}`);
});