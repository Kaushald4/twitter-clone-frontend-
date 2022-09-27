import React, { ChangeEvent, useEffect, useState } from "react";
import moment from "moment";
import { BsArrowLeftShort } from "react-icons/bs";
import { IUser } from "../types/user";
import BGCoverIMG from "../assets/cover-bg.jpg";
import {
    TwitterBaloonIcon,
    TwitterCalendarIcon,
    TwitterLocationIcon,
} from "../components/SvgIcons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Tabs from "./Tabs";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { getCurrentUserTweetsAction, getUserTweetsAction } from "../features/tweet/tweetAction";
import TweetCard from "./TweetCard";
import ProfileUpdateModal from "./ProfileUpdateModal";
import LoadingIndicator from "./LoadingIndicator";
import { getUserInfoAction, updateCurrentUserAction } from "../features/user/userAction";
import {
    addFollowAction,
    getFollowAction,
    removeFollowAction,
} from "../features/follow/followAction";

interface Props {
    user: IUser;
    updateTweetLikes: (tweetId: string) => void;
    refetchUser: (userId?: string) => void;
    currentUser: IUser;
}

const ProfileComponent = ({ user, updateTweetLikes, refetchUser, currentUser }: Props) => {
    const [activeTab, setActiveTab] = useState(0);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [userUpdateDeatils, setUserUpdateDeatils] = useState({
        name: "",
        bio: "",
        location: "",
        website: "",
        photo: {
            coverPreview: "",
            coverFile: null,
            profilePreview: "",
            profileFile: null,
        },
    });
    const [dob, setDob] = useState({
        monthIndex: "Month",
        day: "Day",
        year: "Year",
    });
    const [showUnfollowModel, setShowUnfollowModel] = useState(false);
    const params = useParams();
    const location = useLocation();

    useEffect(() => {
        dispatch(getCurrentUserTweetsAction());
        dispatch(getUserInfoAction(location.state as string));
        dispatch(getUserTweetsAction(location.state as string));
        dispatch(getFollowAction(location.state));
    }, []);

    useEffect(() => {
        if (user) {
            setUserUpdateDeatils({
                bio: user.bio,
                name: user.name,
                location: user.location ? user.location : "",
                website: user.website ? user.website : "",
                photo: {
                    coverFile: null,
                    coverPreview: user.cover_photo || "",
                    profileFile: null,
                    profilePreview: user.profile_photo || "",
                },
            });
        }
    }, [user]);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const tweets = useAppSelector((state) => state.tweet);
    const follow = useAppSelector((state) => state.follow);

    const handleTabChange = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };

    const handleUpdateInputChnage = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        if (name === "profileFile" && e.target.files?.length) {
            const profilePreviewUrl = URL.createObjectURL(e.target.files[0]);
            setUserUpdateDeatils({
                ...userUpdateDeatils,
                photo: {
                    ...userUpdateDeatils.photo,
                    profileFile: e.target.files[0] as any,
                    profilePreview: profilePreviewUrl,
                },
            });
        } else if (name === "coverFile" && e.target.files?.length) {
            const coverPreviewUrl = URL.createObjectURL(e.target.files[0]);
            setUserUpdateDeatils({
                ...userUpdateDeatils,
                photo: {
                    ...userUpdateDeatils.photo,
                    coverFile: e.target.files[0] as any,
                    coverPreview: coverPreviewUrl,
                },
            });
        } else {
            setUserUpdateDeatils({ ...userUpdateDeatils, [name]: e.target.value });
        }
    };

    const handleDobChange = (name: string) => (e: ChangeEvent<HTMLSelectElement>) => {
        setDob({ ...dob, [name]: e.target.value });
    };

    const handleShowUpdateProfileModal = () => {
        setShowEditProfileModal(true);
    };
    const closeUpdateProfileModal = () => {
        setShowEditProfileModal(false);
    };

    // if current authenticated user is viewing his profile
    const isCurrentProfile = () => {
        if (currentUser && currentUser._id === user?._id) {
            return true;
        } else {
            return false;
        }
    };

    const onSave = () => {
        let dobObj;
        if (dob.day !== "Day" && dob.monthIndex !== "Month" && dob.year !== "Year") {
            dobObj = new Date(Number(dob.year), Number(dob.monthIndex), Number(dob.day)).toString();
        }
        const data = {
            name: userUpdateDeatils.name,
            bio: userUpdateDeatils.bio,
            location: userUpdateDeatils.location,
            website: userUpdateDeatils.website,
        };
        dispatch(
            updateCurrentUserAction({
                data,
                photo: {
                    coverFile: userUpdateDeatils.photo.coverFile,
                    profileFile: userUpdateDeatils.photo.profileFile,
                },
                next: onUpdateSuccess,
            })
        );
    };
    const onUpdateSuccess = () => {
        refetchUser(location.state as string);
        closeUpdateProfileModal();
    };

    const addNewFollow = () => {
        dispatch(
            addFollowAction({
                userId: location.state,
                next: () => dispatch(getFollowAction(location.state)),
            })
        );
    };
    const unFollow = () => {
        dispatch(
            removeFollowAction({
                userId: location.state,
                next: () => {
                    dispatch(getFollowAction(location.state)), setShowUnfollowModel(false);
                },
            })
        );
    };

    const isFollowing = () => {
        const isFollow =
            follow.follow &&
            follow.follow.followers.find(
                (follow: any) => follow.follower?._id === currentUser?._id
            );
        if (isFollow) {
            return isFollow.isEnd;
        }

        return true;
    };
    const getFollower = () => {
        if (follow.follow) {
            return follow.follow.followers.filter((follow: any) => !follow.isEnd);
        }
        return [];
    };
    const getFollowing = () => {
        if (follow.follow) {
            return follow.follow.following.filter((follow: any) => !follow.isEnd);
        }
        return [];
    };
    const TABS = ["Tweets", "Tweets & replies", "Media", "Likes"];

    return (
        <div className="min-w-[50%] border border-gray-200 min-h-[90vh]">
            <ProfileUpdateModal
                isShown={showEditProfileModal}
                handleShowUpdateProfileModal={handleShowUpdateProfileModal}
                closeUpdateProfileModal={closeUpdateProfileModal}
                handleUpdateInputChnage={handleUpdateInputChnage}
                dob={dob}
                handleDobChange={handleDobChange}
                onSave={onSave}
                userUpdateDeatils={userUpdateDeatils}
                currentUser={currentUser}
            />
            <LoadingIndicator isLoading={!user}>
                <div className="flex items-center min-h-[60px]">
                    <div className="cursor-pointer" onClick={() => navigate("/home")}>
                        <BsArrowLeftShort className="text-[1.6rem]" />
                    </div>
                    <div className="mx-[20px]" />
                    <div>
                        <h1 className="font-[500] text-[20px] capitalize">{user?.name}</h1>
                        <p className="text-gray-500 text-[12px] font-[500]">
                            {tweets.currentUserTweets.length === 0
                                ? "No tweets"
                                : `${tweets.currentUserTweets.length} Tweets`}
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="w-[100%] h-[220px]">
                        <img
                            src={user?.cover_photo || BGCoverIMG}
                            alt="cover"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                    <div className="flex justify-between">
                        <div className="relative">
                            <div className="flex flex-col justify-center items-center">
                                <div className="w-[170px] h-[80px]">
                                    <div className="w-[140px] h-[140px] overflow-hidden rounded-full border-[4px] border-white absolute -top-[70px] left-5">
                                        <img
                                            src={user?.profile_photo}
                                            className="w-full h-full object-cover object-center"
                                            alt="avatar"
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <h1 className="capitalize font-[700] text-[19px]">
                                        {user && user?.name}
                                    </h1>
                                    <p className="text-[12px] font-[600] text-gray-500">
                                        @{user?.username}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* unfollow popup modal */}
                        {showUnfollowModel && (
                            <div className="fixed top-0 bottom-0 right-0 left-0 bg-[rgba(0,0,0,.5)] z-10">
                                <div className="px-[40px] py-[20px] bg-white w-[320px] min-h-[280px] rounded-[14px] mx-auto mt-[200px]">
                                    <h1 className="text-[20px] font-[600]">
                                        Unfollow @{user?.username}
                                    </h1>
                                    <p className="text-[#536471] text-[15px] pt-[10px]">
                                        Their Tweets will no longer show up in your home timeline.
                                        You can still view their profile, unless their Tweets are
                                        protected.
                                    </p>
                                    <div className="mt-[12px]">
                                        <button
                                            onClick={unFollow}
                                            className="block w-full py-[7px] text-white bg-black rounded-full border-none"
                                        >
                                            Unfollow
                                        </button>
                                        <div className="my-[12px]" />
                                        <button
                                            onClick={() => setShowUnfollowModel(false)}
                                            className="block w-full py-[7px] text-black border border-gray-300 rounded-full"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="mt-[20px] pr-[20px]">
                            {!isCurrentProfile() ? (
                                <>
                                    {!isFollowing() ? (
                                        <button
                                            onClick={() => setShowUnfollowModel(true)}
                                            className="bg-white text-[#000000] border border-gray-300 rounded-full px-[14px] py-[5px] font-[600] text-[14px] hover:text-red-500 transition-all duration-200 hover:border-transparent"
                                        >
                                            Following
                                        </button>
                                    ) : (
                                        <button
                                            onClick={addNewFollow}
                                            className="text-white bg-[#000000] border border-gray-300 rounded-full px-[14px] py-[5px] font-[600] text-[14px] hover:bg-gray-800 transition-all duration-200 hover:border-transparent"
                                        >
                                            Follow
                                        </button>
                                    )}
                                </>
                            ) : (
                                <button
                                    onClick={handleShowUpdateProfileModal}
                                    className="bg-white text-[#000000] border border-gray-300 rounded-full px-[14px] py-[5px] font-[600] text-[14px] hover:bg-gray-200 transition-all duration-200 hover:border-transparent"
                                >
                                    Edit profile
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Bio Info */}
                    <div className="mt-[10px] px-[20px] ">
                        {user?.bio && (
                            <div className="text-[14px]">
                                <span className="capitalize">{user?.bio}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-7 mt-[14px] text-gray-500 text-[14px]">
                            {user?.location && (
                                <div className="flex items-center gap-1">
                                    <TwitterLocationIcon />
                                    <p>{user?.location}</p>
                                </div>
                            )}
                            <div className="flex items-center gap-1">
                                <TwitterBaloonIcon />
                                <p>Born {moment(user?.dob).format("MMMM D, YYYY")} </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <TwitterCalendarIcon />
                                <p>Joined {moment(user?.createdAt).format("MMMM D, YYYY")}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 mt-[15px]">
                            <Link
                                to={`/${user?.username}/followers`}
                                state={location.state}
                                className="text-[14px] hover:underline"
                            >
                                <span className="ml-[4px] font-[500] text-[#000000] inline-block">
                                    {getFollower().length}
                                </span>
                                <span className="inline-block ml-[4px] text-gray-500">
                                    Followers
                                </span>
                            </Link>
                            <Link
                                to={`/${user?.username}/following`}
                                state={location.state}
                                className="text-[14px] underline"
                            >
                                <span className="ml-[4px] font-[500] text-[#000000] inline-block">
                                    {getFollowing().length}
                                </span>
                                <span className="inline-block ml-[4px]  text-gray-500">
                                    Following
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mt-[20px] border-b border-gray-200 h-[54px]">
                        {TABS.map((tab, index) => {
                            return (
                                <Tabs
                                    key={index}
                                    tab={tab}
                                    tabIndex={index}
                                    activeTab={activeTab}
                                    handleTabChange={handleTabChange}
                                />
                            );
                        })}
                    </div>
                    {/* tweets */}
                    <div>
                        {tweets.currentUserTweets.map((tweet: any) => {
                            return (
                                <TweetCard
                                    key={tweet._id}
                                    {...tweet}
                                    user={user}
                                    currentUser={currentUser}
                                    updateTweetLikes={updateTweetLikes}
                                />
                            );
                        })}
                    </div>
                </div>
            </LoadingIndicator>
        </div>
    );
};

export default ProfileComponent;
