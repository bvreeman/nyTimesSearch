import React from "react";
import "./Navbar.css";

const Navbar = () => (
    <div className = "container-fluid">
      <div className="row">
        <nav className="navbar">
            <div className= "col-md-12">
              <div className='row'>
                <h2>NY Times Article Scrubber</h2>
              </div>
              <div className='row'>
                <h3>Search and annotate articles of interest</h3>
              </div>
            </div>
        </nav>
      </div>
    </div>
);

export default Navbar;