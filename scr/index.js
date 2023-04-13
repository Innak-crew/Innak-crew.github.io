import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import StudentLayout from "layouts/Student.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
    <Route path="/student" render={(props) => <StudentLayout {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      
      <Redirect to="/login" />
    </Switch>
  </BrowserRouter>
);
