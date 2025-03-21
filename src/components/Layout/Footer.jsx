import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="uniq-ag-footer-container">
          <div className="uniq-ag-footer-container-div">
            <h1 className="uniq-ag-footer-nav-title">Support</h1>
            <menu className="uniq-ag-footer-nav">
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

          <div className="uniq-ag-footer-container-div">
            <h1 className="uniq-ag-footer-nav-title">Policy Info</h1>
            <menu className="uniq-ag-footer-nav">
              <li>
                <NavLink to={"/about-us"}>Disclaimer</NavLink>
              </li>
              <li>
                <NavLink to={"/contact-us"}>Privacy Policy</NavLink>
              </li>
              <li>
                <NavLink to={"/faqs"}>Terms & Conditions</NavLink>
              </li>
              <li>
                <NavLink to={"/track-order"}>Shipping Policy</NavLink>
              </li>
            </menu>
          </div>
          <div className="uniq-ag-footer-container-div">
            <h1 className="uniq-ag-footer-nav-title">Highlights</h1>
            <menu className="uniq-ag-footer-nav">
              <li>
                <NavLink to={"/about-us"}>Ingredient of the Month</NavLink>
              </li>
              <li>
                <NavLink to={"/contact-us"}>Offers</NavLink>
              </li>
              <li>
                <NavLink to={"/faqs"}>Press & Media</NavLink>
              </li>
              <li>
                <NavLink to={"/track-order"}>C.H.A.N.G.E</NavLink>
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
