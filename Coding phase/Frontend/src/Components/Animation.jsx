import React,{ useEffect } from "react";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import loading from "../loading.json";

const Animation = ({ setLoadingComplete }) => 
{
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoadingComplete(true); 
    }, 1000);

    return () => clearTimeout(loadingTimeout); 
    }, [setLoadingComplete]);

    return (
     <div className="flex justify-center items-center h-screen">
       <Lottie animationData={loading} style={{ marginTop:-200,width: 700, height: 500 }} />
     </div>
  );
}

export default Animation;
