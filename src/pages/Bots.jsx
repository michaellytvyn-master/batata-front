import {
  Button,
  Typography
} from "@material-tailwind/react"
import React from "react"
import { useNavigate } from 'react-router-dom'
import ListWithAvatar from '../components/ListWithAvatar'
const Bots = () => {
  const navigate = useNavigate()

  const testUsers = [
    {
      id: 1,
      name: "Tania Andrew",
      avatar: "https://docs.material-tailwind.com/img/face-1.jpg",
      role: "Software Engineer @ Material Tailwind",
    },
    {
      id: 2,
      name: "Alexander Parker",
      avatar: "https://docs.material-tailwind.com/img/face-2.jpg",
      role: "Backend Developer @ Material Tailwind",
    },
    {
      id: 3,
      name: "Emma Willever",
      avatar: "https://docs.material-tailwind.com/img/face-3.jpg",
      role: "UI/UX Designer @ Material Tailwind",
    },
    {
      id: 4,
      name: "Liam Scott",
      avatar: "https://docs.material-tailwind.com/img/face-4.jpg",
      role: "DevOps Engineer @ Material Tailwind",
    },
    {
      id: 5,
      name: "Sophia Brown",
      avatar: "https://docs.material-tailwind.com/img/face-5.jpg",
      role: "Project Manager @ Material Tailwind",
    },
  ];
  
  return (
    <div className='min-h-screen'>
       <Typography variant="h2" color="blue-gray" className="mb-2 flex justify-between items-center">
          <div>Bots</div>
          <Button variant="gradient" onClick={()=>navigate('/create-bot')}>Create</Button>
        </Typography>
      <ListWithAvatar users={testUsers}/>
    </div>
  );
};

export default Bots;
