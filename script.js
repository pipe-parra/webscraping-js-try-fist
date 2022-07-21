const puppeteer = require('puppeteer');

async function run(){
    const browser = await puppeteer.launch() //abrimos navegador
    const page = await browser.newPage() //abrimos pagina
    const reviews = []
    async function getPageData(pageNumber = 1) {
    await page.goto('https://platzi.com/cursos/html-css/opiniones/3/') //ir a esta pagina de ejemplo
    // await page.screenshot({          //tomo una screenshot de la misma
    //     path: 'screenshot.png',
    //     fullPage: true,
    // })
    const data = await page.evaluate(()=>{   //todo lo guardo en data
        const $reviews = document.querySelectorAll('.ReviewCard')  // aqui obtengo data desde la clase ReviewCard, que obtuve luego de inspeccionar
        const $pagination = document.querySelectorAll('.Pagination-item .Pagination-link') //aqui estoy tomando mal el datoERROR ERROR **********
        const totalPages = Number($pagination[$pagination.length -1].textContent.trim())
        const data = []    //genero el arreglo data

        $reviews.forEach(($review)=>{ 
            data.push({
                content: $review.querySelector('.ReviewCard-description').textContent.trim(), //obtengo todas las descripciones y con el trim elimino espacios en blanco  
            }) 
        })
        
        return{
            reviews : data,
            totalPages,
        }
    })
    console.log(`page ${pageNumber} of ${data.totalPages} completed`)
    if (pageNumber <= data.totalPages){
        getPageData(pageNumber + 1)
    }else{
        await browser.close()
    }
   }
   getPageData() //debo llamarla para que corra
//    await browser.close()  //cierro automaticamente el ciclo
};


run()
