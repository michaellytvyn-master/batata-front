import React from "react"
import { useParams } from "react-router-dom"
import BotForm from '../components/BotForm'

const CreateBot = () => {
  const { id } = useParams();

  return (
    <div>
      <BotForm botId={id} newBot={true}/>
    </div>
  );
};

export default CreateBot;
