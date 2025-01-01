import React from "react"
import { useParams } from "react-router-dom"
import BotForm from '../components/BotForm'

const Bot = () => {
  const { id } = useParams();

  return (
    <>
      <BotForm botId={id}/>
    </>
  );
};

export default Bot;
