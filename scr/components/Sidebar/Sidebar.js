import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo.svg";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
   const [classes, setClasses] = React.useState("dropdown show");
  const handleClick = () => {
    if (classes === "dropdown") {
      setClasses("dropdown show");
    } else {
      setClasses("dropdown");
    }
  };
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          href="#"
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a
          href="#"
          className="simple-text logo-normal"
        >
          LAT
        </a>
       
    
         
            
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
          <div className="badge-colors text-center my-5" >
              <span
                className={
                  props.bgColor === "black"
                    ? "badge filter badge-dark active"
                    : "badge filter badge-dark"
                }
                data-color="black"
                onClick={() => {
                  props.handleBgClick("black");
                }}
                style={{ cursor: "pointer" }}
                >
                Black
              </span>
              <span
                className={
                  props.bgColor === "white"
                    ? "badge filter badge-light active"
                    : "badge filter badge-light"
                }
                data-color="white"
                onClick={() => {
                  props.handleBgClick("white");
                }}
                style={{ cursor: "pointer" }}
                >
                White
              </span>
            </div>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
