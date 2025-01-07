import { PauseIcon, PencilIcon, PlayIcon, TrashIcon } from "@heroicons/react/24/outline"
import {
  Avatar,
  Card,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"

import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

export default function ListWithAvatar({ bots, refreshBotsHandler }) {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to delete a bot
  const handleDelete = async (botId) => {
    if (!user) {
      setError("User is not authenticated");
      return;
    }

    try {
      const token = await user.getIdToken(); // Retrieve token dynamically
      const response = await fetch(`http://localhost:5001/api/bot/delete-bot/${botId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete bot");
      }

      const data = await response.json();
      setSuccess(data.message || "Bot deleted successfully");
      setError(null);
      refreshBotsHandler(); // Refresh the bot list after deletion
    } catch (err) {
      console.error("Error deleting bot:", err.message);
      setError(err.message);
    }
  };

  return (
    <Card className="w-full">
      <List>
        {bots.map((bot, index) => (
          <ListItem key={index}>
           <div className='flex justify-between w-full'>
           <div className='flex'>
            <ListItemPrefix>
              <Avatar
                variant="circular"
                alt={bot.name}
                src={`/crypto-icons/${bot.tradingPair
                  .replace("USDT", "")
                  .toLowerCase()}.svg`}
              />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {bot.name || "Unnamed Bot"} {/* Fallback for bot.name */}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="font-normal mb-2"
              > 
              {bot.description}
            </Typography>
                 <div className="flex gap-2">
                 <Chip value={bot.exchange} />
                {bot.algorithm === 'long' && <Chip color="green" value={bot.algorithm} />}
                {bot.algorithm === 'short' && <Chip color="red" value={bot.algorithm} />}
                <Chip color="amber" value={bot.tradingPair} />
                <Chip color="pink" value={`StopLoss - ${bot.stopLoss}%`} />
                <Chip color="purple" value={`Profit - ${bot.profit}%`} />
                <Chip color="teal" value={`${bot.isActive ? 'Active' : 'Stopped'}`} />
    </div>
 
            </div>
          </div>

            <div>
            <IconButton
								color="red"
								variant="text"
								onClick={() => navigate(`/bot/${bot._id}`)}
							>
								<PencilIcon className="h-5 w-5" />
							</IconButton>

            {bot.isActive ? <IconButton
								color="red"
								variant="text"
								onClick={() => removeFilter(filter.id)}
							>
								<PauseIcon className="h-5 w-5" />
							</IconButton> : <IconButton
								color="red"
								variant="text"
								onClick={() => removeFilter(filter.id)}
							>
								<PlayIcon className="h-5 w-5" />
							</IconButton>}
            
              {!bot.isActive && <IconButton
								color="red"
								variant="text"
								onClick={() => handleDelete(bot._id)} 
							>
								<TrashIcon className="h-5 w-5" />
							</IconButton>}
            </div>
            </div>
          </ListItem>
        ))}
      </List>
      {error && <Typography color="red" className="mt-4">{error}</Typography>}
      {success && <Typography color="green" className="mt-4">{success}</Typography>}
    </Card>
  );
}
