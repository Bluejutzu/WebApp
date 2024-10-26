"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const IS_DEV = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";

const AxiosComponent = () => {
    const [res, setRes] = useState(null);

    const handleOnClick = () => {

        const BASE_URL = IS_DEV ? "http://localhost:3000" : "https://denonextapp.deno.dev/";

        axios
            .get(BASE_URL + "/api")
            .then(response => {
                setRes(response.data)
                console.log(response.data);
            })
            .catch(error => {
                setRes(error.message)
                console.log(error.message);
            });
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Button onClick={handleOnClick}>Send API Request</Button>
            <div>{res ? res : "No response yet"}</div>
        </div>
    );
};

export default AxiosComponent;
