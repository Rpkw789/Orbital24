import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBfKZPjYfyckkK_LurdYvgR3taj5ecxujM",
    authDomain: "edusell-460f4.firebaseapp.com",
    projectId: "edusell-460f4",
    storageBucket: "edusell-460f4.appspot.com",
    messagingSenderId: "530222344689",
    appId: "1:530222344689:web:2d11705c8e8a61d6a63c50",
    measurementId: "G-7H12H4S6GT"
};

const app = initializeApp(firebaseConfig);

export default app;