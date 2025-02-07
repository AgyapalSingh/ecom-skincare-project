import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import './snippetsCss/ImageSlider.css'

const desktopImages = [
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/UNI-CLUB.jpg?v=1738669086",
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/VD-Sale-Desktop.jpg?v=1738405338",
];

const mobileImages = [
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/UNI-CLUB-M.jpg?v=1738669085",
  "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/VD-Sale-Mobile.jpg?v=1738405338",
];

const ImageSlider = () => {
  const [images, setImages] = useState(desktopImages);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImages(mobileImages);
      } else {
        setImages(desktopImages);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide className="uniq-swiper-slide" key={index}>
          <img src={image} alt={`Slide ${index + 1}`}  loading={index === 0 ? "eager" : "lazy"} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
