"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Navdata = () => {
  const router = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const [isApps, setIsApps] = useState<boolean>(false);
  const [isPages, setIsPages] = useState<boolean>(false);

  // Apps
  const [isCalendar, setCalendar] = useState<boolean>(false);
  const [isEmail, setEmail] = useState<boolean>(false);
  const [isSubEmail, setSubEmail] = useState<boolean>(false);
  const [isProjects, setIsProjects] = useState<boolean>(false);
  const [isTasks, setIsTasks] = useState<boolean>(false);
  const [isCRM, setIsCRM] = useState<boolean>(false);
  const [isInvoices, setIsInvoices] = useState<boolean>(false);
  const [isSupportTickets, setIsSupportTickets] = useState<boolean>(false);
  const [isJobs, setIsJobs] = useState<boolean>(false);
  const [isJobList, setIsJobList] = useState<boolean>(false);
  const [isCandidateList, setIsCandidateList] = useState<boolean>(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("sub-items")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach(item => {
        item.classList.remove("active");
        var id = item.getAttribute("sub-items");
        const getID = document.getElementById(id) as HTMLElement;
        if (getID) getID.classList.remove("show");
      });
    }
  }

  const menuItems: any = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e: any) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "job",
          label: "Job",
          link: "/dashboard-job",
          parentId: "dashboard",
          badgeColor: "success",
          badgeName: "New",
        },
      ],
    },
    {
      id: "apps",
      label: "Apps",
      icon: "ri-apps-2-line",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsApps(!isApps);
        setIscurrentState("Apps");
        updateIconSidebar(e);
      },
      stateVariables: isApps,
      subItems: [
        {
          id: "calendar",
          label: "Calendar",
          link: "/#",
          parentId: "apps",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setCalendar(!isCalendar);
          },
          stateVariables: isCalendar,
          childItems: [
            {
              id: 1,
              label: "Main Calendar",
              link: "/apps-calendar",
              parentId: "apps",
            },
            {
              id: 2,
              label: "Month Grid",
              link: "/apps-calendar-month-grid",
              parentId: "apps",
            },
          ],
        },
        {
          id: "chat",
          label: "Chat",
          link: "/apps-chat",
          parentId: "apps",
        },
        {
          id: "appsprojects",
          label: "Projects",
          link: "/#",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsProjects(!isProjects);
          },
          parentId: "apps",
          stateVariables: isProjects,
          childItems: [
            {
              id: 1,
              label: "List",
              link: "/apps-projects-list",
              parentId: "apps",
            },
            {
              id: 2,
              label: "Overview",
              link: "/apps-projects-overview",
              parentId: "apps",
            },
            {
              id: 3,
              label: "Create Project",
              link: "/apps-projects-create",
              parentId: "apps",
            },
          ],
        },
        {
          id: "tasks",
          label: "Tasks",
          link: "/#",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsTasks(!isTasks);
          },
          parentId: "apps",
          stateVariables: isTasks,
          childItems: [
            {
              id: 1,
              label: "Kanban Board",
              link: "/apps-tasks-kanban",
              parentId: "apps",
            },
            {
              id: 2,
              label: "List View",
              link: "/apps-tasks-list-view",
              parentId: "apps",
            },
            {
              id: 3,
              label: "Task Details",
              link: "/apps-tasks-details",
              parentId: "apps",
            },
          ],
        },
        {
          id: "appscrm",
          label: "CRM",
          link: "/#",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsCRM(!isCRM);
          },
          parentId: "apps",
          stateVariables: isCRM,
          childItems: [
            { id: 1, label: "Contacts", link: "/apps-crm-contacts" },
            { id: 2, label: "Companies", link: "/apps-crm-companies" },
            { id: 3, label: "Deals", link: "/apps-crm-deals" },
            { id: 4, label: "Leads", link: "/apps-crm-leads" },
          ],
        },
        {
          id: "invoices",
          label: "Invoices",
          link: "/#",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsInvoices(!isInvoices);
          },
          parentId: "apps",
          stateVariables: isInvoices,
          childItems: [
            { id: 1, label: "List View", link: "/apps-invoices-list" },
            { id: 2, label: "Details", link: "/apps-invoices-details" },
            { id: 3, label: "Create Invoice", link: "/apps-invoices-create" },
          ],
        },
        {
          id: "supportTickets",
          label: "Support Tickets",
          link: "/#",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsSupportTickets(!isSupportTickets);
          },
          parentId: "apps",
          stateVariables: isSupportTickets,
          childItems: [
            { id: 1, label: "List View", link: "/apps-tickets-list" },
            { id: 2, label: "Ticket Details", link: "/apps-tickets-details" },
          ],
        },
        {
          id: "salesResources",
          label: "Sales Resources",
          link: "/sales-resources",
          parentId: "apps",
        },
        {
          id: "todo",
          label: "To Do",
          link: "/apps-todo",
          parentId: "apps",
        },
        {
          id: "job",
          label: "Jobs",
          link: "/#",
          parentId: "apps",
          // badgeName: "New",
          // badgeColor: "success",
          isChildItem: true,
          click: function (e: any) {
            e.preventDefault();
            setIsJobs(!isJobs);
          },
          stateVariables: isJobs,
          childItems: [
            {
              id: 1,
              label: "Statistics",
              link: "/apps-job-statistics",
              parentId: "apps",
            },
            {
              id: 2,
              label: "Job Lists",
              link: "/#",
              parentId: "apps",
              isChildItem: true,
              stateVariables: isJobList,
              click: function (e: any) {
                e.preventDefault();
                setIsJobList(!isJobList);
              },
              childItems: [
                {
                  id: 1,
                  label: "List",
                  link: "/apps-job-lists",
                  parentId: "apps",
                },
                {
                  id: 2,
                  label: "Grid",
                  link: "/apps-job-grid-lists",
                  parentId: "apps",
                },
                {
                  id: 3,
                  label: "Overview",
                  link: "/apps-job-details",
                  parentId: "apps",
                },
              ],
            },
            {
              id: 3,
              label: "Candidate Lists",
              link: "/#",
              parentId: "apps",
              isChildItem: true,
              stateVariables: isCandidateList,
              click: function (e: any) {
                e.preventDefault();
                setIsCandidateList(!isCandidateList);
              },
              childItems: [
                {
                  id: 1,
                  label: "List View",
                  link: "/apps-job-candidate-lists",
                  parentId: "apps",
                },
                {
                  id: 2,
                  label: "Grid View",
                  link: "/apps-job-candidate-grid",
                  parentId: "apps",
                },
              ],
            },
            {
              id: 4,
              label: "Application",
              link: "/apps-job-application",
              parentId: "apps",
            },
            {
              id: 5,
              label: "New Job",
              link: "/apps-job-new",
              parentId: "apps",
            },
            {
              id: 6,
              label: "Job Categories",
              link: "/apps-job-categories",
              parentId: "apps",
            },
            {
              id: 7,
              label: "Companies List",
              link: "/apps-job-companies-lists",
              parentId: "apps",
            },
            {
              id: 8,
              label: "Industries",
              link: "/industries",
              parentId: "apps",
            },
          ],
        },
      ],
    },
    {
      label: "pages",
      isHeader: true,
    },
    {
      id: "pages",
      label: "Pages",
      icon: "ri-pages-line",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },
      stateVariables: isPages,
      subItems: [
        { id: "team", label: "Team", link: "/pages/team", parentId: "pages" },
        {
          id: "timeline",
          label: "Timeline",
          link: "/pages/timeline",
          parentId: "pages",
        },
        { id: "faqs", label: "FAQs", link: "/pages/faqs", parentId: "pages" },
        {
          id: "pricing",
          label: "Pricing",
          link: "/pages/pricing",
          parentId: "pages",
        },
        {
          id: "PrivecyPolicy",
          label: "Privacy Policy",
          link: "/pages/privacy-policy",
          parentId: "pages",
          badgeColor: "success",
          badgeName: "New",
        },
        {
          id: "TermsCondition",
          label: "Terms Condition",
          link: "/pages/terms-condition",
          parentId: "pages",
          // badgeColor: "success", badgeName: "New",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
