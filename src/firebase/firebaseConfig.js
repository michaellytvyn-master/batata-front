import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: "AIzaSyCD7yNOYSt1CwWBHa49vPe9zI8BSlsGmwk",
	authDomain: "botata-504bf.firebaseapp.com",
	projectId: "botata-504bf",
	storageBucket: "botata-504bf.firebasestorage.app",
	messagingSenderId: "242949571079",
	appId: "1:242949571079:web:b443b020bffd53b6a4e0a2"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
