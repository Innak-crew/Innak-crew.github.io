import React, { useState, useEffect } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup,Form,Input, Alert } from "reactstrap";

function ListStudents() {
    const [Studentsdata, setStudentsdata] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [ID, setID] = useState('');

    useEffect(() => {
        fetch("http://localhost:9000/listStudents", {
          headers: {
            apikey: "kuygefhbsvgfdd"
          }
        })
          .then(response => response.json())
          .then(data => {
            setStudentsdata(data);
          })
          .catch(error => console.error(error));

      }, []);
    



  const handleUpdateStudent = studentId => {
    const selectedStudent = Studentsdata.data.find(Studentsdata => Studentsdata.student_id === studentId);
    setSelectedStudent(selectedStudent);
    setID(selectedStudent.student_id)
    setName(selectedStudent.student_name);
    setEmail(selectedStudent.student_email); 
    setIsUpdateModalOpen(true);   
  };

  const handleViewStudent = studentId => {
    const selectedStudent = Studentsdata.data.find(Studentsdata => Studentsdata.student_id === studentId);
    setSelectedStudent(selectedStudent);
    setName(selectedStudent.student_name);
    setEmail(selectedStudent.student_email); 
    setIsViewModalOpen(true);
   
  };
  

  const handleDeleteStudent = studentId => {
    const selectedStudent = Studentsdata.data.find(Studentsdata => Studentsdata.student_id === studentId);
    setSelectedStudent(selectedStudent);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsViewModalOpen(false);
    setIsAddModalOpen(false);
    setName("");
    setEmail("");
  };


  const handleAddStudent = () => {
    const newStudent = {
      student_name: Name,
      student_email: Email
    };
    fetch('http://localhost:9000/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'kuygefhbsvgfdd'
      },
      body: JSON.stringify(newStudent)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Student added successfully!');
    })
    .catch(error => {
      console.error(error);
      alert('Failed to add Student!');
    });
    handleCloseModal();
    window.location.reload();
  };

  const handleUpdate = () => {
     
    const apiUrl = `http://localhost:9000/updateStudent/${ID}`; // Example API endpoint
    const apiKey = "kuygefhbsvgfdd"; // Example API key
  
    const studentData = {
      student_name: Name,
      student_email: Email
    };
  
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "apikey": apiKey
      },
      body: JSON.stringify(studentData)
    })
    .then(response => {
      if (response.ok) {
        console.log("Student updated successfully!");
        handleCloseModal(); // Call the function to close the modal
        window.location.reload(); // Uncomment this line to reload the window after update
      } else {
        console.error("Failed to update student:", response.statusText);
        Alert("Failed to update student.");
      }
    })
    .catch(error => {
      console.error("Failed to update student:", error);
      Alert("Failed to update student.");
    });
  };
  
  
  const handleDelete = () => {
    // Extract student_id from the selectedStudent object
    const { student_id } = selectedStudent;
  
    // Send DELETE request to delete student
    fetch(`http://localhost:9000/deleteStudent/${student_id}`, {
      method: "DELETE",
      headers: {
        apikey: "kuygefhbsvgfdd"
      }
    })
      .then(response => {
        if (response.ok) {
          alert("Student deleted successfully!");
        } else {
          throw new Error("Failed to delete student");
        }
      })
      .catch(error => console.error(error));
    handleCloseModal();
    window.location.reload();

  };

  const tableRows = Studentsdata?.data?.map((student, index) => (
    <tr key={student.student_id} className="text-left">
      <td>{index + 1}</td>
      <td>{student.student_name}</td>
      <td>
      <span onClick={() => handleViewStudent(student.student_id)} className="btn btn-primary ml-1" style={{ cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>
            </span>
        <span onClick={() => handleUpdateStudent(student.student_id)} className="btn btn-info ml-1" style={{ cursor: 'pointer' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
</svg>
        </span>
        <span onClick={() => handleDeleteStudent(student.student_id)} className="btn btn-danger ml-1" style={{ cursor: 'pointer' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg>
        </span>
      </td>
    </tr>
  ));

  return (
    <>
    <div className="content">
    <Row>
      <Col md="12">
        <Card>
        <CardHeader className="text-right text-primary">
          <h5 >
            <i className="nc-icon nc-simple-add mx-2" 
            onClick={() =>  setIsAddModalOpen(true)}
            style={{ cursor: 'pointer' }} >

            </i>
          </h5>
        </CardHeader>
          <CardBody>
            {/* Table */}
            <Table responsive>
              <thead className="text-primary">
                <tr className="text-left">
                  <th>Sno</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </div>

     {/* view Question Modal */}
     <Modal isOpen={isViewModalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}><h6 className=" text-primary">View Student</h6></ModalHeader>
        <ModalBody>
          {/* Render View Student form */}
          {selectedStudent && (
            <div>
              <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          type=""
                          defaultValue=""
                          value={Name} 
                          disabled
                        />
                        {console.log(Name)}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          type="gmail"
                          defaultValue=""
                          value={Email} 
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
            </div>
          )}
        </ModalBody>
      </Modal>


    
      {/* Update Student Modal */}
      <Modal isOpen={isUpdateModalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}><h6 className=" text-primary">Update Student</h6></ModalHeader>
        <ModalBody>
          {/* Render update student form */}
          {selectedStudent && (
            <div>
              <Form>
                  <Row>
                  <Col md="12">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          type=""
                          defaultValue=""
                          value={Name} 
                          
                          onChange={(event) => setName(event.target.value)}
                        />
                        {console.log(Name)}
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          type="gmail"
                          defaultValue=""
                          value={Email} 
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

         {/* Delete Student Modal */}
      <Modal isOpen={isDeleteModalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}><h6 className=" text-primary">Delete Student</h6></ModalHeader>
        <ModalBody>
          {/* Render delete question confirmation */}
          {selectedStudent && (
            <div>
              <p>Are you sure you want to delete the following Student detaile?</p>
              <p>Name : {selectedStudent.student_name}</p>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Add Student Modal */}
      <Modal isOpen={isAddModalOpen} toggle={handleCloseModal}>
        <ModalHeader toggle={handleCloseModal}><h6 className=" text-primary">Add Student</h6></ModalHeader>
        <ModalBody>
        <div>
              <Form>
                  <Row>
                  <Col md="12">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          type=""
                          defaultValue=""
                          value={Name} 
                          
                          onChange={(event) => setName(event.target.value)}
                        />
                        {console.log(Name)}
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          type="gmail"
                          defaultValue=""
                          value={Email} 
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
            </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleAddStudent}>
            Add
          </Button>{" "}
          <Button color="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ListStudents;