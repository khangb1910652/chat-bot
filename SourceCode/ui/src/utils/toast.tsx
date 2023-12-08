import { ReactElement } from "react";
import toast, { Toast } from "react-hot-toast";
import { CustomToast } from "components/Customtoast/Customtoast";

export const customToast = {
  success: (message: string | ReactElement, title?: string) => {
    toast.dismiss();
    toast(
      <CustomToast
        type="success"
        title={title || "Success"}
        message={message}
      />
    );
  },
  error: (
    message: string | ReactElement,
    options?:
      | Partial<
          Pick<
            Toast,
            | "id"
            | "icon"
            | "duration"
            | "ariaProps"
            | "className"
            | "style"
            | "position"
            | "iconTheme"
          >
        >
      | undefined
  ) => {
    toast.dismiss();
    toast(
      <CustomToast type="error" title="Error" message={message} />,
      options
    );
  },
  loading: (
    message: string | ReactElement,
    options?:
      | Partial<
          Pick<
            Toast,
            | "id"
            | "icon"
            | "duration"
            | "ariaProps"
            | "className"
            | "style"
            | "position"
            | "iconTheme"
          >
        >
      | undefined
  ) => {
    toast.dismiss();
    toast(
      <CustomToast type="loading" title="Please wait" message={message} />,
      options
    );
  },
  promise: (
    promise: Promise<any>,
    options: {
      loading?: string | ReactElement;
      titleSuccess?: string;
      titleError?: string;
      success: string | ReactElement;
      error: string | ReactElement;
    }
  ) => {
    toast.dismiss();
    toast.promise(promise, {
      loading: !options?.loading ? (
        "Please wait..."
      ) : (
        <CustomToast title="Please wait" message={options.loading} />
      ),
      success: (
        <CustomToast
          title={options?.titleSuccess ?? "Success"}
          message={options.success}
        />
      ),
      error: <CustomToast title="Error" message={options.error} />,
    });
  },
};
