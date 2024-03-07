console.log('from registration office')
if('serviceWorker' in navigator){
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
    .then(()=>{
        console.log("service worker registered")
    })
}