import React, { useEffect, useState } from "react";
import { useQueryPost } from "../hooks/useQueryPost";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import * as Services from "../services/index";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

const ReactQueryPostDetailsPage = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const { state: users } = useLocation();
    const [inputState, setInputState] = useState({
        title: "",
        body: "",
    });

    const { data, isError, isLoading } = useQueryPost(id, {});

    const fetchDetailsUser = async (idUser, signal) => {
        const res = await Services.getDetailsUser(idUser, signal);
        return res.data;
    };

    const fetchUpdatePost = async (dataUpdate) => {
        const res = await Services.updatePost(
            dataUpdate.id,
            dataUpdate.inputState
        );
        return res.data;
    };

    const queries = useQueries({
        queries: users?.map((i) => {
            return {
                queryKey: ["user", i],
                queryFn: ({ signal }) => fetchDetailsUser(i, signal),
            };
        }),
    });

    const mutationUpdatePost = useMutation(fetchUpdatePost, {
        onSuccess: (postUpdated) => {
            setInputState({
                title: "",
                body: "",
            });
            // queryClient.prefetchQuery(["post", id]);
            queryClient.setQueryData(["post", id], postUpdated);
        },
    });

    const handleOnChangeInput = (e) => {
        const name = e.target.name;
        setInputState({
            ...inputState,
            [name]: e.target.value,
        });
    };

    const handleUpdate = () => {
        mutationUpdatePost.mutate({ id, inputState });
    };

    useEffect(() => {
        queryClient.cancelQueries(["user"]);
        queryClient.cancelQueries(["post", id]);
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <h1>Error</h1>;
    }

    return (
        <div>
            <h1>Title: {data.title}</h1>
            <h2>Body: {data.body}</h2>
            <div>
                <label>Title</label>
                <input
                    value={inputState.title}
                    onChange={handleOnChangeInput}
                    name="title"
                />
            </div>
            <div>
                <label>Body</label>
                <input
                    value={inputState.body}
                    onChange={handleOnChangeInput}
                    name="body"
                />
            </div>
            <button onClick={handleUpdate}>Update</button>
            <div>
                <h2>User seen</h2>
                {queries?.map((i) => {
                    return <h3 key={i?.data?.id}>{i?.data?.name}</h3>;
                })}
            </div>
        </div>
    );
};

export default ReactQueryPostDetailsPage;
