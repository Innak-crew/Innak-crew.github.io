
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import QuestionList from "views/ListQuestions.js";
import ProgramsList from "views/ListProgram.js";
import TryOut from "views/TryOut.js";
import StudentsList from "views/ListStudents.js";
import UserPage from "views/User.js";
import AddQuestion from "views/AddQuestion.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Question List",
    icon: "nc-icon nc-tile-56",
    component: QuestionList,
    layout: "/admin"
  },
  {
    path: "/studentslist",
    name: "Students List",
    icon: "nc-icon nc-tile-56",
    component: StudentsList,
    layout: "/admin"
  },
  {
    path: "/programslist",
    name: "Programs List",
    icon: "nc-icon nc-tile-56",
    component: ProgramsList,
    layout: "/admin"
  },
  {
    path: "/addquestion",
    name: "Add Question ",
    icon: "nc-icon nc-simple-add",
    component:AddQuestion,
    layout: "/admin"
  }
];
export default routes;
