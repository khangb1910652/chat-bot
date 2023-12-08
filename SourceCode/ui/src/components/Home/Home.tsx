import { Drawer } from "@mui/material";
import { Chatbox } from "components/Chatbox/Chatbox";
import { Message } from "components/Message/Message";
import { map } from "lodash";
import ChatbotBG from "assets/chat-bot.png";
import { useContext, useEffect, useRef, useState } from "react";
import { TransactionContext } from "context/TransactionContext";
import { customToast } from "utils/toast";
import { useNavigate } from "react-router-dom";

interface Message {
  message: string;
  isMe?: boolean;
}

export const Home = () => {
  const { isTokenValid, sendTransaction } = useContext(TransactionContext);
  
  const navigate = useNavigate();

  const [arrayMessage, setArrayMessage] = useState<Message[]>([
    {
      message: "Welcome to our chatbot",
    },
  ]);

  const messageRef = useRef<HTMLDivElement>(null);

  const ws = new WebSocket("ws://localhost:8000/ws");
  ws.onmessage = function (event) {
    setArrayMessage((prev) => {
      return [...prev, { message: event.data }];
    });
  };

  const sendMessage = async (message: string) => {
    const isExpired = !await isTokenValid();
    if (isExpired) {
      customToast.error("Your token is expired");
      await sendTransaction();
      return;
    }
    ws.send(message);
    setArrayMessage((prev) => {
      return [...prev, { message, isMe: true }];
    });
  };

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [arrayMessage]);

  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/3 text-center fixed h-full border-r border-purple-200 shadow-lg">
        <img className="mt-[50%]" src={ChatbotBG} />
        Chatbot AI 1.0
      </div>
      <div className="w-full mx-auto h-full">
        <div
          className="overflow-y-scroll mt-5 w-1/2 h-[90%] ml-[40%]"
        >
          {map(arrayMessage, (item, index) => (
            <Message key={index} message={item.message} isMe={item?.isMe} />
          ))}
        <div ref={messageRef} />
        </div>
        <Chatbox sendMessage={sendMessage} />
      </div>
    </div>
  );
};
