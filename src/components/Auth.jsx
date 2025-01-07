import {
  Button,
  CardBody,
  CardHeader,
  Input,
  Typography
} from "@material-tailwind/react"
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import GoogleAuthButton from '../components/GoogleAuthButton'
import { auth } from '../firebase/firebaseConfig'

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
		const [repeatPassword, setRepeatPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const [user, setUser] = useState(null); // Track the authenticated user
		const [searchParams, setSearchParams] = useSearchParams();
  const signup = searchParams.get('signup');

		// ?signup=1
		useEffect(() => {
			setIsSignUp(false)
			if(signup == 1){
				setIsSignUp(true)
			}
		},[signup])
  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if(user){
      saveUserToBackend()
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSignUp && password !== repeatPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }
  
    try {
      if (isSignUp) {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
          alert("This email is already in use. Please try logging in or using a different email.");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        // alert("User registered successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        // alert("User logged in successfully!");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please try logging in or using a different email.");
      } else if (error.code === "auth/weak-password") {
        alert("Password is too weak. Please choose a stronger password.");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address. Please check and try again.");
      } else {
        alert(error.message);
      }
    }
  };  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // alert('User logged out successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        return true; // Email is already registered
      }
      return false; // Email is available
    } catch (error) {
      console.error("Error checking email:", error.message);
      return false;
    }
  };

  const saveUserToBackend = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error("No user is logged in.");
      return;
    }
  
    try {
      // Get Firebase ID token
      const idToken = await user.getIdToken();
  
      // Send user data and token to your backend
      const response = await fetch("http://localhost:5001/api/user/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          email: user.email,
          displayName: user.displayName,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save user info on the backend");
      }
  
      const data = await response.json();
      console.log("User info saved successfully:", data);
    } catch (err) {
      console.error("Error saving user info:", err.message);
    }
  };

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.email}</h2>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    );
  }

  return (
    <div>
					<CardHeader shadow={false} floated={false} className="text-center">
													<Typography
															variant="h1"
															color="blue-gray"
															className="mb-4 !text-3xl lg:text-4xl"
													>
															{isSignUp ? 'Sign Up' : 'Login'}
													</Typography>
													<Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
															Enjoy quick and secure access to your account.
													</Typography>
											</CardHeader>
											<CardBody>
					<form
          className="flex flex-col gap-4 md:mt-12"
										onSubmit={handleSubmit}
        >
          <div>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="YourEmail@mail.com"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
														value={email}
														onChange={(e) => setEmail(e.target.value)}
														required
            />
          </div>
										<div>
            <Input
              id="password"
              color="gray"
              size="lg"
              type="password"
              name="password"
              placeholder="Password"
              className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
														value={password}
														onChange={(e) => setPassword(e.target.value)}
														required
            />
          </div>
										{isSignUp && (
											<div>
											<Input
													id="repeatPassword"
													color="gray"
													size="lg"
													type="password"
													name="repeatPassword"
													placeholder="Repeat password"
													className="!w-full placeholder:!opacity-100 focus:!border-t-primary !border-t-blue-gray-200"
													labelProps={{
															className: "hidden",
													}}
													value={repeatPassword}
													onChange={(e) => setRepeatPassword(e.target.value)}
													required
											/>
									</div>
										)}
          <Button size="lg" color="gray" fullWidth type="submit">
            continue {isSignUp ? 'Sign Up' : 'Log In'}
          </Button>

										<Button size="lg" variant="outlined" fullWidth onClick={() => setIsSignUp(!isSignUp)}>
												Switch to {isSignUp ? 'Log In' : 'Sign Up'}
										</Button>

										<hr/>
        
										<GoogleAuthButton />
   
          <Typography
            variant="small"
            className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
          >
            Upon signing in, you consent to abide by our{" "}
            <a href="#" className="text-gray-900">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="#" className="text-gray-900">
              Privacy Policy.
            </a>
          </Typography>
        </form>
								</CardBody>
    </div>
  );
};

export default Auth;
