
import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  UncontrolledAlert,
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

function Notifications() {
  const notificationAlert = React.useRef();
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Paper Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    notificationAlert.current.notificationAlert(options);
  };
  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlert} />
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <Row>
                  <Col md="6">
                    <Card className="card-plain">
                      <CardHeader>
                        <CardTitle tag="h3">Notifications</CardTitle>
                      </CardHeader>
                      <CardBody>
                        
                        <UncontrolledAlert color="info" fade={false}>
                          <span>No Notification</span>
                        </UncontrolledAlert>
                      </CardBody>
                    </Card>
                  </Col>
                 
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
       
      </div>
    </>
  );
}

export default Notifications;
