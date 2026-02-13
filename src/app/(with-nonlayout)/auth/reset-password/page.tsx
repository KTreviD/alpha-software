"use client";
import React, { useState } from "react";
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
  usePostResendVerificationEmailMutation,
  usePostResetPasswordMutation,
} from "src/slices/api/apiSlice";
import { VerificationCodeValidType } from "./utils";
import { VerificationCodeStatus } from "../confirm-account/utils";

const logoLight = "/images/icon-alpha-software.png";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const type = VerificationCodeValidType.PASSWORD_RESET;

  const {
    data: dataValid = {},
    isLoading: isLoadingGetVerificationCode,
    isFetching,
  } = useGetIsVerificationCodeValidQuery({
    code: code as string,
    type,
  });
  const { status, userId } = dataValid;

  const [resetPassword, { isLoading, error, data }] =
    usePostResetPasswordMutation();
  const [resendVerificationEmail, { isLoading: isLoadingResendVE }] =
    usePostResendVerificationEmailMutation();
  const [responseResend, setResponseResend] = useState<any>();

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

  const handleResendVerificationEmail = async (e: any) => {
    e.preventDefault();

    try {
      const response = await resendVerificationEmail({ userId, type }); // Envías el código como payload
      setResponseResend(response);
    } catch (error: any) {
      console.log({ error });
      console.error(error);
    }
  };

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

                  {status === VerificationCodeStatus.VALID && (
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
                  )}
                  {status === VerificationCodeStatus.EXPIRED && (
                    <div className="text-center mt-2">
                      <p className="text-muted">
                        Your verification link has expired. Click the button
                        below to receive a new verification email.
                      </p>
                      <button
                        className="btn btn-danger"
                        color="primary"
                        disabled={isLoading}
                        // onClick={handleResendVerificationEmail}
                      >
                        {isLoading ? (
                          <Spinner size="sm" color="light" className="me-2" />
                        ) : (
                          "Resend Verification Email"
                        )}
                      </button>
                      {responseResend && (
                        <>
                          {responseResend?.data?.status === 200 ? (
                            <p className="mt-2 text-success flex items-center justify-center gap-2">
                              Your verification email has been sent
                              successfully!
                            </p>
                          ) : (
                            <p className="mt-2 text-danger flex items-center justify-center gap-2">
                              There was a problem resending your verification
                              email.
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {status === VerificationCodeStatus.NOT_FOUND && (
                    <div className="text-center mt-2">
                      <p className="text-muted">
                        This verification link is invalid or has already been
                        used. If you haven’t confirmed your account yet, please
                        request a new verification email from the registration
                        page or contact support.
                      </p>
                      <Link href="/auth/login" className="btn btn-primary">
                        Go to Login
                      </Link>
                    </div>
                  )}
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
