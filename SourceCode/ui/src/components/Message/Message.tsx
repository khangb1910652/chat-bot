import SentSvg from "assets/icons/sent.svg";
import ReadSvg from "assets/icons/read.svg";

type Props = {
  message: string;
  isMe?: boolean;
};
export const Message = (props: Props) => {
  const { message, isMe } = props;
  return (
    <div
      className={`w-full flex mb-5 ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`border flex space-x-2 w-max px-1.5 pt-1 rounded-xl ${
          isMe
            ? "border-chat-purple bg-chat-purple text-white"
            : "border-black bg-black text-white "
        }`}
      >
        <div>{message}</div>
        <div className="flex items-center mt-3 text-[12px] font-extralight">
          {new Date().getHours() + ":" + new Date().getMinutes()}
          {isMe && <SentSvg />}
        </div>
      </div>
    </div>
  );
};
