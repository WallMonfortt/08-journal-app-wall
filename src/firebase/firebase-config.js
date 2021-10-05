import {initializeApp} from 'firebase/app'
import { GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBHwJxQ365nUmM5CcAdcwRUXygl38J2EKc",
  authDomain: "react-apps-wal.firebaseapp.com",
  projectId: "react-apps-wal",
  storageBucket: "react-apps-wal.appspot.com",
  messagingSenderId: "847144242585",
  appId: "1:847144242585:web:18d972f679157bef7f5708"
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const db = getFirestore();

export{
  provider,
  db
}