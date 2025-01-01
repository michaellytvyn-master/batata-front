import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import app from './firebase'

const auth = getAuth(app)

// Sign up
export const signUp = async (email, password) => {
	const userCredential = await createUserWithEmailAndPassword(auth, email, password)
	return userCredential.user
}

// Log in
export const logIn = async (email, password) => {
	const userCredential = await signInWithEmailAndPassword(auth, email, password)
	return userCredential.user
}
