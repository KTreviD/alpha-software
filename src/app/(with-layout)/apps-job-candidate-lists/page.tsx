"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Alert,
  Table,
} from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { getCandidateList as onGetCandidateList } from "@slices/thunks";
import AddEditJobCandidateList from "@common/AddEditJobCandidateList";
import Pagination from "@common/Pagination";
import Image from "next/image";

const CandidateList = () => {
  document.title = "Candidate List View | Velzon -  Admin & Dashboard Template";

  const dispatch: any = useDispatch();

  const selectLayoutProperties = createSelector(
    (state: any) => state.Jobs,
    layout => ({
      candidatelist: layout.candidatelist,
    })
  );
  // Inside your component
  const { candidatelist } = useSelector(selectLayoutProperties);

  useEffect(() => {
    dispatch(onGetCandidateList());
  }, [dispatch]);

  const [iscandidate, setCandidate] = useState<any>([]);

  //add modal state
  const [modal, setModal] = useState<boolean>(false);
  const handleAddModal = useCallback(() => {
    setModal(!modal);
    setEditItem(null);
  }, [modal]);
  const handleShow = () => setModal(true);

  const [editItem, setEditItem] = useState<any>();
  useEffect(() => {
    setCandidate(candidatelist);
  }, [dispatch, candidatelist]);

  const [isBookmarkClick, setIsBookmarkClick] = useState<boolean>(false);

  const sortbyname = [
    { label: "All", value: "All" },
    { label: "Today", value: "Today" },
    { label: "Yesterday", value: "Yesterday" },
    { label: "Last 7 Days", value: "Last 7 Days" },
    { label: "Last 30 Days", value: "Last 30 Days" },
    { label: "Thise Month", value: "Thise Month" },
    { label: "Last Year", value: "Last Year" },
  ];

  const [candidateData, setCandidateData] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  //pagination
  const perPageData = 8;
  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;
  const currentdata = useMemo(
    () => iscandidate?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast, iscandidate]
  );

  useEffect(() => {
    setCandidateData(currentdata);
  }, [currentdata]);

  // search
  const handleSearch = (ele: any) => {
    let item = ele.value;

    if (item === "All Tasks") {
      setCandidate([...candidatelist]);
    } else {
      handleSearchData({
        data: candidatelist,
        item: item,
        setState: setCandidate,
      });
    }
  };

  const handleSearchData = ({ data, item, setState }: any) => {
    setState(
      data.filter((search: any) =>
        Object.values(search).some(
          field =>
            typeof field === "string" &&
            field.toLowerCase().includes(item?.toLowerCase())
        )
      )
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="container-fluid">
          <BreadCrumb title="List View" pageTitle="Candidates Lists" />
          <Row>
            <Col xl={6}>
              <h6>Primary Alert</h6>
              <Alert
                color="primary"
                className="alert-label-icon label-arrow material-shadow"
              >
                <i className="ri-user-smile-line label-icon"></i>
                <strong>Primary</strong> - Label icon arrow alert
              </Alert>

              <h6>Secondary Alert</h6>
              <Alert
                color="secondary"
                className="alert-label-icon label-arrow material-shadow"
              >
                <i className="ri-check-double-line label-icon"></i>
                <strong>Secondary</strong> - Label icon arrow alert
              </Alert>

              <h6>Success Alert</h6>
              <Alert
                color="success"
                className="alert-label-icon label-arrow material-shadow"
              >
                <i className="ri-notification-off-line label-icon"></i>
                <strong>Success</strong>- Label icon arrow alert
              </Alert>

              <h6>Danger Alert</h6>
              <Alert
                color="danger"
                className="alert-label-icon label-arrow mb-xl-0 material-shadow"
              >
                <i className="ri-error-warning-line label-icon"></i>
                <strong>Danger</strong>- Label icon arrow alert
              </Alert>
            </Col>

            <Col xl={6}>
              <h6>Warning Alert</h6>
              <Alert
                color="warning"
                className="alert-label-icon label-arrow material-shadow"
              >
                <i className="ri-alert-line label-icon"></i>
                <strong>Warning</strong> - Label icon arrow alert
              </Alert>

              <h6>info Alert</h6>
              <Alert
                color="info"
                className="alert-label-icon label-arrow material-shadow"
              >
                <i className="ri-airplay-line label-icon"></i>
                <strong>Info</strong> - Label icon arrow alert
              </Alert>

              <h6>Light Alert</h6>
              <Alert
                color="light"
                className="alert-label-icon label-arrow material-shadow"
              >
                <i className="ri-mail-line label-icon"></i>
                <strong>Light</strong>- Label icon arrow alert
              </Alert>

              <h6>Dark Alert</h6>
              <Alert
                color="dark"
                className="alert-label-icon label-arrow mb-0 material-shadow"
              >
                <i className="ri-refresh-line label-icon"></i>
                <strong>Dark</strong>- Label icon arrow alert
              </Alert>
            </Col>
          </Row>
          <Row className="row g-4 mb-4">
            <Col className="col-sm">
              <div>
                <Link
                  href="#!"
                  className="btn btn-primary"
                  onClick={handleAddModal}
                >
                  <i className="ri-add-line align-bottom me-1"></i> Add
                  Candidate
                </Link>
              </div>
            </Col>
            <Col className="col-sm">
              <div className="d-md-flex justify-content-sm-end gap-2">
                <div className="search-box ms-md-2 flex-shrink-0 mb-3 mb-md-0">
                  <Input
                    type="text"
                    className="form-control"
                    id="searchJob"
                    autoComplete="off"
                    placeholder="Search for candidate name or designation..."
                    onChange={(e: any) => handleSearch(e.target)}
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>

                <select
                  className="form-control w-md"
                  data-choices
                  data-choices-search-false
                >
                  {sortbyname.map((item: any, key: any) => (
                    <option key={key} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
          </Row>

          <Row className="gy-2 mb-2" id="candidate-list">
            {(candidateData || []).map((item: any, key: any) => (
              <Col className="col-lg-12" key={key}>
                <Card className="card mb-0">
                  <CardBody className="card-body">
                    <div className="d-lg-flex align-items-center">
                      <div className="flex-shrink-0">
                        {item.nickname ? (
                          <div className="avatar-sm rounded">
                            <div className="avatar-title border bg-light text-primary rounded text-uppercase fs-16">
                              {item.nickname}
                            </div>
                          </div>
                        ) : (
                          <div className="avatar-sm rounded h-100">
                            <Image
                              src={item.userImg}
                              alt=""
                              className="member-img img-fluid d-block rounded"
                              width={30}
                              height={30}
                            />
                          </div>
                        )}
                      </div>
                      <div className="ms-3">
                        <Link href="/pages-profile">
                          <h5 className="fs-16 mb-2">{item.candidateName}</h5>
                        </Link>
                        <p className="text-muted mb-0">{item.designation}</p>
                      </div>
                      <div className="d-flex gap-4 mt-0 text-muted mx-auto">
                        <div>
                          <i className="ri-map-pin-2-line text-primary me-1 align-bottom"></i>{" "}
                          {item.location}
                        </div>
                        <div>
                          <i className="ri-time-line text-primary me-1 align-bottom"></i>{" "}
                          {item.type === "Part Time" ? (
                            <span className="badge bg-danger-subtle text-danger">
                              {item.type}
                            </span>
                          ) : item.type === "Full Time" ? (
                            <span className="badge bg-success-subtle text-success">
                              {item.type}
                            </span>
                          ) : (
                            <span className="badge bg-info-subtle text-info">
                              {item.type}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 align-items-center mx-auto">
                        <div className="badge text-bg-success">
                          <i className="mdi mdi-star me-1"></i>
                          {item.rating1}
                        </div>
                        <div className="text-muted">
                          {item.rating2}k Ratings
                        </div>
                      </div>
                      <div>
                        <Link href="#" className="btn btn-soft-success">
                          View Details
                        </Link>
                        <Link
                          href="#"
                          onClick={e => {
                            e.preventDefault();

                            setIsBookmarkClick(!isBookmarkClick);
                          }}
                          className={
                            isBookmarkClick
                              ? "btn btn-ghost-danger btn-icon custom-toggle active"
                              : "btn btn-ghost-danger btn-icon custom-toggle"
                          }
                        >
                          {!isBookmarkClick ? (
                            <span className="icon-on">
                              <i className="ri-bookmark-line align-bottom"></i>
                            </span>
                          ) : (
                            <span className="icon-off">
                              <i className="ri-bookmark-3-fill align-bottom"></i>
                            </span>
                          )}
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <Pagination
            perPageData={perPageData}
            data={iscandidate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <AddEditJobCandidateList
            show={modal}
            editItem={editItem}
            handleShow={handleShow}
            handleClose={handleAddModal}
          />
          <ToastContainer closeButton={false} limit={1} />
        </Container>
        <Col xxl={3}>
          <Card id="company-overview">
            <CardBody>
              <div className="avatar-lg mx-auto mb-3">
                <div className="avatar-title bg-light rounded">
                  <Image
                    src={"images/companies/image-6.png"}
                    alt=""
                    className="avatar-sm company-logo"
                    width={48}
                    height={48}
                  />
                </div>
              </div>

              <div className="text-center">
                <Link href="#!">
                  <h5 className="overview-companyname">Syntyce Solutions</h5>
                </Link>
                <p className="text-muted overview-industryType">
                  IT Department
                </p>

                <ul className="list-inline mb-0">
                  <li className="list-inline-item avatar-xs">
                    <Link
                      href=""
                      className="avatar-title bg-dark-subtle text-body fs-15 rounded"
                    >
                      <i className="ri-global-line"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item avatar-xs">
                    <Link
                      href=""
                      className="avatar-title bg-danger-subtle text-danger fs-15 rounded"
                    >
                      <i className="ri-mail-line"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item avatar-xs">
                    <Link
                      href=""
                      className="avatar-title bg-warning-subtle text-warning fs-15 rounded"
                    >
                      <i className="ri-question-answer-line"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </CardBody>

            <CardBody>
              <h6 className="text-muted text-uppercase fw-semibold mb-3">
                Information
              </h6>
              <p className="text-muted mb-4 overview-companydesc">
                The IT department of NavLink company ensures that the network of
                computers within the organisation are well-connected and
                functioning properly. All the other departments within the
                company rely on them to ensure that their respective functions
                can go on seamlessly.
              </p>

              <div className="table-responsive table-card">
                <Table className="table table-borderless mb-4">
                  <tbody>
                    <tr>
                      <td className="fw-semibold">Industry Type</td>
                      <td className="overview-industryType">
                        Chemical Industries
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Location</td>
                      <td className="overview-company_location">
                        Damascus, Syria
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Employee</td>
                      <td className="overview-employee">10-50</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Vacancy</td>
                      <td className="overview-vacancy">23</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Rating</td>
                      <td>
                        <span className="overview-rating">4.8</span>{" "}
                        <i className="ri-star-fill text-warning align-bottom"></i>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Website</td>
                      <td>
                        <Link
                          href=""
                          className="link-primary text-decoration-underline overview-website"
                        >
                          www.syntycesolution.com
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Contact Email</td>
                      <td className="overview-email">
                        info@syntycesolution.com
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Since</td>
                      <td className="overview-since">1995</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="hstack gap-3">
                <button
                  type="button"
                  className="btn btn-soft-primary custom-toggle w-100 material-shadow-none"
                  data-bs-toggle="button"
                >
                  <span className="icon-on">
                    <i className="ri-add-line align-bottom me-1"></i> Follow
                  </span>
                  <span className="icon-off">
                    <i className="ri-user-unfollow-line align-bottom me-1"></i>{" "}
                    Unfollow
                  </span>
                </button>
                <Link href="#" className="btn btn-info w-100">
                  More View <i className="ri-arrow-right-line align-bottom"></i>
                </Link>
              </div>
            </CardBody>
          </Card>

          <Card className="overflow-hidden shadow-none">
            <CardBody className="bg-danger-subtle">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-danger-subtle text-danger rounded-circle fs-17">
                      <i className="ri-gift-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 ms-2">
                  <h6 className="fs-16 fw-bold">Free trial</h6>
                  <p className="text-muted mb-0">28 days left</p>
                </div>
                <div>
                  <Link href="/pages-pricing" className="btn btn-danger">
                    Upgrade
                  </Link>
                </div>
              </div>
            </CardBody>
            <CardBody className="bg-danger-subtle border-top border-danger border-opacity-25 border-top-dashed">
              <Link
                href="#"
                className="d-flex justify-content-between align-items-center text-body"
              >
                <span>See benefits</span>
                <i className="ri-arrow-right-s-line fs-18"></i>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default CandidateList;
