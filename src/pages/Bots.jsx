import {
  Button,
  Typography
} from "@material-tailwind/react"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CryptoCards from "../components/CryptoCards"
import ListWithAvatar from "../components/ListWithAvatar"
import { AuthContext } from "../context/AuthContext"

const Bots = () => {
  const navigate = useNavigate();
  const [bots, setBots] = useState([]); // Initialize state as an empty array
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading
  const { user } = useContext(AuthContext); // Access the user from AuthContext

  // Fetch bots from the backend
  const fetchBots = async () => {
    if (!user) {
      setError("User is not authenticated");
      setLoading(false); // Stop loading if no user
      return;
    }

    try {
      setLoading(true); // Start loading

      // Retrieve the token dynamically using getIdToken
      const token = await user.getIdToken();
      if (!token) {
        throw new Error("Failed to retrieve token");
      }

      const response = await fetch("http://localhost:5001/api/bot/get-bots", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Add the token to the Authorization header
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch bots: ${response.statusText}`);
      }

      const data = await response.json();

      // Validate response structure
      if (!Array.isArray(data.bots)) {
        throw new Error("Invalid data format received");
      }

      setBots(data.bots); // Set the bots in the state
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setBots([]); // Clear bots if there's an error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchBots();
  }, [user]); // Re-run when user changes


  const refreshBotsHandler = () => {
    fetchBots();
  }

  return (
    <div className="min-h-screen">
      <Typography
        variant="h2"
        color="blue-gray"
        className="mb-2 flex justify-between items-center"
      >
        <div>Ready-made bots</div>
      </Typography>

      <CryptoCards />

      <Typography
        variant="h2"
        color="blue-gray"
        className="mb-2 flex justify-between items-center"
      >
        <div>Bots</div>
        <Button
          variant="gradient"
          onClick={() => navigate("/create-bot")}
        >
          Create
        </Button>
      </Typography>

      {loading && <Typography color="blue-gray" className="mb-4">Loading bots...</Typography>}
      {error && <Typography color="red" className="mb-4">{error}</Typography>}

      {!loading && !error && bots.length === 0 && (
        <Typography color="blue-gray" className="mb-4 min-h-[200px] w-full flex items-center justify-center">
          Create Your first Bot to get started!
        </Typography>
      )}

      {!loading && !error && bots.length > 0 && (
        <ListWithAvatar bots={bots} refreshBotsHandler={refreshBotsHandler}/>
      )}
    </div>
  );
};

export default Bots;
