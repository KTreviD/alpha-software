import React from "react";
import Link from "next/link";
import { Col, Row } from "reactstrap";

interface FolderBreadcrumbProps {
  path: { id: string | null; name: string }[];
  onNavigate: (folderId: string | null) => void;
}

const FolderBreadcrumb = ({ path, onNavigate }: FolderBreadcrumbProps) => {
  return (
    <Row>
      <Col xs={12}>
        <div className="d-sm-flex align-items-center justify-content-between">
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {path.map((folder, index) => (
                <li
                  key={folder.id ?? "root"}
                  className={`breadcrumb-item ${index === path.length - 1 ? "active" : ""}`}
                >
                  {index === path.length - 1 ? (
                    folder.name
                  ) : (
                    <Link
                      href="#"
                      onClick={e => {
                        e.preventDefault();
                        onNavigate(folder.id);
                      }}
                    >
                      {folder.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default FolderBreadcrumb;
