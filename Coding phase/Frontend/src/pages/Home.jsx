import { useState } from "react";
import Animation from "../Components/Animation";
import Hero from "../Components/Hero";

const Home = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {!loadingComplete ? (
        <Animation setLoadingComplete={setLoadingComplete} />
      ) : (
        <div>
          <Hero />
        </div>
      )}
    </>
  );
};

export default Home;
