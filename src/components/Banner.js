import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../public/banner1.jpg";
import banner2 from "../../public/banner2.jpg";
import banner3 from "../../public/banner3.jpg";
import banner4 from "../../public/banner4.jpg";

export default function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-white to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image loading="lazy" src={banner1} alt="banner" />
        </div>
        <div>
          <Image loading="lazy" src={banner2} alt="banner" />
        </div>
        <div>
          <Image loading="lazy" src={banner3} alt="banner" />
        </div>
        <div>
          <Image loading="lazy" src={banner4} alt="banner" />
        </div>
      </Carousel>
    </div>
  );
}
