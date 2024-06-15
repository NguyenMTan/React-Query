import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as Services from "../services/index";
import Loading from "../components/Loading";

const ReactPostDetailsPage = () => {
    const { id } = useParams();
    const { state: users } = useLocation();

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState({});
    const [listUser, setListUser] = useState([]);
    const [inputState, setInputState] = useState({
        title: "",
        body: "",
    });

    const fetchDetailsPost = async () => {
        setIsLoading(true);
        try {
            Services.getDetailsPost(id).then((res) => {
                if (res?.status === 200) {
                    setPost(res.data);
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

    const fetchDetailsUser = async (id) => {
        setIsLoading(true);
        try {
            Services.getDetailsUser(id).then((res) => {
                if (res?.status === 200) {
                    const isExist = listUser.find(
                        (i) => i.id === res?.data?.id
                    );
                    if (!isExist) {
                        setListUser((prev) => [...prev, res.data]);
                        setIsSuccess(true);
                    }
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

    const fetchUpdatePost = async (id, data) => {
        setIsLoading(true);
        try {
            Services.updatePost(id, data).then((res) => {
                if (res?.status === 200) {
                    setIsSuccess(true);
                    setInputState({
                        title: "",
                        body: "",
                    });
                    fetchDetailsPost(id);
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

    const handleOnChangeInput = (e) => {
        const name = e.target.name;
        setInputState({
            ...inputState,
            [name]: e.target.value,
        });
    };

    const handleUpdate = () => {
        fetchUpdatePost(id, inputState);
    };

    useEffect(() => {
        if (id) {
            fetchDetailsPost();
        }
    }, [id]);

    useEffect(() => {
        if (users) {
            users?.forEach((userId) => {
                fetchDetailsUser(userId);
            });
        }
    }, [users]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <h1>Error</h1>;
    }

    return (
        <div>
            <div>
                <h1>Title: {post.title}</h1>
                <h2>Body: {post.body}</h2>
            </div>
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
                <h2>User seen:</h2>
                {listUser?.map((i) => {
                    return <h3 key={i.id}>{i?.name}</h3>;
                })}
            </div>
        </div>
    );
};

export default ReactPostDetailsPage;
