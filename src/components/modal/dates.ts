import dayjs from "dayjs";
export const completeEnglishMonthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const completeMonthLabels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
import quarterOfYear from "dayjs/plugin/quarterOfYear";
export const DATEFILTER_TYPES = Object.freeze({
  TOTAL: "total",
  YEAR: "year",
  QUARTER: "quarter",
  MONTH: "month",
  DATE: "date",
});
dayjs.extend(quarterOfYear);

export type DateFilterT = "month" | "quarter" | "year" | "total";

export const addMonthsToDateString = (
  date: string,
  numMonths: number
): string => {
  // Convert the input date string to a Date object
  const yearInt: number = parseInt(date.substring(0, 4));
  const monthInt: number = parseInt(date.substring(5, 7)) - 1;
  const dayInt: number = parseInt(date.substring(8, 10));
  const dateX = new Date(yearInt, monthInt, dayInt);

  // Add the specified number of months to the date
  dateX.setMonth(dateX.getMonth() + numMonths);
  dateX.setDate(dateX.getDate() - 1); // subtract one day from the date

  // Extract the year, month, and day components of the resulting date
  const year = dateX.getFullYear();
  const month = dateX.getMonth() + 1; // Note: JavaScript Date months are 0-indexed
  const day = dateX.getDate();

  // Pad the month and day components with leading zeros if necessary
  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");

  return `${year}-${paddedMonth}-${paddedDay}`;
};

export const setEndDate = (startDate: Date, type: DateFilterT) => {
  switch (type) {
    case DATEFILTER_TYPES.YEAR:
      return dayjs(startDate).endOf("year").format("YYYY-MM-DD");
    case DATEFILTER_TYPES.QUARTER:
      return dayjs(startDate).endOf("quarter").format("YYYY-MM-DD");
    case DATEFILTER_TYPES.MONTH:
      return dayjs(startDate).endOf("month").format("YYYY-MM-DD");
    case DATEFILTER_TYPES.TOTAL:
      return dayjs().format("YYYY-MM-DD");
  }
};

export const standardDateFormat = "YYYY-MM-DD";

export const addMonthsToDate = (date: Date, numMonths: number): string => {
  const dateString = transformDateToYYYYmidMMmidDD(date);

  // Convert the input date string to a Date object
  const yearInt: number = parseInt(dateString.substring(0, 4));
  const monthInt: number = parseInt(dateString.substring(5, 7)) - 1;
  const dayInt: number = parseInt(dateString.substring(8, 10));
  const dateX = new Date(yearInt, monthInt, dayInt);

  // Add the specified number of months to the date
  dateX.setMonth(dateX.getMonth() + numMonths);
  dateX.setDate(dateX.getDate() - 1); // subtract one day from the date

  // Extract the year, month, and day components of the resulting date
  const year = dateX.getFullYear();
  const month = dateX.getMonth() + 1; // Note: JavaScript Date months are 0-indexed
  const day = dateX.getDate();

  // Pad the month and day components with leading zeros if necessary
  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");

  return `${year}-${paddedMonth}-${paddedDay}`;
};

// '2023-03-15' ===> 'Mar 2023'
export const dateToMMMYY = (dateString: string): string => {
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const date = new Date(dateString);
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return months[monthIndex] + " " + year;
};

// '2023-03-15' ===> 'Marzo 2023'
export const dateToCompleteMMMYY = (dateString: string): string => {
  const monthIndex = Number(dateString.substring(5, 7)) - 1;
  const year = dateString.substring(0, 4);

  return completeMonthLabels[monthIndex] + " " + year;
};

export const getDays = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
};

export const getCurrentDateInYYYYmidMMmidDD = (): string => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth() + 1; // Add 1 because getMonth() returns 0-indexed values (i.e., January is 0)
  const day: number = today.getDate();

  // Add leading zeros to month and day if necessary
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};

export const transformDateToYYYYmidMMmidDD = (date: Date): string => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1; // Add 1 because getMonth() returns 0-indexed values (i.e., January is 0)
  const day: number = date.getDate();

  // Add leading zeros to month and day if necessary
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
};

export const daysDifference = (initialDate: Date, finalDate: Date) => {
  const milisecondsDiferens = finalDate.getTime() - initialDate.getTime();

  return Math.floor(milisecondsDiferens / (1000 * 60 * 60 * 24));
};

export const getInvestorDate = (date: string) => {
  const month = completeEnglishMonthLabels[Number(date.substring(5, 7)) - 1];
  const newDate = `${date.substring(8, 10)}/${month}/${date.substring(0, 4)}`;

  return newDate;
};
export const getMonthIndexInQuarter = (month: string): number => {
  const quarters = [
    ["01", "02", "03"],
    ["04", "05", "06"],
    ["07", "08", "09"],
    ["10", "11", "12"],
  ];

  for (let i = 0; i < quarters.length; i++) {
    if (quarters[i].includes(month)) {
      return quarters[i].indexOf(month);
    }
  }

  throw new Error(
    "Invalid month format. Please provide a valid month (e.g., '01' for January)."
  );
};

export const pickerToYYYYMMDD = (date: any) => {
  const isValid = date ? String(date["$d"]) !== "Invalid Date" : false;
  const value = isValid ? date.toISOString().split("T")[0] : null;

  return value;
};

export const pickerToYYYYMMFirst = (date: any) => {
  const isValid = date ? String(date["$d"]) !== "Invalid Date" : false;
  const value = isValid ? date.toISOString().split("T")[0] : null;

  return `${value.substring(0, 7)}-01`;
};

export const pickerToYYYYMMLast = (date: any) => {
  const isValid = date ? String(date["$d"]) !== "Invalid Date" : false;
  let value = null;

  if (isValid) {
    const newDate = date.toISOString();
    const year = Number(newDate.substring(0, 4));
    const month = Number(newDate.substring(5, 7));
    const lastDay = new Date(year, month, 0).getDate();
    value = `${year}-${month.toString().padStart(2, "0")}-${lastDay
      .toString()
      .padStart(2, "0")}`;
  }

  return value;
};

export const dateToMonthYearString = (date: string): string => {
  const month = completeMonthLabels[Number(date.substring(5, 7)) - 1];
  const year = date.substring(0, 4);

  return `${month} ${year}`;
};

export const formatDateAMPM = (dateString: string): string => {
  const date = new Date(dateString);

  const datePart = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return `${datePart} - ${timePart}`;
};
