import React, { ChangeEvent, useEffect, useState } from "react";

import FeedComponent from "../components/FeedComponent";
import NewsSideBar from "../components/NewsSideBar";
import ProfileModal from "../components/ProfileModal";
import SidebarHeader from "../components/SidebarHeader";
import {
    fetchAllTweetAction,
    postTweetAction,
    updateTweetLikesAction,
} from "../features/tweet/tweetAction";
import { updateTweetLikesSuccess } from "../features/tweet/tweetSlice";
import { getCurrentUserAction } from "../features/user/userAction";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { socket } from "../utils/socket";

const HomePage = () => {
    const [tweetPost, setTweetPost] = useState({
        title: "",
        image: {
            previewUrl: "",
            file: {},
        },
    });
    const [progress, setProgress] = useState(0);
    const dispatch = useAppDispatch();
    const tweet = useAppSelector((state) => state.tweet);
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchAllTweetAction());
        dispatch(getCurrentUserAction());
        // socket.connect();
    }, []);

    const handleTweetInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTweetPost({ ...tweetPost, title: e.target.value });
    };
    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const imageUri = URL.createObjectURL(e.target.files[0]);
            const imageFile = e.target.files[0];
            setTweetPost({
                ...tweetPost,
                image: { ...tweetPost.image, previewUrl: imageUri, file: imageFile },
            });
        }
    };
    const clearFileInput = () => {
        setTweetPost({ ...tweetPost, image: { previewUrl: "", file: {} } });
    };

    const handlePostTweet = async () => {
        const data: any = {};
        if (tweetPost.image.file) {
            data["file"] = tweetPost.image.file;
        }
        data["title"] = tweetPost.title;

        dispatch(
            postTweetAction({ data, next: onPostSuccess, onUploadProgress: onUploadProgress })
        );
    };

    const onUploadProgress = (progress: number) => {
        setProgress(progress);
    };

    const onPostSuccess = () => {
        setTweetPost({ image: { file: {}, previewUrl: "" }, title: "" });
        setProgress(0);
    };

    const updateTweetLikes = (tweetId: string) => {
        dispatch(updateTweetLikesAction(tweetId));
        // socket.emit("tweet_like", tweetId);
        // socket.on("tweet_like", (updatedTweet: any) => {
        //     dispatch(updateTweetLikesSuccess(updatedTweet));
        // });
    };

    return (
        <div className="flex justify-center max-w-[1280px] mx-auto">
            <ProfileModal />
            <SidebarHeader user={user} />
            <FeedComponent
                handleTweetInputChange={handleTweetInputChange}
                clearFileInput={clearFileInput}
                tweetPost={tweetPost}
                handleFileInputChange={handleFileInputChange}
                handlePostTweet={handlePostTweet}
                tweets={tweet.tweets}
                uploadProgress={progress}
                user={user.currentUser}
                updateTweetLikes={updateTweetLikes}
            />
            <NewsSideBar />
        </div>
    );
};

export default HomePage;
