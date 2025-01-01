import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
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
			{!loading ? children : <div>Loading...</div>} {/* Show loader while checking auth */}
		</AuthContext.Provider>
	)
};
