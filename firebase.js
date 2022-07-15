import firebase from 'firebase/compat/app';
import { addDoc, collection, serverTimestamp, query, getFirestore, orderBy, limit, onSnapshot, doc } from "firebase/firestore";



const firebaseConfig = {
  apiKey: 'CREATE YOUR OWN DATABASE AND PUT YOUR DETAILS',
  authDomain: 'CREATE YOUR OWN DATABASE AND PUT YOUR DETAILS',
  projectId: 'CREATE YOUR OWN DATABASE AND PUT YOUR DETAILS',
  storageBucket: 'CREATE YOUR OWN DATABASE AND PUT YOUR DETAILS',
  messagingSenderId: 'CREATE YOUR OWN DATABASE AND PUT YOUR DETAILS',
  appId: 'CREATE YOUR OWN DATABASE AND PUT YOUR DETAILS',
  measurementId: 'CREATE YOUR OWN DATABASE AND PUT YOUR DETAILS',
};


const app = firebase.initializeApp(firebaseConfig)
const db = getFirestore(app);

const ordersCollection = collection(db, 'orders')

export async function addToCollection(order) {
  addDoc(ordersCollection, {
    items: order.items,
    restaurantName: order.restaurantName,
    createdAt: serverTimestamp()
  });
}



export default { firebase, addToCollection, ordersCollection };