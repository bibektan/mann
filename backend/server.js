const express = require('express');
const multer = require('multer');
var cors = require('cors')
const bodyParser = require('body-parser');

const app = new express();

app.use(cors());

app.use(bodyParser.json());

const { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, arrayUnion } = require('@firebase/firestore');
const { ref, uploadBytesResumable, getDownloadURL } = require('@firebase/storage');
const {db, storage} = require('./FirebaseConfig');

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);

    app.get('/', (req, res) => {
        console.log('home page is running');
        res.json({ message: 'Welcome to the server' });
    });

    const upload = multer();

    app.post('/checkingData', upload.array('images'), async(req, res) => {
        console.log('from server.js')
        let docRef = await addDoc(collection(db, "data"), {
          latitude: req.body.lat,
          longitude: req.body.long,
          description: req.body.desc
        });

        if(docRef){
            req.files.map(file => {
                const storageRef = ref(storage, 'images/' + file.originalname);
                const uploadTask = uploadBytesResumable(storageRef, file.buffer);
                uploadTask.then(async (snapshot) => {
                    console.log('Uploaded a blob or file!');
                    const downloadURL = await getDownloadURL(storageRef);
                    console.log('File available at', downloadURL);
                    await updateDoc(doc(db, "data", docRef.id), {
                        images: arrayUnion(downloadURL)
                    });
                });
            })
        }
        
        res.json({ message: 'Data added successfully', data: req.body, files: req.files });
    });

    app.post('/addData', async(req, res) => {
        console.log('addData is running');
        console.log(req.body);
        // let docRef = await addDoc(collection(db, "data"), {
        //   latitude: req.body.lat,
        //   longitude: req.body.long,
        //   description: req.body.desc
        // });
        // req.body.images.map(file=>{
        //     console.log('the file is: ')
        //     console.log(file)
        // })

        console.log('data in body are:')
        console.log(req.body)
        
        console.log('the files are:')
        console.log(req.files)
        res.json({ message: 'Data added successfully', data: req.body});
    });
});