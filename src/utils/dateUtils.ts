import { IDob } from "../types/user";

export const MONTHS = [
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

export const getDaysMonths = (dob: IDob) => {
    const dates = [];
    let year = dob.year !== "Year" ? Number(dob.year) : new Date().getFullYear();
    let month = dob.monthIndex !== "Month" ? Number(dob.monthIndex) : new Date().getMonth();
    const date = new Date(year, month, 0).getDate();
    for (let i = 0; i < date; i++) {
        dates.push(i);
    }
    return dates;
};

export const getYearLists = () => {
    const startYear = 1902;
    const yearLists = [];
    const currentYear = new Date().getFullYear();
    for (let i = startYear; i <= currentYear; i++) {
        yearLists.push(i);
    }
    return yearLists.reverse();
};
