import React from "react";// Import the CSS file

const texts = [
  "ABP Live CXO Daily Hunt Deccan Herald Femina",
  "|",
  "Global Spa Happy Credit Health Site Her Zindagi High On Persona",
  "|",
  "Hindustan Times IANS IDiva Influsser Lifestyyle",
  "|",
  "Mens XP Mid Day News Nine Perfect Women Pink Villa",
  "|",
];

const ScrollingText = () => {
  return (
    <div className="uniq-text-marquee">
      <div className="uniq-text-marquee-content">
        {texts.concat(texts).map((text, index) => ( 
          <span key={index} className="uniq-marquee-text">{text}</span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingText;
