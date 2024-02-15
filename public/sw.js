importScripts('./abc.js');
importScripts('./idb.js');
importScripts('./utility.js');

const STATIC_CACHE_NAME = 'static-cache-v3';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1';

self.addEventListener('install', function(event) {
    console.log('Service worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
        .then(cache=>{
            cache.addAll([
                "/",
                "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/index.html",
                "./offline.html",
                "./idb.js",
                "./utility.js",
                "/static/media/camera-icon.185b470ad11119ed6e3efb262a7f2cb7.svg",
                "/static/media/logo.5cf927873296e6db83fd23c145ae89d0.svg",
                "/static/media/ellipse-2.8879025c68f49a35e238bb07ebf73d7b.svg",
                "/static/media/vector.4edb6b807d261a12f6a0826691e50911.svg",
                "/static/media/report-icn.1c9c43aae35c2c2f870d51cd83fc43ab.svg",
                "/static/media/home-icn.d200934f53fbba9c77ab533aedffa3b3.svg",
                "/static/media/gps-icon.e8fd9c881ecdfa7a2cba769d91a07e27.svg",
                "/static/media/group.6b84da5fd89a9d6b4c74e19b9602871a.svg",
                "/static/media/media.dea7a1321c11c1379e80b182df1553c3.svg",
                "/static/media/vector.40f7c5a82c18db46af855a8bc52954d4.svg",
                "/static/media/home-icn.1bff412d27c39d43540133f625f59309.svg",
                "/static/media/report-icn.ccfbdbee94b8694cf0c054af894f590b.svg",
                "/static/media/group.da15c6cd14cd733b85448d89dfa2d5ad.svg"
            ])
        })
    )
})

self.addEventListener('activate', function(event) {
    console.log('Service worker activating...');
    event.waitUntil(
        caches.keys()
        .then(keys=>{
            return Promise.all(keys
                .filter(key=>key!==STATIC_CACHE_NAME && key!==DYNAMIC_CACHE_NAME)
                .map(key=>caches.delete(key))
            )
        })
    )
})

self.addEventListener('fetch', event=>{
    event.respondWith(
        caches.match(event.request)
        .then(response=>{
            if(response){
                return response;
            }
            else{
                return fetch(event.request)
                .then(res=>{
                    return catches.open(DYNAMIC_CACHE_NAME)
                    .then(cache=>{
                        cache.put(event.request.url, res.clone());
                        return res;
                    })
                    .catch(err=>{
                        return catches.open(STATIC_CACHE_NAME)
                        .then(cache=>{
                            return cache.match('/offline.html')
                        })
                    })
                })
            }
        })
    )
})


self.addEventListener('sync', event=>{
    console.log('sync event triggered')
    if (event.tag === 'sync-new-post'){
        console.log('syncing new posts')
        event.waitUntil(
            readAllData('sync-posts')
            .then(data=>{
                console.log('data is')
                console.log(data)
                for (var dt of data){
                    console.log('offline')
                    console.log(storeDataInFirebase('hello'))
                }
            })
        )
    }
})