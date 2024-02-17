import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function JobInfo({ formData, setFormData, handleChange, handleAddressStateChange }) {
    return (

    <Form>
        
        <Form.Group className="mb-3" controlId="formGridJobTitle">
        <Form.Label>Job Title</Form.Label>
        <Form.Control type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCompanyTitle">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" name="companyTitle" value={formData.companyTitle} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridJobLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="jobLocation" value={formData.jobLocation} onChange={handleChange} />
        </Form.Group>
      </Row>

       <Row className="monthyearalign">
        <Col xs={2}>
            Start Month
          <Form.Control type="text" name="startMonth" value={formData.startMonth} onChange={handleChange} placeholder="MM" />
        </Col>
        <Col xs={2}>
            Start Year
          <Form.Control type="text" name="startYear" value={formData.startYear} onChange={handleChange} placeholder="YY" />
        </Col>
        <Col xs={2}>
            End Month
          <Form.Control type="text" name="endMonth" value={formData.endMonth} onChange={handleChange} placeholder="MM" />
        </Col>
        <Col xs={2}l>
            End Year
          <Form.Control type="text" name="endYear" value={formData.endYear} onChange={handleChange} placeholder="YY" />
        </Col>
      </Row> 

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Role Description</Form.Label>
        <Form.Control type="text" name="roleDescription" value={formData.roleDescription} onChange={handleChange} as="textarea" rows={3}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridSchool">
        <Form.Label>School</Form.Label>
        <Form.Control type="text" name="school" value={formData.school} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridDegree">
        <Form.Label>Degree</Form.Label>
        <Form.Control type="text" name="degree" value={formData.degree} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridFieldOfStudy">
        <Form.Label>Field Of Study</Form.Label>
        <Form.Control type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
      </Form.Group>

    </Form>

    );
}

export default JobInfo