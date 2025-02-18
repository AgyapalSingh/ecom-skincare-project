import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div>
          <div>
            <h1>Support</h1>
            <menu>
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
              <li>
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/faqs"}
                  data-bs-toggle="dropdown"
                >
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={"/track-order"}
                  data-bs-toggle="dropdown"
                >
                  Track Order
                </NavLink>
              </li>
            </menu>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
