/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const logToServer = async (...value: any[]) => {
    console.log(...value);
};
