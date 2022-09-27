import React, { ChangeEvent, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import NewsSideBar from "../components/NewsSideBar";
import SidebarHeader from "../components/SidebarHeader";
import Tabs from "../components/Tabs";
import {
    addFollowAction,
    getAllFollowAction,
    getFollowAction,
    removeFollowAction,
} from "../features/follow/followAction";
import { getCurrentUserAction, getUserInfoAction } from "../features/user/userAction";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { IUser } from "../types/user";

interface Props {
    user: IUser;
}

const ViewFollowerPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showUnfollowModel, setShowUnfollowModel] = useState({
        flag: false,
        activeFollowUser: "",
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const user = useAppSelector((state) => state.user);
    const follow = useAppSelector((state) => state.follow);

    useEffect(() => {
        dispatch(getUserInfoAction(location.state as any));
        dispatch(getCurrentUserAction());
        dispatch(getFollowAction(location.state));
        dispatch(getAllFollowAction());
    }, []);

    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex);
        if (tabIndex === 0) {
            navigate(`/${user.user?.username}/followers_you_follow`, { state: location.state });
        } else if (tabIndex === 1) {
            navigate(`/${user.user?.username}/followers`, { state: location.state });
        } else if (tabIndex === 2) {
            navigate(`/${user.user?.username}/following`, { state: location.state });
        }
    };

    const addNewFollow = (userId: string) => {
        dispatch(
            addFollowAction({
                userId: userId,
                next: () => {
                    dispatch(getFollowAction(location.state));
                    dispatch(getFollowAction(location.state));
                    dispatch(getAllFollowAction());
                },
            })
        );
    };

    const unFollow = (userId: string | number) => {
        dispatch(
            removeFollowAction({
                userId: userId,
                next: () => {
                    dispatch(getFollowAction(userId));
                    setShowUnfollowModel({ activeFollowUser: "", flag: false });
                    dispatch(getFollowAction(location.state));
                    dispatch(getAllFollowAction());
                },
            })
        );
    };

    const getCurrentUserFollwing = () => {
        if (follow.allFollow) {
            return follow?.allFollow
                .filter((follower: any) => {
                    if (follower.follower._id === user?.currentUser._id && !follower.isEnd) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .map((f: any) => {
                    return {
                        following: f.following,
                        isEnd: f.isEnd,
                        _id: f._id,
                    };
                });
        }
    };

    const getCurrentUserFollowers = () => {
        if (follow.allFollow) {
            return follow?.allFollow
                .filter((follower: any) => {
                    if (follower.following._id === user?.currentUser._id && !follower.isEnd) {
                        return true;
                    } else {
                        return false;
                    }
                })
                .map((f: any) => {
                    return {
                        follower: f.follower,
                        isEnd: f.isEnd,
                        _id: f._id,
                    };
                });
        }
    };

    const getFollowers = () => {
        return (
            <div className="px-[20px]">
                {follow?.follow?.followers
                    .filter((follower: any) => !follower.isEnd)
                    .map((follower: any, index: number) => {
                        const { _id, name, username, bio, profile_photo } = follower.follower;

                        const isFollowing = getCurrentUserFollwing()
                            ?.map((follower: any) => {
                                return follower.following._id;
                            })
                            .includes(_id);
                        const isUserFollowingCurrentUser = getCurrentUserFollowers()
                            ?.map((follower: any) => {
                                return follower.follower._id;
                            })
                            .includes(_id);

                        return (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex  gap-2 my-[20px]">
                                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                                        <img
                                            className="w-full h-full object-cover object-center"
                                            src={profile_photo}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="">
                                        <p className="capitalize font-[500] text-[15px]">{name}</p>
                                        <p className="capitalize font-[400] text-[15px] text-gray-500">
                                            @{username}{" "}
                                            {isUserFollowingCurrentUser && (
                                                <span className="bg-[#EFF3F4] text-[11px] inline-block px-[8px] mx-[4px] rounded-[4px] font-[500] text-[#536471]">
                                                    {"Follows you"}
                                                </span>
                                            )}
                                        </p>
                                        <p className="">{bio}</p>
                                    </div>
                                </div>
                                <div>
                                    {/* unfollow popup modal */}
                                    {showUnfollowModel.flag && (
                                        <div className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,.5)] z-10">
                                            <div className="px-[40px] py-[20px] bg-white w-[320px] min-h-[280px] rounded-[14px] mx-auto mt-[200px]">
                                                <h1 className="text-[20px] font-[600]">
                                                    Unfollow @{user?.username}
                                                </h1>
                                                <p className="text-[#536471] text-[15px] pt-[10px]">
                                                    Their Tweets will no longer show up in your home
                                                    timeline. You can still view their profile,
                                                    unless their Tweets are protected.
                                                </p>
                                                <div className="mt-[12px]">
                                                    <button
                                                        onClick={() =>
                                                            unFollow(
                                                                showUnfollowModel.activeFollowUser
                                                            )
                                                        }
                                                        className="block w-full py-[7px] text-white bg-black rounded-full border-none"
                                                    >
                                                        Unfollow
                                                    </button>
                                                    <div className="my-[12px]" />
                                                    <button
                                                        onClick={() =>
                                                            setShowUnfollowModel({
                                                                activeFollowUser: "",
                                                                flag: false,
                                                            })
                                                        }
                                                        className="block w-full py-[7px] text-black border border-gray-300 rounded-full"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-[20px] pr-[20px]">
                                        <>
                                            {isFollowing ? (
                                                <button
                                                    onClick={() =>
                                                        setShowUnfollowModel({
                                                            activeFollowUser: _id,
                                                            flag: true,
                                                        })
                                                    }
                                                    className="bg-white text-[#000000] border border-gray-300 rounded-full px-[14px] py-[5px] font-[600] text-[14px] hover:text-red-500 transition-all duration-200 hover:border-transparent"
                                                >
                                                    Following
                                                </button>
                                            ) : (
                                                <>
                                                    {_id !== user.currentUser._id && (
                                                        <button
                                                            onClick={() => addNewFollow(_id)}
                                                            className="text-white bg-[#000000] border border-gray-300 rounded-full px-[14px] py-[5px] font-[600] text-[14px] hover:bg-gray-800 transition-all duration-200 hover:border-transparent"
                                                        >
                                                            Follow
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    };
    const getFollowing = () => {
        return (
            <div className="px-[20px]">
                {follow?.follow?.following
                    .filter((following: any) => !following.isEnd)
                    .map((following: any, index: number) => {
                        const { _id, name, username, bio, profile_photo } = following.following;
                        const isFollowing = getCurrentUserFollwing()
                            ?.map((follower: any) => {
                                return follower.following._id;
                            })
                            .includes(_id);

                        return (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex  gap-2 my-[20px]">
                                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                                        <img
                                            className="w-full h-full object-cover object-center"
                                            src={profile_photo}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="">
                                        <p className="capitalize font-[500] text-[15px]">{name}</p>
                                        <p className="capitalize font-[400] text-[15px] text-gray-500">
                                            @{username}
                                        </p>
                                        <p className="">{bio}</p>
                                    </div>
                                </div>
                                <div>
                                    {/* unfollow popup modal */}
                                    {showUnfollowModel.flag && (
                                        <div className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,.5)] z-10">
                                            <div className="px-[40px] py-[20px] bg-white w-[320px] min-h-[280px] rounded-[14px] mx-auto mt-[200px]">
                                                <h1 className="text-[20px] font-[600]">
                                                    Unfollow @{user?.username}
                                                </h1>
                                                <p className="text-[#536471] text-[15px] pt-[10px]">
                                                    Their Tweets will no longer show up in your home
                                                    timeline. You can still view their profile,
                                                    unless their Tweets are protected.
                                                </p>
                                                <div className="mt-[12px]">
                                                    <button
                                                        onClick={() =>
                                                            unFollow(
                                                                showUnfollowModel.activeFollowUser
                                                            )
                                                        }
                                                        className="block w-full py-[7px] text-white bg-black rounded-full border-none"
                                                    >
                                                        Unfollow
                                                    </button>
                                                    <div className="my-[12px]" />
                                                    <button
                                                        onClick={() =>
                                                            setShowUnfollowModel({
                                                                activeFollowUser: "",
                                                                flag: false,
                                                            })
                                                        }
                                                        className="block w-full py-[7px] text-black border border-gray-300 rounded-full"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-[20px] pr-[20px]">
                                        <>
                                            {isFollowing ? (
                                                <button
                                                    key={follow._id}
                                                    onClick={() =>
                                                        setShowUnfollowModel({
                                                            activeFollowUser: _id,
                                                            flag: true,
                                                        })
                                                    }
                                                    className="bg-white text-[#000000] border border-gray-300 rounded-full px-[14px] py-[5px] font-[600] text-[14px] hover:text-red-500 transition-all duration-200 hover:border-transparent"
                                                >
                                                    Following
                                                </button>
                                            ) : (
                                                <>
                                                    {_id !== user.currentUser._id && (
                                                        <button
                                                            key={follow._id}
                                                            onClick={() => addNewFollow(_id)}
                                                            className="text-white bg-[#000000] border border-gray-300 rounded-full px-[14px] py-[5px] font-[600] text-[14px] hover:bg-gray-800 transition-all duration-200 hover:border-transparent"
                                                        >
                                                            Follow
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    };
    const getMutualFollowers = () => {
        return (
            <div className="px-[20px]">
                {follow?.follow?.followers
                    .filter((follower: any) => !follower.isEnd)
                    .filter((follower: any) =>
                        getCurrentUserFollwing()
                            ?.map((following: any) => following.following._id)
                            .includes(follower.follower._id)
                    )
                    .map((follower: any, index: number) => {
                        const { _id, name, username, bio, profile_photo } = follower.follower;

                        const isFollowing = getCurrentUserFollwing()
                            ?.map((follower: any) => {
                                return follower.following._id;
                            })
                            .includes(_id);

                        return (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex  gap-2 my-[20px]">
                                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                                        <img
                                            className="w-full h-full object-cover object-center"
                                            src={profile_photo}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className="">
                                        <p className="capitalize font-[500] text-[15px]">{name}</p>
                                        <p className="capitalize font-[400] text-[15px] text-gray-500">
                                            @{username}
                                        </p>
                                        <p className="">{bio}</p>
                                    </div>
                                </div>
                                <div>
                                    {/* unfollow popup modal */}
                                    {showUnfollowModel.flag && (
                                        <div className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,.5)] z-10">
                                            <div className="px-[40px] py-[20px] bg-white w-[320px] min-h-[280px] rounded-[14px] mx-auto mt-[200px]">
                                                <h1 className="text-[20px] font-[600]">
                                                    Unfollow @{user?.username}
                                                </h1>
                                                <p className="text-[#536471] text-[15px] pt-[10px]">
                                                    Their Tweets will no longer show up in your home
                                                    timeline. You can still view their profile,
                                                    unless their Tweets are protected.
                                                </p>
                                                <div className="mt-[12px]">
                                                    <button
                                                        onClick={() =>
                                                            unFollow(
                                                                showUnfollowModel.activeFollowUser
                                                            )
                                                        }
                                                        className="block w-full py-[7px] text-white bg-black rounded-full border-none"
                                                    >
                                                        Unfollow
                                                    </button>
                                                    <div className="my-[12px]" />
                                                    <button
                                                        onClick={() =>
                                                            setShowUnfollowModel({
                                                                activeFollowUser: "",
                                                                flag: false,
                                                            })
                                                        }
                                                        className="block w-full py-[7px] text-black border border-gray-300 rounded-full"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-[20px] pr-[20px]">
                                        <>
                                            {isFollowing ? (
                                                <button
                                                    onClick={() =>
                                                        setShowUnfollowModel({
                                                            activeFollowUser: _id,
                                                            flag: true,
                                                        })
                                                    }
                                                    className="bg-white text-[#000000] border border-gray-300 rounded-full px-[14px] py-[5px] font-[600] text-[14px] hover:text-red-500 transition-all duration-200 hover:border-transparent"
                                                >
                                                    Following
                                                </button>
                                            ) : (
                                                <>
                                                    {_id !== user.currentUser._id && (
                                                        <button
                                                            onClick={() => addNewFollow(_id)}
                                                            className="text-white bg-[#000000] border border-gray-300 rounded-full px-[14px] py-[5px] font-[600] text-[14px] hover:bg-gray-800 transition-all duration-200 hover:border-transparent"
                                                        >
                                                            Follow
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    };
    const TABS = [
        { name: "Followers you know", id: 1 },
        { name: "Followers", id: 2 },
        { name: "Following", id: 3 },
    ];
    const tabContent = [getMutualFollowers, getFollowers, getFollowing];

    return (
        <div className="flex justify-center max-w-[1280px] mx-auto">
            <SidebarHeader user={user} />
            <div className="min-w-[50%] border border-gray-200 min-h-[90vh]">
                <div className="flex items-center min-h-[60px]">
                    <div
                        className="cursor-pointer"
                        onClick={() =>
                            navigate(`/${user.currentUser?.username}`, {
                                state: user.currentUser?._id,
                            })
                        }
                    >
                        <BsArrowLeftShort className="text-[1.6rem]" />
                    </div>
                    <div className="mx-[20px]" />
                    <div>
                        <h1 className="font-[500] text-[20px] capitalize">{user.user?.name}</h1>
                        <p className="text-gray-500 text-[12px] font-[500]">
                            @{user.user?.username}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mt-[20px] border-b border-gray-200 h-[54px]">
                    {TABS.map((tab, index) => {
                        return (
                            <Tabs
                                key={tab.id}
                                tab={tab.name}
                                tabIndex={index}
                                activeTab={activeTab}
                                handleTabChange={handleTabChange}
                            />
                        );
                    })}
                </div>
                {tabContent[activeTab]()}
            </div>
            <NewsSideBar />
        </div>
    );
};

export default ViewFollowerPage;
