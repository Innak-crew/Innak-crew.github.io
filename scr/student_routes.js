
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import TryOut from "views/TryOut.js";
import UserPage from "views/User.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/student"
  },{
    path: "/tryout",
    name: "TryOut",
    icon: "nc-icon nc-bank",
    component: TryOut,
    layout: "/student"
  }
  ,
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/student"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/student"
  }
];
export default routes;
