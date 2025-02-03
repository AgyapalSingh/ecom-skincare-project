import { useState, useEffect } from "react";

const AnnounceMentBar = () => {
  const messages = [
    "🚀 Free Shipping on Orders Over ₹999!",
    "🎉 20% Off on Skincare Essentials – Limited Time!",
    "💖 Valentine's Special: Buy 1 Get 1 Free on Select Items!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="announcement-bar announcement-bar w-full h-8  justify-center content-center bg-[#F5F2EE] text-center py-8 my-8">
      <p  >{messages[currentIndex]}</p>
    </div>
  );
};

export default AnnounceMentBar;
