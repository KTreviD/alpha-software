import React from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import Flatpickr from "react-flatpickr";

const PersonalDetails = () => {
  return (
    <React.Fragment>
      <Form>
        <Row>
          <Col lg={6}>
            <div className="mb-3">
              <Label htmlFor="firstnameInput" className="form-label">
                First Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="firstnameInput"
                placeholder="Enter your firstname"
                defaultValue="Dave"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <Label htmlFor="lastnameInput" className="form-label">
                Last Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="lastnameInput"
                placeholder="Enter your lastname"
                defaultValue="Adame"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <Label htmlFor="phonenumberInput" className="form-label">
                Phone Number
              </Label>
              <Input
                type="text"
                className="form-control"
                id="phonenumberInput"
                placeholder="Enter your phone number"
                defaultValue="+(1) 987 6543"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <Label htmlFor="emailInput" className="form-label">
                Email Address
              </Label>
              <Input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Enter your email"
                defaultValue="daveadame@velzon.com"
              />
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-3">
              <Label htmlFor="JoiningdatInput" className="form-label">
                Joining Date
              </Label>
              <Flatpickr
                className="form-control"
                options={{
                  dateFormat: "d M, Y",
                }}
              />
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-3">
              <Label htmlFor="skillsInput" className="form-label">
                Skills
              </Label>
              <select className="form-select mb-3">
                <option>Select your Skill </option>
                <option value="Choices1">CSS</option>
                <option value="Choices2">HTML</option>
                <option value="Choices3">PYTHON</option>
                <option value="Choices4">JAVA</option>
                <option value="Choices5">ASP.NET</option>
              </select>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <Label htmlFor="designationInput" className="form-label">
                Designation
              </Label>
              <Input
                type="text"
                className="form-control"
                id="designationInput"
                placeholder="Designation"
                defaultValue="Lead Designer / Developer"
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-3">
              <Label htmlFor="websiteInput1" className="form-label">
                Website
              </Label>
              <Input
                type="text"
                className="form-control"
                id="websiteInput1"
                placeholder="www.example.com"
                defaultValue="www.velzon.com"
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="cityInput" className="form-label">
                City
              </Label>
              <Input
                type="text"
                className="form-control"
                id="cityInput"
                placeholder="City"
                defaultValue="California"
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="countryInput" className="form-label">
                Country
              </Label>
              <Input
                type="text"
                className="form-control"
                id="countryInput"
                placeholder="Country"
                defaultValue="United States"
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Label htmlFor="zipcodeInput" className="form-label">
                Zip Code
              </Label>
              <Input
                type="text"
                className="form-control"
                minLength={5}
                maxLength={6}
                id="zipcodeInput"
                placeholder="Enter zipcode"
                defaultValue="90011"
              />
            </div>
          </Col>
          <Col lg={12}>
            <div className="mb-3 pb-2">
              <Label
                htmlFor="exampleFormControlTextarea"
                className="form-label"
              >
                Description
              </Label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea"
                rows={3}
                defaultValue="Hi I'm Anna Adame, It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family."
              ></textarea>
            </div>
          </Col>
          <Col lg={12}>
            <div className="hstack gap-2 justify-content-end">
              <button type="button" className="btn btn-primary">
                Updates
              </button>
              <button type="button" className="btn btn-soft-success">
                Cancel
              </button>
            </div>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default PersonalDetails;
