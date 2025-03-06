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
                <NavLink to={"/about-us"}>About Us</NavLink>
              </li>
              <li>
                <NavLink to={"/contact-us"}>Contact Us</NavLink>
              </li>
              <li>
                <NavLink to={"/faqs"}>FAQs</NavLink>
              </li>
              <li>
                <NavLink to={"/track-order"}>Track Order</NavLink>
              </li>
            </menu>
          </div>
        </div>
        <div className="Developers-Name">
          <h1>
            Developed By{" "}
            <a
              href="https://www.linkedin.com/in/agyapal-singh-020983241/"
              target="_blank"
            >
              {" "}
              Agyapal Singh{" "}
            </a>
          </h1>
          <span>With ❤</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
