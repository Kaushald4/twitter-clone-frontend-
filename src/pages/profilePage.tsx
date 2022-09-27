import React, { useEffect } from "react";
import NewsSideBar from "../components/NewsSideBar";
import ProfileComponent from "../components/ProfileComponent";
import SidebarHeader from "../components/SidebarHeader";
import { updateTweetLikesAction } from "../features/tweet/tweetAction";
import { getCurrentUserAction, getUserInfoAction } from "../features/user/userAction";
import { useAppDispatch, useAppSelector } from "../hooks/hook";

function ProfilePage() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(getCurrentUserAction());
    }, []);

    const updateTweetLikes = (tweetId: string) => {
        dispatch(updateTweetLikesAction(tweetId));
    };
    const refetchUser = (userId?: string) => {
        dispatch(getCurrentUserAction());
        if (userId) {
            dispatch(getUserInfoAction(userId));
        }
    };

    return (
        <div className="flex justify-center max-w-[1280px] mx-auto">
            <SidebarHeader user={user} />
            <ProfileComponent
                refetchUser={refetchUser}
                user={user.user}
                currentUser={user.currentUser}
                updateTweetLikes={updateTweetLikes}
            />
            <NewsSideBar />
        </div>
    );
}

export default ProfilePage;
