"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetIsVerificationCodeValidQuery,
  usePostResendVerificationEmailMutation,
  usePostVerifyEmailMutation,
} from "src/slices/api/apiSlice"; // Usamos RTK
import ParticlesAuth from "../ParticlesAuth";
import { Card, CardBody, Container, Row, Col, Spinner } from "reactstrap";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { loginUser } from "src/slices/user";
import { loginSession } from "src/slices/session";
const logoAlpha = "/images/icon-alpha-software.png";

enum VerificationCodeStatus {
  NOT_FOUND = "NOT_FOUND",
  EXPIRED = "EXPIRED",
  VALID = "VALID",
}

export default function ConfirmAccount() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  // RTK Query Mutation
  const {
    data = {},
    isLoading: isLoadingGetVerificationCode,
    isFetching,
  } = useGetIsVerificationCodeValidQuery({ code: code as string });
  const { status, userId } = data;

  const [verifyEmail, { isLoading: isLoadingPost }] =
    usePostVerifyEmailMutation();
  const [resendVerificationEmail, { isLoading: isLoadingResendVE }] =
    usePostResendVerificationEmailMutation();
  const [responseResend, setResponseResend] = useState<any>();

  const user2 = useAppSelector(state => state);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code) {
      alert("ERROR");
      //   toast({
      //     title: "Error",
      //     description: "Confirmation token not found",
      //     variant: "destructive",
      //   });
      return;
    }

    try {
      const { user, session } = await verifyEmail({ code }).unwrap(); // Envías el código como payload

      if (user) {
        dispatch(loginUser(user)); // Guardas el usuario en Redux
        dispatch(loginSession(session)); // Guardas el usuario en Redux
      }
      router.push(`/apps-job-companies-lists`);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleResendVerificationEmail = async (e: any) => {
    e.preventDefault();

    try {
      const response = await resendVerificationEmail({ userId, code }); // Envías el código como payload
      setResponseResend(response);
    } catch (error: any) {
      console.log({ error });
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <div
                  className="position-absolute mt-5"
                  style={{
                    zIndex: 10,
                    top: "66px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <Link href="/" className="d-inline-block auth-logo">
                    <Image src={logoAlpha} alt="" height={80} width={80} />
                  </Link>
                </div>
                <Card
                  className=" card-bg-fill pt-4"
                  style={{ marginTop: "160px" }}
                >
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Account confirmation</h5>
                    </div>

                    {isFetching ||
                      (isLoadingGetVerificationCode && (
                        <Spinner
                          style={{ width: "3rem", height: "3rem" }}
                          color="danger"
                          className="me-2"
                        />
                      ))}
                    {status === VerificationCodeStatus.VALID && (
                      <div className="text-center ">
                        <p className="text-muted">
                          We're excited to have you get started. First, you need
                          to confirm your account. Just press the button below.
                        </p>
                        <button
                          className="btn btn-danger"
                          color="primary"
                          disabled={isLoadingPost}
                          onClick={handleSubmit}
                        >
                          {isLoadingPost ? (
                            <Spinner size="sm" color="light" className="me-2" />
                          ) : (
                            "Confirm Account"
                          )}
                        </button>
                      </div>
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
                          disabled={
                            isLoadingPost ||
                            responseResend?.data?.status === 200
                          }
                          onClick={handleResendVerificationEmail}
                        >
                          {isLoadingResendVE ? (
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
                          used. If you haven’t confirmed your account yet,
                          please request a new verification email from the
                          registration page or contact support.
                        </p>
                        <Link href="/auth/login" className="btn btn-primary">
                          Go to Login
                        </Link>
                      </div>
                    )}
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    If you have any issue confirming your account please,
                    contact{" "}
                    <Link
                      href="/auth/register"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      support@alpha-so.com
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
}
