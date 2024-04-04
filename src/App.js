import React, { useEffect, useState } from "react";
import "./App.css";
import UploadPhoto from "./component/UploadPhoto";
import Utility from "./component/Utility";
import Identity from "./component/Identity";
import Description from "./component/Description";
import Post from "./component/Post";
import Maped from "./component/Maped";

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, arrayUnion } from "@firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./component/FirebaseConfig";

// resizer
import Resizer from "@meghoshpritam/react-image-file-resizer";

// spinner
import RingLoader from "react-spinners/RingLoader";

export default function App() {

  let [imgUrl, setImgUrl] = useState([]);
  let [lat, setLat] = useState(0)
  let [long, setLong] = useState(0)
  let [dec, setDes] = useState('')
  let [imageFiles, setImageFiles] = useState([])
  let [isUploading, setIsUploading] = useState(false)
  let [uploadingPer, setUploadingPer] = useState(0)
  let [isShowMessage, setIsShowMessage] = useState(false)

  useEffect(()=>{
    const readData = async()=>{
      await getDocs(collection(db, "images")).then((querySnap)=>{
        querySnap.docs.map(doc=>{
          console.log(doc.data())
        })
      })
    }

    // fetch('http://localhost:5000/', {
    //   method: 'GET'
    // }).then(res=>res.json()).then(data=>{
    //   console.log(data)
    // })

    // fetch('http://localhost:5000/addData', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     lat: '564564',
    //     long: '56464',
    //     desc: 'kldsjlk'
    //   })
    // })
    // .then(res=>res.json())
    // .then(data=>{
    //   console.log(data)
    // })

    // readData();
  },[])

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer({
        file,
        maxWidth: 300,
        maxHeight: 300,
        compressFormat: "JPEG",
        quality: 100,
        rotation: 0,
        keepAspectRatio: true,
        responseUriFunc: (uri) => {
          resolve(uri);
        },
        outputType: "base64"
      });
    });


  const addData = async()=>{
    console.log('after submit')
    console.log(imageFiles)


    // let rawData = { lat: lat, long: long, desc: dec, images: imageFiles};

    // let formData = new FormData();

    // // Append non-file data
    // for (let key in rawData) {
    //   formData.append(key, rawData[key]);
    // }

    // // resize image file
    // const imagePromises = imageFiles.map(async (file) => {

    //   const image = await resizeFile(file);

    //   const response = await fetch(image);
    //   const blob = await response.blob();

    //   let randFileName = Math.floor(Math.random() * 1000) + 1;
    //   let timeNow = Date.now()
    //   const resizedFile = new File([blob], `${randFileName + timeNow}.jpg`, { type: "image/jpeg" });

    //   formData.append('images', resizedFile)
    // })

    // await Promise.all(imagePromises);
    

    // fetch('http://localhost:5000/checkingData', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log('from app.js')
    //   console.log(data)
    // })
    // .catch(err => {
    //   console.log('error while sending data to server')
    //   console.log(err)
    // });



    try{

      if ('serviceWorker' in navigator && 'SyncManager' in window){
        navigator.serviceWorker.ready
        .then(async(sw)=>{

          // let rawData = { lat: lat, long: long, desc: dec, images: imageFiles };

          // let formData = new FormData();

          // // Append non-file data
          // for (let key in rawData) {
          //   formData.append(key, rawData[key]);
          // }

          // // resize image file
          // const imagePromises = imageFiles.map(async (file) => {

          //   const image = await resizeFile(file);

          //   const response = await fetch(image);
          //   const blob = await response.blob();

          //   let randFileName = Math.floor(Math.random() * 1000) + 1;
          //   let timeNow = Date.now()
          //   const resizedFile = new File([blob], `${randFileName + timeNow}.jpg`, { type: "image/jpeg" });

          //   formData.append('images', resizedFile)
          // })

          // await Promise.all(imagePromises);

          // resize image file

          let images = [];

          const imagePromises = imageFiles.map(async (file) => {

            const image = await resizeFile(file);

            const response = await fetch(image);
            const blob = await response.blob();

            let randFileName = Math.floor(Math.random() * 1000) + 1;
            let timeNow = Date.now()
            const resizedFile = new File([blob], `${randFileName + timeNow}.jpg`, { type: "image/jpeg" });
            images.push(resizedFile)
          })

          await Promise.all(imagePromises);


          let post = {
            id: new Date().toISOString(),
            latitude: lat,
            longitude: long,
            description: dec,
            images: imageFiles
          }

          writeData('sync-posts', post)
            .then(() => {
              console.log('sync registering')
              return sw.sync.register('sync-new-post');
            })
            .then(() => {
              console.log('sync registered')
              console.log('New post registered');
            })
            .catch(err => {
              console.log('sync registration failed')
              console.log(`'new post registration failed: ${err}'`);
            })
        })
      }else{
        console.log('from firebase')
        let docRef = await addDoc(collection(db, "data"), {
          latitude: lat,
          longitude: long,
          description: dec
        })
        
        if(docRef){
          imageFiles.map(async(file)=>{
            console.log('from app.js inside loop')
  
            const image = await resizeFile(file);
            console.log('from app.js')
            console.log(image)
  
            fetch(image)
            .then(res=>res.blob())
            .then(blob=>{
              let randFileName = Math.floor(Math.random() * 1000) + 1;
              let timeNow = Date.now()
              const resizedFile = new File([blob], `${randFileName+timeNow}.jpg`, { type: "image/jpeg" });
              
              const storageRef = ref(storage, 'new_images/' + resizedFile.name);
              const uploadTask = uploadBytesResumable(storageRef, resizedFile);
  
              uploadTask.on('state_changed',
              snapshot =>{
                setIsUploading(true)
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              },
              error =>{
                console.error("Error uploading file: ", error);
              },
              ()=>{
                // Handle successful uploads on complete
                getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                  await updateDoc(docRef, {
                    images: arrayUnion(downloadURL)
                  });
                  setIsUploading(false)
                  setIsShowMessage(true)
                  setTimeout(()=>{
                    setIsShowMessage(false)
                  }, 3000)
  
                  console.log('File available at', downloadURL);
                });
              }
              )
              
            })
          })
  
          setImgUrl([])
          setLat(0)
          setLong(0)
          setDes('')
          setImageFiles([])
  
        }

      }

    }catch(e){
      console.log(`error while adding data in firestore: ${e}`)
    }

  }

  function addIndexDb() {
    console.log('Index DB')
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready
        .then(sw => {
          var post = {
            id: new Date().toISOString(),
            title: `title-${Math.floor(Math.random() * 1000) + 1}`,
            location: `location-${Math.floor(Math.random() * 1000) + 1}`,
          };

          writeData('sync-posts', post)
            .then(() => {
              return sw.sync.register('sync-new-post');
            })
            .then(() => {
              console.log('New post registered');
            })
            .catch(err => {
              console.log(`'new post registration failed: ${err}'`);
            })
        })
    }
  }


  return (
    <div className="App">
      <div className="rest" data-uploading={isUploading ? 'true' : 'false'}>
        <h1>Report Sighting</h1>
        {/* the first box for uploding photo */}
        <UploadPhoto imgState={imgUrl} imgSetState={setImgUrl} imageFile={imageFiles} setImageFile={setImageFiles} />

        {/* box for camera access  and photo select and gps  icons  */}
        <Utility imgState={imgUrl} imgSetState={setImgUrl} imageFile={imageFiles} setImageFile={setImageFiles} setLatitude={setLat} setLongitude={setLong} lati={lat} longi={long} />
        {/* maps */}
        <Maped lat={lat} lng={long} />
        {/* user pp and name */}
        <Identity />

        {/* box for description  */}
        <Description setDescription={setDes} deci={dec} />



        {/* post button */}
        <Post onSubmit={addData} />
      </div>

      <div className="uploading" data-uploading={isUploading ? 'true' : 'false'} >
        {/* <h1>Uploading...</h1> */}
        <RingLoader
          color="blue"
          loading={isUploading}
          size={150}
          aria-label="Loading Spinner"
        />
      </div>

      <div className="success-parent" data-success={isShowMessage ? 'true' : 'false'}>
        <div className="success-message">
          <p className="success-text">Success!!</p>
        </div>
      </div>

    </div>
  );
}
