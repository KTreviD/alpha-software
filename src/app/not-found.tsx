"use client";
import React from "react";
import Link from "next/link";
import { Col, Container, Row } from "reactstrap";
import Image from "next/image";
// Import Images
const error400cover = "/images/error400-cover.png";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="auth-page-content">
        <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
          <div className="auth-page-content overflow-hidden p-0">
            <Container>
              <Row className="justify-content-center">
                <Col xl={7} lg={8}>
                  <div className="text-center">
                    <Image
                      src={error400cover}
                      width={500}
                      height={500}
                      alt="error img"
                      className="img-fluid"
                    />
                    <div className="mt-3">
                      <h3 className="text-uppercase">
                        {"Sorry, Page not Found ;("}
                      </h3>
                      <p className="text-muted mb-4">
                        The page you’re looking for doesn't exist!
                      </p>
                      <Link href="/" className="btn btn-success">
                        <i className="mdi mdi-home me-1"></i>Back to home
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
