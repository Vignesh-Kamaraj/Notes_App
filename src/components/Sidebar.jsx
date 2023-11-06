import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
function Sidebar() {
  return (
    <>
      <ul className="navbar-nav bg-gradient-primary sidebar " id="sidebar">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <h3 className="sidebar-brand-text text-center">Notes App</h3>

        <li className="nav-item active">
          <div className="nav-link mx-3">
            <Link style={{ textDecoration: "none" }} to="/notes">
              <FontAwesomeIcon icon={faNoteSticky} />
              <span className="fs-5 mx-2">Notes</span>
            </Link>
          </div>
        </li>
      </ul>
    </>
  );
}

export default Sidebar;
