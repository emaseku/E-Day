import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function PersonalInfo({ formData, setFormData, handleChange, handleAddressStateChange }) {
  return (
    <Form>

      <Form.Group className="mb-3" controlId="formGridUrl">
        <Form.Label>Url</Form.Label>
        <Form.Control type="text" name="url" value={formData.url} onChange={handleChange} />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridfirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridlastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridSource">
        <Form.Label>Source</Form.Label>
        <Form.Control type="text" placeHolder="Linkedin, Indeed, Google ......" name="sourceFind" value={formData.sourceFind} onChange={handleChange} />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridSource">
        <Form.Label>Previously Employed</Form.Label>
        <Form.Control type="text" name="prevEmployed" value={formData.prevEmployed} onChange={handleChange} placeHolder="Yes = 1, No = 2" />
      </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" name="emailFunction" value={formData.emailFunction} onChange={handleChange} placeholder="xxxx@xxxxx.xxx" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" name="addy1" value={formData.addy1} onChange={handleChange} placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control type="text" name="addy2" value={formData.addy2} onChange={handleChange} placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="addressCity" value={formData.addressCity} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCounty">
          <Form.Label>County</Form.Label>
          <Form.Control type="text" name="addressCounty" value={formData.addressCounty} onChange={handleChange} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select value={formData.addressState} onChange={handleAddressStateChange} defaultValue="Choose...">
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana Nebraska">Montana Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania Rhode Island">Pennsylvania Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyomin">Wyomin</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="text" name="addressPostalCode" value={formData.addressPostalCode} onChange={handleChange} />
        </Form.Group>

      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPhoneDeviceType">
          <Form.Label>Phone Device Type</Form.Label>
          <Form.Control type="text" name="phoneDeviceType" value={formData.phoneDeviceType} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCountryPhoneCode">
          <Form.Label>Country Phone Code</Form.Label>
          <Form.Control type="text" name="countryPhoneCode" value={formData.countryPhoneCode} onChange={handleChange} />
        </Form.Group>

      </Row>

    </Form>

  );
}

export default PersonalInfo

/* 
<Form.Group as={Col} controlId="formGridCountryPhoneCode">
          <Form.Label>Country Phone Code</Form.Label>
          <Form.Control />
        </Form.Group>
*/

/*
<Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control type="text" name="addy2" value={formData.addy2} onChange={handleChange} placeholder="Apartment, studio, or floor" />
      </Form.Group>
*/

/* 
<Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> 
      */