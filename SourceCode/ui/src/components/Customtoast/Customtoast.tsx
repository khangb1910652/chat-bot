import { CheckmarkIcon, ErrorIcon, LoaderIcon, ToastType } from "react-hot-toast";
import { ReactElement } from "react";

interface Props {
  type?: ToastType | "no-icon";
  title?: string | ReactElement;
  message?: string | ReactElement;
}

export const CustomToast = ({ type, title, message, ...props }: Props) => {
  return (
    <div className="flex items-center text-black">
      {type && (
        <div className="mr-6">
          {type === "success" && <CheckmarkIcon />}
          {type === "error" && <ErrorIcon />}
          {type === "loading" && <LoaderIcon />}
        </div>
      )}
      <div>
        <div className="font-medium font-size[15px]">{title || "Title"}</div>
        {message && <div className="font-size[14px] mt-1">{message || "Message"}</div>}
      </div>
    </div>
  );
};