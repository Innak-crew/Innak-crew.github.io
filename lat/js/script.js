
      // Get the Sidebar
      var mySidebar = document.getElementById("mySidebar");

      // Get the DIV with overlay effect
      var overlayBg = document.getElementById("myOverlay");

      // Toggle between showing and hiding the sidebar, and add overlay effect
      function LAT_open() {
        if (mySidebar.style.display === "block") {
          mySidebar.style.display = "none";
          overlayBg.style.display = "none";
        } else {
          mySidebar.style.display = "block";
          overlayBg.style.display = "block";
        }
      }

      // Close the sidebar with the close button
      function LAT_close() {
        mySidebar.style.display = "none";
        overlayBg.style.display = "none";
      }
	  
	  
//MENU button Function

var user_profile = document.getElementById("profile");
var user_dashboard = document.getElementById("dashboard");
var user_selflearn = document.getElementById("selflearn");
var user_tryout = document.getElementById("tryout");
var user_assessment = document.getElementById("assessment");
var list_profile = document.getElementById("listprofile");
var list_dashboard = document.getElementById("listdashboard");
var list_selflearn = document.getElementById("listseflearn");
var list_tryout = document.getElementById("listtryout");
var list_assessment = document.getElementById("listassessment");

//Profile Menu button Function
function profile(){
	user_profile.style.display = "block"; 
	user_dashboard.style.display = "none";
	user_selflearn.style.display = "none";
	user_tryout.style.display = "none";
	user_assessment.style.display = "none";
	
	list_profile.className = "bg-dark";
	list_dashboard.className = "";
	list_selflearn.className = "";
	list_tryout.className = "";
	list_assessment.className = "";
}
//Try out Menu button Function
function tryout(){
	user_profile.style.display = "none"; 
	user_dashboard.style.display = "none";
	user_selflearn.style.display = "none";
	user_tryout.style.display = "block";
	user_assessment.style.display = "none";
	
	list_profile.className = "";
	list_dashboard.className = "";
	list_selflearn.className = "";
	list_tryout.className = "bg-dark";
	list_assessment.className = "";
}
//Self learn Menu button Function
function selflearn(){
	user_profile.style.display = "none";
	user_dashboard.style.display = "none";
	user_selflearn.style.display = "block";
	user_tryout.style.display = "none";
	user_assessment.style.display = "none";
	
	list_profile.className = "";
	list_dashboard.className = "";
	list_selflearn.className = "bg-dark";
	list_tryout.className = "";
	list_assessment.className = "";
}
//DASHBOARD Menu button Function
function dashboard(){
	user_profile.style.display = "none";
	user_dashboard.style.display = "block";
	user_selflearn.style.display = "none";
	user_tryout.style.display = "none";
	user_assessment.style.display = "none";
	
	list_profile.className = "";
	list_dashboard.className = "bg-dark";
	list_selflearn.className = "";
	list_tryout.className = "";
	list_assessment.className = "";
}
//ASSESSMENT Menu button Function
function assessment(){
	user_profile.style.display = "none";
	user_dashboard.style.display = "none";
	user_selflearn.style.display = "none";
	user_tryout.style.display = "none";
	user_assessment.style.display = "block";
	
	list_profile.className = "";
	list_dashboard.className = "";
	list_selflearn.className = "";
	list_tryout.className = "";
	list_assessment.className = "bg-dark";
}
