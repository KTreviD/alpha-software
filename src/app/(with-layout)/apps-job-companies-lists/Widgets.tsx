import React from "react";
import CountUp from "react-countup";
import { Card, CardBody, Col } from "reactstrap";

const companiesWidgets = [
  {
    id: 1,
    title: "Earnings this month",
    counter: 5.47,
    arrowIcon: "ri-arrow-up-line",
    percentage: "17.32 %",
    percentageClass: "success",
    icon: "ri-ticket-2-line",
    decimals: 2,
    prefix: "",
    suffix: "k",
  },
  {
    id: 2,
    title: "Pending Tickets",
    counter: 29,
    arrowIcon: "ri-arrow-down-line",
    percentage: "7 %",
    percentageClass: "danger",
    icon: "mdi mdi-timer-sand",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 3,
    title: "Jobs avaliable this month",
    counter: 917,
    arrowIcon: "ri-arrow-down-line",
    percentage: "4.87 %",
    percentageClass: "success",
    icon: "ri-shopping-bag-line",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
  {
    id: 4,
    title: "Deleted Companies",
    counter: 3,
    arrowIcon: "ri-arrow-up-line",
    percentage: "30 %",
    percentageClass: "danger",
    icon: "ri-delete-bin-line",
    decimals: 0,
    prefix: "",
    suffix: "",
  },
];

const Widgets = () => {
  return (
    <React.Fragment>
      {(companiesWidgets || []).map((item, key) => (
        <Col xxl={3} sm={6} key={key}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="fw-medium text-muted mb-0">{item.title}</p>
                  <h2 className="mt-4 ff-secondary fw-semibold">
                    <span className="counter-value" data-target="547">
                      <CountUp
                        start={0}
                        end={item.counter}
                        duration={3}
                        suffix={item.suffix}
                        prefix={item.prefix}
                        decimals={item.decimals}
                      />
                    </span>
                  </h2>
                  <p className="mb-0 text-muted">
                    <span
                      className={
                        "badge bg-" +
                        item.percentageClass +
                        "-subtle text-" +
                        item.percentageClass +
                        " mb-0"
                      }
                    >
                      <i className={item.arrowIcon + " align-middle"}></i>{" "}
                      {item.percentage}
                    </span>{" "}
                    vs. previous month
                  </p>
                </div>
                <div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-info-subtle text-info rounded-circle fs-4">
                      <i className={item.icon}></i>
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default Widgets;
