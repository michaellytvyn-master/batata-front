import {
	Button,
	CardBody,
	CardHeader,
	Input,
	Typography
} from "@material-tailwind/react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User registered successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('User logged in successfully!');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('User logged out successfully!');
    } catch (error) {
      alert(error.message);
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
