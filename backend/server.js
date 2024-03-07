const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

const app = new express();

app.use(cors());

app.use(bodyParser.json());

const { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, arrayUnion } = require('@firebase/firestore');
const {db, storage} = require('./FirebaseConfig');

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
    app.get('/', (req, res) => {
        console.log('home page is running');
        res.json({ message: 'Welcome to the server' });
    });
    app.post('/addData', async(req, res) => {
        console.log('addData is running');
        console.log(req.body);
        let docRef = await addDoc(collection(db, "data"), {
          latitude: req.body.lat,
          longitude: req.body.long,
          description: req.body.desc
        });
        res.json({ message: 'Data added successfully', data: req.body });
    });
});