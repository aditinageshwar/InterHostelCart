import { useState } from "react";
import Animation from "./Animation";
import Hero from "./Hero";

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
