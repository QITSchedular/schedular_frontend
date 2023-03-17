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
  apiKey: "AIzaSyAONguXjvUpj7FWL0jupIT1skOYrmf3JTg",
  authDomain: "emailsending-b9e94.firebaseapp.com",
  projectId: "emailsending-b9e94",
  storageBucket: "emailsending-b9e94.appspot.com",
  messagingSenderId: "341426123567",
  appId: "1:341426123567:web:4e7af285e9750aa72767da"
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
