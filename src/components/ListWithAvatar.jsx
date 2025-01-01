import {
	Avatar,
	Card,
	List,
	ListItem,
	ListItemPrefix,
	Typography,
} from "@material-tailwind/react"
import React from "react"
import { useNavigate } from 'react-router-dom'

export default function ListWithAvatar({ users }) {
	const navigate = useNavigate()
  return (
    <Card className="w-full">
      <List>
        {users.map((user, index) => (
          <ListItem key={index} onClick={()=>navigate(`/bot/${user.id}`)}>
            <ListItemPrefix>
              <Avatar variant="circular" alt={user.name} src={user.avatar} />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {user.name}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {user.role}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}