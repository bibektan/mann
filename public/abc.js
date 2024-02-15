import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, arrayUnion } from "@firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {db, storage} from './src/component/FirebaseConfig';


function storeDataInFirebase(data){
    return 'yes yes yes';
}