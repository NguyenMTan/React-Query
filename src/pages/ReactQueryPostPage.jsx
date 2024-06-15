import React, { useState } from "react";
import Loading from "../components/Loading";
import { useQueryPosts } from "../hooks/useQueryPosts";
import { Link, useNavigate } from "react-router-dom";
import * as Services from "../services/index";
import {
    QueryClient,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

const ReactQueryPostPage = () => {
    const { data: listPost, isError, isLoading } = useQueryPosts({});
    const [inputState, setInputState] = useState({
        title: "",
        body: "",
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const fetchCreatePost = async (data) => {
        const res = await Services.createPost(data);
        return res.data;
    };

    const fetchDeletePost = async (id) => {
        const res = await Services.deletePost(id);
        return res.data;
    };

    const mutationCreatePost = useMutation(fetchCreatePost, {
        onSuccess: () => {
            queryClient.refetchQueries("posts");
            // queryClient.setQueryData("posts", (oldData) => {
            //     return { ...oldData, data: [...oldData.data, newPost] };
            // });
            setInputState({
                title: "",
                body: "",
            });
        },
    });

    const mutationDeletePost = useMutation(fetchDeletePost, {
        onSuccess: (idDeleted) => {
            queryClient.refetchQueries("posts");
            // queryClient.setQueryData("posts", (oldData) => {
            //     return {
            //         ...oldData,
            //         data: oldData.data?.filter((post) => post.id !== idDeleted),
            //     };
            // });
        },
    });

    const handleNavigate = (idPost) => {
        navigate(`/react-query/${idPost}`, {
            state: [2, 4],
        });
    };

    const handleOnChangeInput = (e) => {
        const name = e.target.name;
        setInputState({
            ...inputState,
            [name]: e.target.value,
        });
    };

    const handleCreatePost = () => {
        mutationCreatePost.mutate(inputState);
    };

    const handleDelete = (id) => {
        mutationDeletePost.mutate(id);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <h1>Error</h1>;
    }
    return (
        <div className="content">
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
            <button onClick={handleCreatePost}>Create</button>
            <h1>ReactQueryPostPage</h1>
            {listPost?.map((post) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                        }}
                    >
                        <div
                            // to={`/react-query/${post.id}`}
                            onClick={() => handleNavigate(post.id)}
                            className="post__name"
                            key={post.id}
                        >
                            {post.title}
                        </div>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(post.id)}
                        >
                            X
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ReactQueryPostPage;
