import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import { accessToken, nodeApiToken } from "../jwt-token-access/accessToken";

import {
  calenderDefaultCategories,
  events,
  defaultevent,
  messages,
  chatMessage,
  projectList,
  sellersList,
  transactions,
  CryptoOrders,
  deals,
  mailbox,
  allData,
  monthData,
  halfyearData,
  allaudiencesMetricsData,
  monthaudiencesMetricsData,
  halfyearaudiencesMetricsData,
  yaeraudiencesMetricsData,
  todayDeviceData,
  lastWeekDeviceData,
  lastMonthDeviceData,
  currentYearDeviceData,
  btcPortfolioData,
  usdPortfolioData,
  euroPortfolioData,
  MarketGraphAll,
  MarketGraphYear,
  MarketGraphMonth,
  MarketGraphWeek,
  MarketGraphHour,
  todayaudiencesCountryData,
  lastWeekaudiencesCountryData,
  lastMonthaudiencesCountryData,
  currentyearaudiencesCountryData,
  team,
  jobApplication,
  folderList,
  recentFile,
  todoTaskList,
  todoCollapse,
  apiKey,
  applicationsStatisticData,
  customerList,
  orders,
  productsData,
  ticketsTable,
  allTask,
  jobCandidates,
  jobCategories,
  leads,
  companies,
  crmcontacts,
  tasklist,
} from "@components/Common/data";

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost("/post-jwt-register").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    users.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      usr => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const validUserObj = { ...validUser[0], ...tokenObj }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/post-jwt-profile").reply((config: any) => {
    const user = JSON.parse(config["data"]);

    const one = config.headers;

    let finalToken = one.Authorization;

    const validUser = users.filter(usr => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex;

            //Find index of specific object using findIndex method.
            objIndex = users.findIndex(obj => obj.uid === user.idx);

            //Update object's name property.
            users[objIndex].username = user.username;

            // Assign a value to locastorage
            sessionStorage.removeItem("authUser");
            sessionStorage.setItem("authUser", JSON.stringify(users[objIndex]));

            resolve([200, "Profile Updated Successfully"]);
          } else {
            reject([400, "Something wrong for edit profile"]);
          }
        } else {
          reject([400, "Invalid Token !!"]);
        }
      });
    });
  });

  mock.onPost("/social-login").reply((config: any) => {
    const user = JSON.parse(config["data"]);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.token) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;
          const first_name = user.name;
          const nodeapiToken = nodeApiToken;
          delete user.name;

          // JWT AccessToken
          const tokenObj = { accessToken: token, first_name: first_name }; // Token Obj
          const validUserObj = {
            token: nodeapiToken,
            data: { ...tokenObj, ...user },
          }; // validUser Obj
          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  // Calendar
  mock.onGet(url.GET_EVENTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (events) {
          // Passing fake JSON data as response
          const data = [...events, ...defaultevent];
          resolve([200, data]);
        } else {
          reject([400, "Cannot get events"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CATEGORIES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (calenderDefaultCategories) {
          // Passing fake JSON data as response
          resolve([200, calenderDefaultCategories]);
        } else {
          reject([400, "Cannot get categories"]);
        }
      });
    });
  });

  mock.onGet(url.GET_UPCOMMINGEVENT).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (defaultevent) {
          const data = [...defaultevent, ...events];
          // Passing fake JSON data as response
          resolve([200, data]);
        } else {
          reject([400, "Cannot get upcomming events"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_EVENT).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot add event"]);
        }
      });
    });
  });

  // crm companies

  mock.onPost(url.ADD_NEW_COMPANIES).reply(company => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (company && company.data) {
          // Passing fake JSON data as response
          resolve([200, company.data]);
        } else {
          reject([400, "Cannot add company"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_EVENT).reply(event => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_EVENT).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  // Chat
  mock.onGet(url.GET_DIRECT_CONTACT).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (chatMessage) {
          // Passing fake JSON data as response
          resolve([200, chatMessage]);
        } else {
          reject([400, "Cannot get direct contact"]);
        }
      });
    });
  });

  mock.onGet(new RegExp(`${url.GET_MESSAGES}/*`)).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (messages) {
          // Passing fake JSON data as response
          const { params } = config;
          const filteredMessages = messages.filter(
            msg => msg.roomId === params.roomId
          );

          resolve([200, filteredMessages]);
        } else {
          reject([400, "Cannot get messages"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_MESSAGE).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config.data) {
          // Passing fake JSON data as response
          resolve([200, config.data]);
        } else {
          reject([400, "Cannot add message"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MESSAGE).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.message]);
        } else {
          reject([400, "Cannot delete message"]);
        }
      });
    });
  });

  // Project > List
  mock.onGet(url.GET_PROJECT_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (projectList) {
          // Passing fake JSON data as response
          resolve([200, projectList]);
        } else {
          reject([400, "Cannot get project list data"]);
        }
      });
    });
  });

  // MailBox
  mock.onGet(url.GET_MAIL_DETAILS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mailbox) {
          // Passing fake JSON data as response
          resolve([200, mailbox]);
        } else {
          reject([400, "Cannot get mail details"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MAIL).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Cannot delete order"]);
        }
      });
    });
  });

  mock.onDelete(url.UNREAD_MAIL).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Cannot Stared Mail"]);
        }
      });
    });
  });

  mock.onDelete(url.STARED_MAIL).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Cannot Stared Mail"]);
        }
      });
    });
  });

  mock.onDelete(url.LABEL_MAIL).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Try Sometime Later"]);
        }
      });
    });
  });

  mock.onDelete(url.TRASH_MAIL).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.forId]);
        } else {
          reject([400, "Cannot Trash Mail"]);
        }
      });
    });
  });

  // Ecommerce > Seller
  mock.onGet(url.GET_SELLERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (sellersList) {
          // Passing fake JSON data as response
          resolve([200, sellersList]);
        } else {
          reject([400, "Cannot get sellers"]);
        }
      });
    });
  });

  // Crypto > Transaction
  mock.onGet(url.GET_TRANSACTION_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (transactions) {
          // Passing fake JSON data as response
          resolve([200, transactions]);
        } else {
          reject([400, "Cannot get Transactions Data"]);
        }
      });
    });
  });

  // Crypto > Orders
  mock.onGet(url.GET_ORDRER_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (CryptoOrders) {
          // Passing fake JSON data as response
          resolve([200, CryptoOrders]);
        } else {
          reject([400, "Cannot get Order Data"]);
        }
      });
    });
  });

  // CRM > Deals
  mock.onGet(url.GET_DEALS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (deals) {
          // Passing fake JSON data as response
          resolve([200, deals]);
        } else {
          reject([400, "Cannot get Deals"]);
        }
      });
    });
  });

  // Dashborad Analytics
  // Sessions by Countries

  mock.onGet(url.GET_ALL_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (allData) {
          // Passing fake JSON data as response
          resolve([200, allData]);
        } else {
          reject([400, "Cannot get All Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_MONTHLY_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (monthData) {
          // Passing fake JSON data as response
          resolve([200, monthData]);
        } else {
          reject([400, "Cannot get Monthly Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_HALFYEARLY_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (halfyearData) {
          // Passing fake JSON data as response
          resolve([200, halfyearData]);
        } else {
          reject([400, "Cannot get Half Yealy Chart Data"]);
        }
      });
    });
  });

  // Audiences Metrics
  mock.onGet(url.GET_ALLAUDIENCESMETRICS_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (allaudiencesMetricsData) {
          // Passing fake JSON data as response
          resolve([200, allaudiencesMetricsData]);
        } else {
          reject([400, "Cannot get All Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_MONTHLYAUDIENCESMETRICS_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (monthaudiencesMetricsData) {
          // Passing fake JSON data as response
          resolve([200, monthaudiencesMetricsData]);
        } else {
          reject([400, "Cannot get Monthly Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_HALFYEARLYAUDIENCESMETRICS_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (halfyearaudiencesMetricsData) {
          // Passing fake JSON data as response
          resolve([200, halfyearaudiencesMetricsData]);
        } else {
          reject([400, "Cannot get Half Yealy Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_YEARLYAUDIENCESMETRICS_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (yaeraudiencesMetricsData) {
          // Passing fake JSON data as response
          resolve([200, yaeraudiencesMetricsData]);
        } else {
          reject([400, "Cannot get Yealy Chart Data"]);
        }
      });
    });
  });

  // Users by Device
  mock.onGet(url.GET_TODAYDEVICE_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todayDeviceData) {
          // Passing fake JSON data as response
          resolve([200, todayDeviceData]);
        } else {
          reject([400, "Cannot get Today Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_LASTWEEKDEVICE_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (lastWeekDeviceData) {
          // Passing fake JSON data as response
          resolve([200, lastWeekDeviceData]);
        } else {
          reject([400, "Cannot get Last Weekly Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_LASTMONTHDEVICE_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (lastMonthDeviceData) {
          // Passing fake JSON data as response
          resolve([200, lastMonthDeviceData]);
        } else {
          reject([400, "Cannot get Last Montly Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CURRENTYEARDEVICE_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentYearDeviceData) {
          // Passing fake JSON data as response
          resolve([200, currentYearDeviceData]);
        } else {
          reject([400, "Cannot get Current Yealy Chart Data"]);
        }
      });
    });
  });

  // Audiences Sessions by Country

  mock.onGet(url.GET_TODAYSESSION_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todayaudiencesCountryData) {
          // Passing fake JSON data as response
          resolve([200, todayaudiencesCountryData]);
        } else {
          reject([400, "Cannot get Today Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_LASTWEEKSESSION_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (lastWeekaudiencesCountryData) {
          // Passing fake JSON data as response
          resolve([200, lastWeekaudiencesCountryData]);
        } else {
          reject([400, "Cannot get Last Weekly Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_LASTMONTHSESSION_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (lastMonthaudiencesCountryData) {
          // Passing fake JSON data as response
          resolve([200, lastMonthaudiencesCountryData]);
        } else {
          reject([400, "Cannot get Last Montly Chart Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CURRENTYEARSESSION_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentyearaudiencesCountryData) {
          // Passing fake JSON data as response
          resolve([200, currentyearaudiencesCountryData]);
        } else {
          reject([400, "Cannot get Current Yealy Chart Data"]);
        }
      });
    });
  });

  // Applications Statistic
  mock
    .onGet(new RegExp(`${url.GET_APPLICTION_DATA}/*`))
    .reply((config: any) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (applicationsStatisticData) {
            // Passing fake JSON data as response
            const { params } = config;
            const filteredMessages: any = applicationsStatisticData.filter(
              msg => msg.id === params.roomId
            );
            const data = filteredMessages.map(
              (item: any) => item[params.roomId]
            );
            resolve([200, data[0]]);
          } else {
            reject([400, "Cannot get messages"]);
          }
        });
      });
    });

  // Dashboard Crypto
  // Portfolio
  mock.onGet(url.GET_BTCPORTFOLIO_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (btcPortfolioData) {
          // Passing fake JSON data as response
          resolve([200, btcPortfolioData]);
        } else {
          reject([400, "Cannot get BTC Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_USDPORTFOLIO_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (usdPortfolioData) {
          // Passing fake JSON data as response
          resolve([200, usdPortfolioData]);
        } else {
          reject([400, "Cannot get USD Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_EUROPORTFOLIO_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (euroPortfolioData) {
          // Passing fake JSON data as response
          resolve([200, euroPortfolioData]);
        } else {
          reject([400, "Cannot get EURO Data"]);
        }
      });
    });
  });

  // Market Graph
  mock.onGet(url.GET_ALLMARKETDATA_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MarketGraphAll) {
          // Passing fake JSON data as response
          resolve([200, MarketGraphAll]);
        } else {
          reject([400, "Cannot get All Market Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_YEARMARKET_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MarketGraphYear) {
          // Passing fake JSON data as response
          resolve([200, MarketGraphYear]);
        } else {
          reject([400, "Cannot get Year Market Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_MONTHMARKET_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MarketGraphMonth) {
          // Passing fake JSON data as response
          resolve([200, MarketGraphMonth]);
        } else {
          reject([400, "Cannot get Month Market Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_WEEKMARKET_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MarketGraphWeek) {
          // Passing fake JSON data as response
          resolve([200, MarketGraphWeek]);
        } else {
          reject([400, "Cannot get Week Market Data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_HOURMARKET_DATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (MarketGraphHour) {
          // Passing fake JSON data as response
          resolve([200, MarketGraphHour]);
        } else {
          reject([400, "Cannot get Hour Market Data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_PROJECT).reply(project => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot add project"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_PROJECT).reply(project => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot update project"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_PROJECT).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.project]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  mock.onGet(url.GET_TEAMDATA).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (team) {
          // Passing fake JSON data as response
          resolve([200, team]);
        } else {
          reject([400, "Cannot get team data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TEAMDATA).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.team]);
        } else {
          reject([400, "Cannot delete team data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TEAMDATA).reply(team => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (team && team.data) {
          // Passing fake JSON data as response
          resolve([200, team.data]);
        } else {
          reject([400, "Cannot add team data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TEAMDATA).reply(team => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (team && team.data) {
          // Passing fake JSON data as response
          resolve([200, team.data]);
        } else {
          reject([400, "Cannot update team data"]);
        }
      });
    });
  });

  // Ecommerce

  // Product
  mock.onGet(url.GET_PRODUCTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (productsData) {
          // Passing fake JSON data as response
          resolve([200, productsData]);
        } else {
          reject([400, "Cannot get order Data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_PRODUCT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot add event"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_PRODUCT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_PRODUCT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_PRODUCT).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          resolve([200, config.headers.data]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  //ecommerce / orders
  mock.onGet(url.GET_ORDERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (orders) {
          // Passing fake JSON data as response
          resolve([200, orders]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_ORDER).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_ORDER).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_ORDER).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_ORDER).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  // Ecommerce / Customer
  mock.onGet(url.GET_CUSTOMERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (customerList) {
          // Passing fake JSON data as response
          resolve([200, customerList]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CUSTOMER).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CUSTOMER).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_CUSTOMER).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_CUSTOMER).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });
  //  Tasks List
  mock.onGet(url.GET_TASK_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (allTask) {
          // Passing fake JSON data as response
          resolve([200, allTask]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TASK).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TASK).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TASK).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_TASK).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  // Kanban Board
  mock.onGet(url.GET_TASKS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (tasklist) {
          // Passing fake JSON data as response
          resolve([200, tasklist]);
        } else {
          reject([400, "Cannot get tasks"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_TASKS).reply(user => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot add user"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TASKS).reply(user => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot update user"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TASKS).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.card]);
        } else {
          reject([400, "Cannot delete users"]);
        }
      });
    });
  });

  // Support Ticket

  mock.onGet(url.GET_TICKETS_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (ticketsTable) {
          // Passing fake JSON data as response
          resolve([200, ticketsTable]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TICKET).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TICKET).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TICKET).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_TICKET).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  // candidate list
  mock.onGet(url.GET_CANDIDATE).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobCandidates) {
          // Passing fake JSON data as response
          resolve([200, jobCandidates]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CANDIDATE).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CANDIDATE).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_CANDIDATE).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  // Grid

  mock.onGet(url.GET_CANDIDATE_GRID).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobCandidates) {
          // Passing fake JSON data as response
          resolve([200, jobCandidates]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_CANDIDATE_GRID).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  // category
  mock.onGet(url.GET_CATEGORY_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobCategories) {
          // Passing fake JSON data as response
          resolve([200, jobCategories]);
        } else {
          reject([400, "Cannot get Application Data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_CATEGORY_LIST).reply(project => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot add Project data"]);
        }
      });
    });
  });

  // Crm Contact
  mock.onGet(url.GET_CONTACTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (crmcontacts) {
          // Passing fake JSON data as response
          resolve([200, crmcontacts]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CONTACT).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_CONTACT).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_CONTACT).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_CONTACT).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  // Crm Companies
  mock.onGet(url.GET_COMPANIES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (companies) {
          // Passing fake JSON data as response
          resolve([200, companies]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_COMPANIES).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_COMPANIES).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_COMPANIES).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_COMPANIES).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  // Crm Leads
  mock.onGet(url.GET_LEADS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (leads) {
          // Passing fake JSON data as response
          resolve([200, leads]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_LEAD).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_LEAD).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_LEAD).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  mock.onPatch(url.UPDATE_LEAD).reply((event: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  // File Manager
  // Folder
  mock.onGet(url.GET_FOLDERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (folderList) {
          // Passing fake JSON data as response
          resolve([200, folderList]);
        } else {
          reject([400, "Cannot get folder data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_FOLDER).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.folder]);
        } else {
          reject([400, "Cannot delete folder data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_FOLDER).reply(folder => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (folder && folder.data) {
          // Passing fake JSON data as response
          resolve([200, folder.data]);
        } else {
          reject([400, "Cannot add folder data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_FOLDER).reply(folder => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (folder && folder.data) {
          // Passing fake JSON data as response
          resolve([200, folder.data]);
        } else {
          reject([400, "Cannot update folder data"]);
        }
      });
    });
  });

  // File
  mock.onGet(url.GET_FILES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (recentFile) {
          // Passing fake JSON data as response
          resolve([200, recentFile]);
        } else {
          reject([400, "Cannot get file data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_FILE).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.file]);
        } else {
          reject([400, "Cannot delete file data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_FILE).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot add file data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_FILE).reply(file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (file && file.data) {
          // Passing fake JSON data as response
          resolve([200, file.data]);
        } else {
          reject([400, "Cannot update file data"]);
        }
      });
    });
  });

  // To do
  mock.onGet(url.GET_TODOS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todoTaskList) {
          // Passing fake JSON data as response
          resolve([200, todoTaskList]);
        } else {
          reject([400, "Cannot get To do data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_TODO).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.todo]);
        } else {
          reject([400, "Cannot delete To do data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TODO).reply(todo => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todo && todo.data) {
          // Passing fake JSON data as response
          resolve([200, todo.data]);
        } else {
          reject([400, "Cannot add To do data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_TODO).reply(todo => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todo && todo.data) {
          // Passing fake JSON data as response
          resolve([200, todo.data]);
        } else {
          reject([400, "Cannot update To do data"]);
        }
      });
    });
  });

  mock.onGet(url.GET_PROJECTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todoCollapse) {
          // Passing fake JSON data as response
          resolve([200, todoCollapse]);
        } else {
          reject([400, "Cannot get Project data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_TODO_PROJECT).reply(project => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (project && project.data) {
          // Passing fake JSON data as response
          resolve([200, project.data]);
        } else {
          reject([400, "Cannot add Project data"]);
        }
      });
    });
  });

  //JOBS
  mock.onGet(url.GET_APPLICATION_LIST).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (jobApplication) {
          // Passing fake JSON data as response
          resolve([200, jobApplication]);
        } else {
          reject([400, "Cannot get Application Data"]);
        }
      });
    });
  });

  mock.onPost(url.ADD_NEW_APPLICATION_LIST).reply(job => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (job && job.data) {
          // Passing fake JSON data as response
          resolve([200, job.data]);
        } else {
          reject([400, "Cannot add Job Application data"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_APPLICATION_LIST).reply(job => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (job && job.data) {
          // Passing fake JSON data as response
          resolve([200, job.data]);
        } else {
          reject([400, "Cannot update Job Application data"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_APPLICATION_LIST).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.job]);
        } else {
          reject([400, "Cannot delete Job Application data"]);
        }
      });
    });
  });

  // Invoice
  mock.onDelete(url.DELETE_INVOICE).reply((config: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          resolve([200, config.headers.invoice]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });
};

export default fakeBackend;
