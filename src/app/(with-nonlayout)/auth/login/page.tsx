"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Spinner,
} from "reactstrap";
import ParticlesAuth from "../ParticlesAuth";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import Link from "next/link";
import * as Yup from "yup";
import { useFormik } from "formik";

import Image from "next/image";
import { loginUser } from "src/slices/user";
import {
  usePostLoginMutation,
  usePostVerifyTwoFactorCodeMutation,
} from "src/slices/api/apiSlice";
import ModalTwoFactorCode from "./Modal";

const logoAlpha = "/images/icon-alpha-software.png";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [mfaKey, setMfaKey] = useState(0);

  const [loginUserPost, { isLoading: isLoadingLogin }] = usePostLoginMutation();
  const [verifyTwoFactorCode, { isLoading: isLoadingMFA }] =
    usePostVerifyTwoFactorCodeMutation();

  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [modalTwoFactorEmailCode, setModalTwoFactorEmailCode] = useState(true);

  const validation = useFormik<LoginFormValues>({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email Address"),
      pass23word2: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async values => {
      const { user, mfaRequired } = await loginUserPost({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (mfaRequired) {
        setModalTwoFactorEmailCode(true);
        return;
      }

      if (user) {
        dispatch(loginUser(user)); // Guardas el usuario en Redux
      }
      router.push(`/apps-job-companies-lists`);
    },
  });

  return (
    <React.Fragment>
      {modalTwoFactorEmailCode && (
        <ModalTwoFactorCode
          key={mfaKey}
          isOpen={modalTwoFactorEmailCode}
          email={validation.values.email}
          onComplete={async code => {
            try {
              const { user } = await verifyTwoFactorCode({
                code,
                email: validation.values.email,
              }).unwrap();

              if (user) {
                dispatch(loginUser(user)); // Guardas el usuario en Redux
              }

              router.push("/apps-job-companies-lists");
            } catch {
              setMfaKey(k => k + 1);
            }
          }}
        />
      )}
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
                    <Image src={logoAlpha} alt="" height={80} width={80} />
                  </Link>
                </div>
                <Card className="mt-5 card-bg-fill pt-3">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome</h5>
                      <p className="text-muted">
                        Log in to Alpha Software to continue.
                      </p>
                    </div>
                    {/* {error && <Alert color="danger">{error}</Alert>} */}
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={e => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label">
                            Email
                          </Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email address"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              !!validation.errors.email
                            }
                          />
                          {validation.touched.email &&
                            validation.errors.email && (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            )}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link
                              href="/auth/forgot-password"
                              className="text-muted"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <Label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type={passwordShow ? "text" : "password"}
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                !!validation.errors.password
                              }
                            />
                            {validation.touched.password &&
                              validation.errors.password && (
                                <FormFeedback type="invalid">
                                  {validation.errors.password}
                                </FormFeedback>
                              )}
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={() => setPasswordShow(!passwordShow)}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="auth-remember-check"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </Label>
                        </div>

                        <div className="mt-4">
                          <Button
                            color="danger"
                            disabled={isLoadingLogin}
                            className="btn btn-danger w-100"
                            type="submit"
                          >
                            {isLoadingLogin ? (
                              <Spinner size="sm" className="me-2" />
                            ) : (
                              "Sign In"
                            )}
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link
                      href="/auth/register"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Sign up
                    </Link>
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

export default Login;
