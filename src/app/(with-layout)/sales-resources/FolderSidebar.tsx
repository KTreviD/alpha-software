// components/FolderSidebar.tsx
"use client";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const SimpleBar = dynamic(() => import("simplebar-react"), { ssr: false });

export enum FILTER_FILES {
  FILES = "FILES",
  DELETED_FILES = "DELETED_FILES",
  EMAIL_TEMPLATE = "EMAIL_TEMPLATE",
}

interface FolderSidebarProps {
  filterActive: FILTER_FILES;
  setFilterActive: (f: FILTER_FILES) => void;
}

const FolderSidebar: React.FC<FolderSidebarProps> = ({
  filterActive,
  setFilterActive,
}) => (
  <div className="file-manager-sidebar minimal-border">
    <div className="p-3 d-flex flex-column h-100">
      <h5 className="mb-0 fw-semibold">Sales Resources</h5>
      <SimpleBar className="mt-3 mx-n4 px-4 file-menu-sidebar-scroll">
        <ul className="list-unstyled file-manager-menu">
          <li>
            <Link
              href="#"
              className={filterActive === FILTER_FILES.FILES ? "active" : ""}
              onClick={() => setFilterActive(FILTER_FILES.FILES)}
            >
              <i className="ri-folder-2-line align-bottom me-2" /> Files
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={
                filterActive === FILTER_FILES.DELETED_FILES ? "active" : ""
              }
              onClick={() => setFilterActive(FILTER_FILES.DELETED_FILES)}
            >
              <i className="ri-delete-bin-line align-bottom me-2" /> Deleted
              Files
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={
                filterActive === FILTER_FILES.EMAIL_TEMPLATE ? "active" : ""
              }
              onClick={() => setFilterActive(FILTER_FILES.EMAIL_TEMPLATE)}
            >
              <i className="ri-file-list-2-line align-bottom me-2" /> Email
              Templates
            </Link>
          </li>
        </ul>
      </SimpleBar>
    </div>
  </div>
);

export default FolderSidebar;
