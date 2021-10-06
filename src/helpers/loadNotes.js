import { db } from "../firebase/firebase-config"
import {collection, getDocs} from 'firebase/firestore'


export const loadNotes = async(uid) =>{
  const notesSnap = await getDocs(collection(db, `${uid}/journal/notes`));
  const notes = [];

  notesSnap.forEach( snapSon =>{
    notes.push({
      id: snapSon.id,
      ...snapSon.data()
    })
  });
  
  notes.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });
  
  return notes;
}