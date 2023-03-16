import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { ToastContainer, toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: "AIzaSyB1EbkpxNL7s2pQp5nH3J106WCScDHFtzU",
  authDomain: "test-11d66.firebaseapp.com",
  projectId: "test-11d66",
  storageBucket: "test-11d66.appspot.com",
  messagingSenderId: "24718878064",
  appId: "1:24718878064:web:a18c686e06c9a969075bb5"
};
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD2G7GzCn0fi9cF7fzaC4W0Lo-fKmZtQQY",
//   authDomain: "my-first-schedular-app.firebaseapp.com",
//   projectId: "my-first-schedular-app",
//   storageBucket: "my-first-schedular-app.appspot.com",
//   messagingSenderId: "940352193683",
//   appId: "1:940352193683:web:bc022498504e56a860f966"
// };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  website,
  companyName,
  subject
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      website,
      companyName,
      subject,
      authProvider: "local",
      email,
    });
  } catch (err) {
    // console.error(err);
    alert("from firebase.js " + err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("We have sent Password reset link to your Email!");
  } catch (err) {
    // console.error(err);
    alert(err.message);
  }
};

export { auth, db, registerWithEmailAndPassword, sendPasswordReset, storage };
