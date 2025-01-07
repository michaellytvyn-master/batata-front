import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { auth } from '../firebase/firebaseConfig'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser)
			setLoading(false)
		})
		return unsubscribe // Cleanup on unmount

	}, [])

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{!loading ? children : 
			<div className="w-full h-screen flex items-center justify-center"><Loader/></div>} {/* Show loader while checking auth */}
		</AuthContext.Provider>
	)
};
