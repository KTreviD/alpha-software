"use client";
import React, { useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
  Button,
  Spinner,
} from "reactstrap";
import { usePostRegisterMutation } from "src/slices/api/apiSlice";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import Link from "next/link";

//import images
const logoAlpha = "/images/icon-alpha-software.png";
import ParticlesAuth from "../ParticlesAuth";

import Image from "next/image";
// interface UserTermsAcceptance {
//   userId: number;
//   accepted: boolean;
//   termsVersion: string;
//   acceptedAt: Date;
//   ipAddress?: string;
//   userAgent?: string;
// }
// ESO hay que implementarlo a la hora de aceptar los terminos y condiciones
// Agregar axiom
const Register = () => {
  const [registerUser, { isLoading, error, data }] = usePostRegisterMutation();
  console.log({ error, data });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "carloscharlie4td@hotmail.com",
      password: "1234567",
      confirm_password: "1234567",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), ""])
        .required("Confirm Password is required"),
    }),
    onSubmit: async values => {
      await registerUser({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirm_password,
      });
    },
  });

  return (
    <React.Fragment>
      <ParticlesAuth fixHeight={data?.message ? true : false}>
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
                    <Image src={logoAlpha} alt="" height={80} width={80} />
                  </Link>
                </div>
                <Card className="mt-5 pt-3">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create New Account</h5>
                      <p className="text-muted">
                        Get your free Alpha Solutions account now
                      </p>
                    </div>
                    {data && data?.message !== "" ? (
                      <Alert color="success">{data?.message}</Alert>
                    ) : null}
                    {error && error?.data?.message !== "" ? (
                      <Alert color="danger">{error?.data?.message}</Alert>
                    ) : null}
                    <div className="p-2 mt-3">
                      <Form
                        onSubmit={e => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        className="needs-validation"
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="useremail" className="form-label">
                            Email <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email address"
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
                        <div className="mb-3">
                          <Label htmlFor="userpassword" className="form-label">
                            Password <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="confirm_password"
                            type="password"
                            placeholder="Confirm Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.confirm_password || ""}
                            invalid={
                              validation.touched.confirm_password &&
                              validation.errors.confirm_password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.confirm_password &&
                          validation.errors.confirm_password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.confirm_password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-4">
                          <p className="mb-0 fs-12 text-muted fst-italic">
                            By registering you agree to the{" "}
                            <Link
                              href="#"
                              className="text-primary text-decoration-underline fst-normal fw-medium"
                            >
                              Alpha Software Terms of Use
                            </Link>
                          </p>
                        </div>
                        <div className="mt-4">
                          <Button
                            color="danger"
                            className="w-100"
                            type="submit"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Spinner size="sm" className="me-2" />
                            ) : (
                              "Sign Up"
                            )}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account ?{" "}
                    <Link
                      href="/auth/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Sign in{" "}
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

export default Register;
