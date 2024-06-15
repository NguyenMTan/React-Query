import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import * as Services from "../services/index";

const HomePage = () => {
    const queryClient = useQueryClient();

    const fetchAllPost = async () => {
        const res = await Services.getAllPosts();

        return res.data;
    };

    useEffect(() => {
        queryClient.prefetchQuery(["posts"], fetchAllPost);
    }, []);

    const handleClearCache = () => {
        queryClient.removeQueries();
    };

    return (
        <div>
            <h1>HomePage</h1>
            <button onClick={handleClearCache}>Clear cache</button>
        </div>
    );
};

export default HomePage;
