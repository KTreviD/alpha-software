"use client";
import PropTypes from "prop-types";
import React from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
  Spinner,
} from "reactstrap";

import Link from "next/link";
import withRouter from "@common/WithRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
const logoLight = "/images/icon-alpha-software.png";
import ParticlesAuth from "../ParticlesAuth";
import Image from "next/image";
import { usePostForgotPasswordMutation } from "src/slices/api/apiSlice";

const ForgetPasswordPage = (props: any) => {
  const [forgotPassword, { isLoading, error, data }] =
    usePostForgotPasswordMutation();

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
    }),
    onSubmit: async values => {
      await forgotPassword({
        email: values.email,
      });
    },
  });

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <div
                  className="position-absolute"
                  style={{
                    zIndex: 10,
                    top: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <Link href="/" className="d-inline-block auth-logo">
                    <Image src={logoLight} alt="" height={80} width={80} />
                  </Link>
                </div>
                <Card className="mt-5 pt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Forgot Password?</h5>
                      <p className="text-muted">
                        Reset password with Alpha Software
                      </p>

                      <i className="ri-mail-send-line display-5 text-danger mb-3"></i>
                    </div>
                    {!data && (
                      <Alert
                        className="border-0 alert-warning text-center mb-2 mx-2"
                        role="alert"
                      >
                        Enter your email and instructions will be sent to you!
                      </Alert>
                    )}
                    <div className="p-2">
                      {data && data?.message !== "" ? (
                        <Alert color="success">{data?.message}</Alert>
                      ) : null}
                      {error && error?.data?.message !== "" ? (
                        <Alert color="danger">{error?.data?.message}</Alert>
                      ) : null}
                      <Form
                        onSubmit={e => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="mb-4">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-danger w-100"
                            type="submit"
                          >
                            {isLoading ? (
                              <Spinner size="sm" className="me-2" />
                            ) : (
                              "Send Reset Link"
                            )}
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Wait, I remember my password...{" "}
                    <Link
                      href="/auth/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Click here{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
