"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import ParticlesAuth from "../ParticlesAuth";
import {
  useGetIsVerificationCodeValidQuery,
  usePostResetPasswordMutation,
} from "src/slices/api/apiSlice";
import { VerificationCodeValidType } from "./utils";

const logoLight = "/images/icon-alpha-software.png";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const {
    data = {},
    isLoading: isLoadingGetVerificationCode,
    isFetching,
  } = useGetIsVerificationCodeValidQuery({
    code: code as string,
    type: VerificationCodeValidType.PASSWORD_RESET,
  });
  const { status, userId } = data;
  console.log({ status, userId });

  const [resetPassword, { isLoading, error }] = usePostResetPasswordMutation();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please enter your new password"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async values => {
      if (!code) {
        router.replace("/forgot-password");
        return;
      }
      await resetPassword({
        code,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
    },
  });

  return (
    <ParticlesAuth>
      <div className="auth-page-content mt-lg-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div
                className="position-absolute"
                style={{
                  zIndex: 10,
                  top: "4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Link href="/" className="d-inline-block auth-logo">
                  <Image src={logoLight} alt="Logo" height={100} width={100} />
                </Link>
              </div>

              <Card className="mt-5 pt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Reset Password</h5>
                    <p className="text-muted">
                      Set up a new password for your account
                    </p>
                  </div>

                  {data?.message && (
                    <Alert color="success">{data.message}</Alert>
                  )}
                  {error?.data?.message && (
                    <Alert color="danger">{error.data.message}</Alert>
                  )}

                  <Form
                    onSubmit={e => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="mb-4">
                      <Label className="form-label">New Password</Label>
                      <Input
                        name="password"
                        type="password"
                        placeholder="Enter new password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.password || ""}
                        invalid={
                          validation.touched.password &&
                          !!validation.errors.password
                        }
                      />
                      {validation.touched.password &&
                        validation.errors.password && (
                          <FormFeedback>
                            {validation.errors.password}
                          </FormFeedback>
                        )}
                    </div>

                    <div className="mb-4">
                      <Label className="form-label">Confirm Password</Label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.confirmPassword || ""}
                        invalid={
                          validation.touched.confirmPassword &&
                          !!validation.errors.confirmPassword
                        }
                      />
                      {validation.touched.confirmPassword &&
                        validation.errors.confirmPassword && (
                          <FormFeedback>
                            {validation.errors.confirmPassword}
                          </FormFeedback>
                        )}
                    </div>

                    <div className="text-center mt-4">
                      <button className="btn btn-danger w-100" type="submit">
                        {isLoading ? (
                          <Spinner size="sm" className="me-2" />
                        ) : (
                          "Reset Password"
                        )}
                      </button>
                    </div>
                  </Form>

                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Remembered your password?{" "}
                      <Link
                        href="/auth/login"
                        className="fw-semibold text-primary text-decoration-underline"
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
}
