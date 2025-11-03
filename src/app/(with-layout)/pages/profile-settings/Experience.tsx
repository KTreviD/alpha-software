import React from "react";
import { Col, Input, Label, Row } from "reactstrap";

const Experience = () => {
  return (
    <React.Fragment>
      <form>
        <div id="newlink">
          <div id="1">
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="jobTitle" className="form-label">
                    Job Title
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="jobTitle"
                    placeholder="Job title"
                    defaultValue="Lead Designer / Developer"
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="companyName" className="form-label">
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="companyName"
                    placeholder="Company name"
                    defaultValue="Themesbrand"
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <Label htmlFor="companyName" className="form-label">
                    Job Type
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="jobType"
                    placeholder="Job type"
                    defaultValue="Full Time"
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="experienceYear" className="form-label">
                    Start Date
                  </label>
                  <Row>
                    <Col lg={5}>
                      <select
                        className="form-control"
                        data-choices
                        data-choices-search-false
                        name="experienceYear"
                        id="experienceYear"
                      >
                        <option defaultValue="">Select Month</option>
                        <option value="Choice 1">January</option>
                        <option value="Choice 2">February</option>
                        <option value="Choice 3">March</option>
                        <option value="Choice 4">April</option>
                        <option value="Choice 5">May</option>
                        <option value="Choice 6">June</option>
                        <option value="Choice 7">July</option>
                        <option value="Choice 8">August</option>
                        <option value="Choice 9">September</option>
                        <option value="Choice 10">October</option>
                        <option value="Choice 11">Noviembre</option>
                        <option value="Choice 12">Diciembre</option>
                      </select>
                    </Col>

                    <Col lg={5}>
                      <select
                        className="form-control"
                        data-choices
                        data-choices-search-false
                        name="choices-single-default2"
                      >
                        <option defaultValue="">Select years</option>
                        <option value="Choice 1">2001</option>
                        <option value="Choice 2">2002</option>
                        <option value="Choice 3">2003</option>
                        <option value="Choice 4">2004</option>
                        <option value="Choice 5">2005</option>
                        <option value="Choice 6">2006</option>
                        <option value="Choice 7">2007</option>
                        <option value="Choice 8">2008</option>
                        <option value="Choice 9">2009</option>
                        <option value="Choice 10">2010</option>
                        <option value="Choice 11">2011</option>
                        <option value="Choice 12">2012</option>
                        <option value="Choice 13">2013</option>
                        <option value="Choice 14">2014</option>
                        <option value="Choice 15">2015</option>
                        <option value="Choice 16">2016</option>
                        <option value="Choice 17">2017</option>
                        <option value="Choice 18">2018</option>
                        <option value="Choice 19">2019</option>
                        <option value="Choice 20">2020</option>
                        <option value="Choice 21">2021</option>
                        <option value="Choice 22">2022</option>
                      </select>
                    </Col>

                    <div className="col-auto align-self-center">to</div>
                  </Row>
                </div>
              </Col>

              <Col lg={6}>
                <div className="mb-3">
                  <label htmlFor="experienceYear" className="form-label">
                    End Date
                  </label>
                  <Row>
                    <Col lg={5}>
                      <select
                        className="form-control"
                        data-choices
                        data-choices-search-false
                        name="experienceYear"
                        id="experienceYear"
                      >
                        <option defaultValue="">Select Month</option>
                        <option value="Choice 1">January</option>
                        <option value="Choice 2">February</option>
                        <option value="Choice 3">March</option>
                        <option value="Choice 4">April</option>
                        <option value="Choice 5">May</option>
                        <option value="Choice 6">June</option>
                        <option value="Choice 7">July</option>
                        <option value="Choice 8">August</option>
                        <option value="Choice 9">September</option>
                        <option value="Choice 10">October</option>
                        <option value="Choice 11">Noviembre</option>
                        <option value="Choice 12">Diciembre</option>
                      </select>
                    </Col>

                    <Col lg={5}>
                      <select
                        className="form-control"
                        data-choices
                        data-choices-search-false
                        name="choices-single-default2"
                      >
                        <option defaultValue="">Select years</option>
                        <option value="Choice 1">2001</option>
                        <option value="Choice 2">2002</option>
                        <option value="Choice 3">2003</option>
                        <option value="Choice 4">2004</option>
                        <option value="Choice 5">2005</option>
                        <option value="Choice 6">2006</option>
                        <option value="Choice 7">2007</option>
                        <option value="Choice 8">2008</option>
                        <option value="Choice 9">2009</option>
                        <option value="Choice 10">2010</option>
                        <option value="Choice 11">2011</option>
                        <option value="Choice 12">2012</option>
                        <option value="Choice 13">2013</option>
                        <option value="Choice 14">2014</option>
                        <option value="Choice 15">2015</option>
                        <option value="Choice 16">2016</option>
                        <option value="Choice 17">2017</option>
                        <option value="Choice 18">2018</option>
                        <option value="Choice 19">2019</option>
                        <option value="Choice 20">2020</option>
                        <option value="Choice 21">2021</option>
                        <option value="Choice 22">2022</option>
                      </select>
                    </Col>
                  </Row>
                </div>
              </Col>

              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="jobDescription" className="form-label">
                    Job Description
                  </Label>
                  <Input
                    type="textarea"
                    className="form-control"
                    id="jobDescription"
                    rows="3"
                    placeholder="Enter description"
                    defaultValue="You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites."
                  />
                </div>
              </Col>

              <div className="hstack gap-2 justify-content-end">Delete</div>
            </Row>
          </div>
        </div>
        <div id="newForm" style={{ display: "none" }}></div>

        <Col lg={12}>
          <div className="hstack gap-2">
            <button type="submit" className="btn btn-success">
              Update
            </button>
            Add New
          </div>
        </Col>
      </form>
    </React.Fragment>
  );
};

export default Experience;
