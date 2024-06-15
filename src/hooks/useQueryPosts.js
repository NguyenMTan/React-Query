import React from "react";
import * as Services from "../services/index";
import { useQuery } from "@tanstack/react-query";

const fetchAllPost = async () => {
    const res = await Services.getAllPosts();

    return res.data;
};

export const useQueryPosts = ({ ...rests }) => {
    return useQuery(["posts"], () => fetchAllPost(), rests);
};
