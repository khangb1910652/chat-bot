import Loader from "assets/images/loading.gif";

export const Loading = (props: any) => {
  return <img className="scale-50" {...props} src={Loader} alt="loading..." />;
};
