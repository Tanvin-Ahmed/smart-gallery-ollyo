import { SyncLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SyncLoader color="dodgerblue" />
    </div>
  );
};

export default LoadingScreen;
