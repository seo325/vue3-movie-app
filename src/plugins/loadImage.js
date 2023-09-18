export default {
    install(app){
        app.config.globalProperties.$loadImage =(src) =>{
           return new Promise(resovle=>{
            const img = document.createElement('img')
            img.src =src
            img.addEventListener('load', ()=>{
                //!완료
                resovle()
            })

           })
        }
    }
}