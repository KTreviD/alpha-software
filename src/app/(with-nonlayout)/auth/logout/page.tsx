"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "src/slices/user";
import { usePostLogoutMutation } from "src/slices/api/apiSlice";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import Link from "next/link";
import ParticlesAuth from "../ParticlesAuth";

const logoAlpha = "/images/icon-alpha-software.png";
import Image from "next/image";
import { logoutSession } from "src/slices/session";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutUserPost] = usePostLogoutMutation();

  useEffect(() => {
    const logout = async () => {
      try {
        await logoutUserPost();
        dispatch(logoutUser());
        dispatch(logoutSession());
      } catch (err) {
        console.error(err);
      } finally {
        router.push("/auth/login");
      }
    };

    logout();
  }, [dispatch, logoutUserPost, router]);

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
                    top: "106px",
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
                  style={{ marginTop: "200px" }}
                >
                  <CardBody className=" text-center">
                    <div className="pt-2">
                      <i className="ri-cup-line display-5 text-success"></i>

                      <h5 className="mt-2">You are Logged Out</h5>
                      <p className="text-muted">
                        Thank you for using{" "}
                        <span className="fw-semibold">Alpha Software</span>
                      </p>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    To sign in again go here{" "}
                    <Link
                      href="/auth/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      Sing In
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
