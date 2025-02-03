import React from "react";
import AnnounceMentBar from "../snippets/AnnounceMentBar";
import NavigationMenu from "../snippets/NavigationMenu";

const Header = () => {
  return (
    <header className="h-28 bg-[#183457] text-amber-50">
      <div>
        <AnnounceMentBar />
      </div>


      <div>
        <div>IMG</div>
        <div><NavigationMenu/></div>
        <div>Accounts</div>
      </div>
    </header>
  );
};

export default Header;
