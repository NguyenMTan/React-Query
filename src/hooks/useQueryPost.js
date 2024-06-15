import React from "react";
import * as Services from "../services/index";
import { useQuery } from "@tanstack/react-query";

const fetchAllPost = async (id, { signal }) => {
    const res = await Services.getDetailsPost(id, { signal });

    return res.data;
};

export const useQueryPost = (id, { ...rests }) => {
    return useQuery(["post", id], () => fetchAllPost(id), rests);
};
