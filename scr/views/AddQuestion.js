import React, { useState } from 'react';

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col
  } from "reactstrap";

  function AddQuestion() {
    // Set login details
const url = 'https://ssd.ksrce.ac.in/signIn/loginSubmit';
const data = {
  user_type: 'student',
  username: 'dayanidigv954@gmail.com',
  password: 'daya@9524'
};

// Send POST request to login
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})
.then(response => {
  // Check response
  if (response.ok) {
    // Success
    console.log('Login successful');
    // Check if "Set-Cookie" header is present
    if (response.headers.has('set-cookie')) {
      // Get the value of the "Set-Cookie" header
      const cookies = response.headers.get('set-cookie');
      console.log('Set-Cookie:', cookies);
      // Retrieve user details from dashboard page
      const dashboardUrl = 'https://ssd.ksrce.ac.in/student-dashboard';
      // Set cookies in request headers
      const headers = { Cookie: cookies };
      // Make GET request with cookies
      fetch(dashboardUrl, { headers })
      .then(response => response.text())
      .then(content => {
        // Extract user details from the parsed HTML
        const userImg = content.match(/<img class="user-image" src="(.*?)"/)[1];
        const userName = content.match(/<h3 class="profile-username text-center">(.*?)<\/h3>/)[1].trim();
        const registerNo = content.match(/<p class="text-muted text-center">(.*?)<\/p>/)[1].trim();
        // Extract input values
        const fullName = content.match(/<input id="full_name" value="(.*?)"/)[1];
        const mobile = content.match(/<input id="mobile" value="(.*?)"/)[1];
        const email = content.match(/<input id="email_id" value="(.*?)"/)[1];
        const dob = content.match(/<input id="dob" value="(.*?)"/)[1];
        // Extract gender by checking for selected option
        const genderSelect = content.match(/<select id="gender"[\s\S]*?<option selected>(.*?)<\/option>/);
        const gender = genderSelect ? genderSelect[1].trim() : null;
        const address = content.match(/<textarea id="address">([\s\S]*?)<\/textarea>/)[1].trim();
        // Print user details
        console.log('User Image:', userImg);
        console.log('User Name:', userName);
        console.log('Register No:', registerNo);
        console.log('Full Name:', fullName);
        console.log('Mobile:', mobile);
        console.log('Email:', email);
        console.log('Date of Birth:', dob);
        console.log('Gender:', gender);
        console.log('Address:', address);
      })
      .catch(error => {
        console.log('Error retrieving user details:', error);
      });
    } else {
      console.log('No "Set-Cookie" header found in response');
    }
  } else {
    // Failed
    console.log('Login failed with status code:', response.status);
  }
})
.catch(error => {
  console.log('Error logging in:', error);
});


    const [questionText, setQuestionText] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);

  const handleAddQuestion = () => {
    const newQuestion = {
      question_text: questionText,
      test_case: JSON.stringify(testCases.map(testCase => ({ sample_input: testCase.input, sample_output: testCase.output })))
    };
    fetch('http://localhost:9000/addQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'kuygefhbsvgfdd'
      },
      body: JSON.stringify(newQuestion)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Question added successfully!');
      setQuestionText('');
      setTestCases([{ input: '', output: '' }]);
    })
    .catch(error => {
      console.error(error);
      alert('Failed to add question!');
    });
  };

  const handleInputChange = (event, index) => {
    const newTestCases = [...testCases];
    newTestCases[index].input = event.target.value;
    setTestCases(newTestCases);
  };

  const handleOutputChange = (event, index) => {
    const newTestCases = [...testCases];
    newTestCases[index].output = event.target.value;
    setTestCases(newTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };


    return (
        <>
          <div className="content">
            <Row>
            <Col md="12">
            <Card className="card-user">
              <CardBody>
                <Form>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Question</label>
                        <Input
                          type="textarea"
                          defaultValue=""
                          value={questionText} 
                          onChange={(event) => setQuestionText(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div>
                    <h6 className="text-center text-secondary">
                    <Button
                        className="btn-round"
                        color="primary"
                        onClick={addTestCase}
                      >
                        Add Testcase
                      </Button>
                      </h6>
                    
                     
                      
                    
                    </div>
                  
                  {testCases.map((testcase, index) => (
                  <div key={index} className="mb-3">
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Input</label>
                        <Input
                          type="textarea"
                          defaultValue=""
                          value={testcase.input} 
                          onChange={(event) => handleInputChange(event, index)} 
                        />
                      </FormGroup>
                      
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Output</label>
                        <Input
                          type="textarea"
                          defaultValue=""
                          value={testcase.output} 
                          onChange={(event) => handleOutputChange(event, index)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  </div>
                  ))}
                 
                  <Row>

                    <div className="ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="success"
                        onClick={handleAddQuestion}
                      >
                        Submit
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );

  }
  
export default AddQuestion;
