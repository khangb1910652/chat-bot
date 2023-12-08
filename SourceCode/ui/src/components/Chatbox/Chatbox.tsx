import { TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

import SmileSvg from "assets/icons/smile.svg";
import SendSvg from "assets/icons/send.svg";

type Props = {
  sendMessage: (message: string) => void;
}

export const Chatbox = (props: Props) => {
  const { sendMessage } = props;
  const [message, setMessage] = useState('');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMessage(value);
  }

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage(message.trim());
      setMessage('');
    }
  }

  return (
    <div className="w-full mx-auto bg-white flex items-center space-x-5 fixed bottom-0 p-2 left-[35%]">
      <div>
        <SmileSvg />
      </div>
      <div className="w-1/2">
        <TextField value={message} onChange={handleOnChange} onKeyDown={handleOnKeyDown} fullWidth/>
      </div>
      <div onClick={() => sendMessage(message)}>
        <SendSvg />
      </div>
    </div>
  );
};
