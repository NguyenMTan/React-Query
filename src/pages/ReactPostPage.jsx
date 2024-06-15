import React, { useEffect, useState } from "react";
import * as Servives from "../services/index";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router-dom";

const ReactPostPage = () => {
    const [listPost, setListPost] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputState, setInputState] = useState({
        title: "",
        body: "",
    });

    const navigate = useNavigate();

    const fetchAllPost = async () => {
        setIsLoading(true);
        try {
            Servives.getAllPosts().then((res) => {
                if (res?.status === 200) {
                    setListPost(res.data);
                    setIsSuccess(true);
                } else {
                    setIsError(true);
                }
                setIsLoading(false);
            });
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const fetchCreatePost = async (data) => {
        setIsLoading(true);
        try {
            Servives.createPost(data).then((res) => {
                if (res?.status === 201) {
                    setIsSuccess(true);
                    setInputState({
                        title: "",
                        body: "",
                    });
                    fetchAllPost();
                } else {
                    setIsError(true);
                }
                setIsLoading(false);
            });
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const fetchDeletePost = async (id) => {
        setIsLoading(true);
        try {
            Servives.deletePost(id).then((res) => {
                if (res?.status === 200) {
                    setIsSuccess(true);
                    fetchAllPost();
                    // alert("Success");
                } else {
                    setIsError(true);
                }
                setIsLoading(false);
            });
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    const handleNavigate = (idPost) => {
        navigate(`/react/${idPost}`, {
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
        fetchCreatePost(inputState);
    };

    const handleDelete = (id) => {
        fetchDeletePost(id);
    };

    useEffect(() => {
        fetchAllPost();
    }, []);

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
            <h1>ReactPostPage</h1>
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
                            onClick={() => handleNavigate(post.id)}
                            // to={`/react/${post.id}`}
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

export default ReactPostPage;
