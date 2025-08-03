import { useEffect, useState } from "react";
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h4 from "../assets/h4.jpg";
import h6 from "../assets/h6.jpg";
import h7 from "../assets/h7.png";
import h8 from "../assets/h8.avif";
import h9 from "../assets/h9.jpg";
import h10 from "../assets/h10.jpg";
import h12 from "../assets/h12.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [(h8),(h2),(h4),(h6),(h7),(h1),(h9),(h10),(h12)];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-lg h-96 mx-auto overflow-hidden rounded-md">
      <div className="carousel relative h-full w-full">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item absolute inset-0 ${index === currentIndex ? "block" : "hidden"}`}>
            <img src={image} alt={`Slide ${index + 1}`} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <span key={index} className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-cyan-600" : "bg-gray-300"}`}/>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
