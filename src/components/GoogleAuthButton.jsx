import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase/firebaseConfig'

import {
	Button
} from "@material-tailwind/react"

const GoogleAuthButton = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Logged in as: ${result.user.email}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return 		<Button
														variant="outlined"
														size="lg"
														className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
														fullWidth
														onClick={handleGoogleSignIn}
												>
														<img
																src={`https://www.material-tailwind.com/logos/logo-google.png`}
																alt="google"
																className="h-6 w-6"
														/>{" "}
														sign in with google
												</Button>
};

export default GoogleAuthButton;
