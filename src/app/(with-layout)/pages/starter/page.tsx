// Only render the SDK on the client side.
"use client";

import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";

const Starter = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let cleanup = () => {};

    (async () => {
      const NutrientViewer = (await import("@nutrient-sdk/viewer")).default;

      // Ensure there's only one `NutrientViewer` instance.
      NutrientViewer.unload(container);

      if (container && NutrientViewer) {
        NutrientViewer.load({
          container,
          useCDN: true,
          document: "https://www.nutrient.io/downloads/nutrient-web-demo.pdf",
        });
      }

      cleanup = () => {
        NutrientViewer.unload(container);
      };
    })();

    return cleanup;
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Starter" pageTitle="Pages" />
          <Row>
            <Col xs={12}>
              <div
                ref={containerRef}
                style={{
                  height: "100vh",
                  width: "100%",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Starter;
