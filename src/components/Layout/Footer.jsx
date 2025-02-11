import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div>
          <div>
            <h1>Support</h1>
            <li>
              <NavLink
                className="nav-link dropdown-toggle"
                to={"/about-us"}
                data-bs-toggle="dropdown"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link dropdown-toggle"
                to={"/contact-us"}
                data-bs-toggle="dropdown"
              >
                Contact Us
              </NavLink>
            </li>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
