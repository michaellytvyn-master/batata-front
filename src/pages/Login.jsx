import React from "react"
import Auth from '../components/Auth'

import {
	Card
} from "@material-tailwind/react"
 
export function Login() {
  return (
			<div className='w-full flex justify-center items-center py-5'>
			<div className='max-w-[500px] w-full'>
    <Card
      shadow={false}
      className="md:px-24 md:py-14 py-8 border border-gray-300"
    >
      			<Auth />
     
    </Card>
				</div>
				</div>
  );
}
 
export default Login;