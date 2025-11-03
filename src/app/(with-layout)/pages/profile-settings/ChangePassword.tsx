import React from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import Link from "next/link";
import { useGetAllSessionsQuery } from "src/slices/api/apiSlice";
import { formatSessionDate, getDeviceIcon } from "./utils";

type SessionT = {
  id: number;
  city: string;
  country: string;
  ip: string;
  deviceType: string;
  deviceName: string;
  osName: string;
  createdAt: string;
};

type ChangePasswordI = {
  currentSessionId: number;
};

const ChangePassword = ({ currentSessionId }: ChangePasswordI) => {
  const { data, isLoading, isFetching } = useGetAllSessionsQuery();
  console.log({ data });
  return (
    <React.Fragment>
      <Form>
        <Row className="g-2">
          <Col lg={4}>
            <div>
              <Label htmlFor="oldpasswordInput" className="form-label">
                Old Password*
              </Label>
              <Input
                type="password"
                className="form-control"
                id="oldpasswordInput"
                placeholder="Enter current password"
              />
            </div>
          </Col>

          <Col lg={4}>
            <div>
              <Label htmlFor="newpasswordInput" className="form-label">
                New Password*
              </Label>
              <Input
                type="password"
                className="form-control"
                id="newpasswordInput"
                placeholder="Enter new password"
              />
            </div>
          </Col>

          <Col lg={4}>
            <div>
              <Label htmlFor="confirmpasswordInput" className="form-label">
                Confirm Password*
              </Label>
              <Input
                type="password"
                className="form-control"
                id="confirmpasswordInput"
                placeholder="Confirm password"
              />
            </div>
          </Col>

          <Col lg={12}>
            <div className="text-end">
              <button type="button" className="btn btn-success">
                Change Password
              </button>
            </div>
          </Col>

          <Col lg={12}>
            <div className="mb-3">
              <Link
                href="http://localhost:3000/auth/forgot-password"
                className="link-primary text-decoration-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Forgot Password ?
              </Link>
            </div>
          </Col>
        </Row>
      </Form>

      <div className="mt-4 mb-3 border-bottom pb-2">
        <div className="float-end">
          <Link href="#" className="link-primary">
            All Logout
          </Link>
        </div>
        <h5 className="card-title">Login History</h5>
      </div>

      {data?.sessions.map((session: SessionT) => (
        <div key={session.createdAt} className="d-flex align-items-center mb-3">
          <div className="flex-shrink-0 avatar-sm">
            <div className="avatar-title bg-light text-primary rounded-3 fs-18 material-shadow">
              <i className={getDeviceIcon(session.deviceType)}></i>
            </div>
          </div>
          <div className="flex-grow-1 ms-3">
            <h6>
              {`${session.deviceName} ${session.osName}`}{" "}
              {session.id === currentSessionId && (
                <span className="badge bg-success">This device</span>
              )}
            </h6>
            <p className="text-muted mb-0">
              {`${session.city}, ${session.country} (${session.ip === "127.0.0.1" ? "Localhost Alert" : session.ip}) - ${formatSessionDate(session.createdAt)}`}
            </p>
          </div>
          <div>
            <Link href="#">Logout</Link>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default ChangePassword;
