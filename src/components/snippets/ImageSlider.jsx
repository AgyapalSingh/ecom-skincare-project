import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './snippetsCss/ImageSlider.css';

const desktopSlides = [
  {
    image: "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/UNI-CLUB.jpg?v=1738669086",
    link: "/allcollections",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/VD-Sale-Desktop.jpg?v=1738405338",
    link: "/allcollections/bestsellers",
  },
];

const mobileSlides = [
  {
    image: "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/UNI-CLUB-M.jpg?v=1738669085",
    link: "/allcollections",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0589/0192/1956/files/VD-Sale-Mobile.jpg?v=1738405338",
    link: "/allcollections/bestsellers",
  },
];

const ImageSlider = () => {
  const [slides, setSlides] = useState(desktopSlides);
  const navigate = useNavigate(); // React Router's navigate function

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlides(mobileSlides);
      } else {
        setSlides(desktopSlides);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSlideClick = (link) => {
    navigate(link); // Navigate to the specified route
  };

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          className="uniq-swiper-slide"
          key={index}
          onClick={() => handleSlideClick(slide.link)} // Handle click event
          style={{ cursor: "pointer" }} // Indicate it's clickable
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
