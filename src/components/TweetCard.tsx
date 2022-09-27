import moment from "moment";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { getCurrentUserAction } from "../features/user/userAction";
import { useAppSelector } from "../hooks/hook";
import { IUser } from "../types/user";
import {
    TwitterLikeFilledIcon,
    TwitterLikeIcon,
    TwitterReplyIcon,
    TwitterRetweetIcon,
    TwitterShareIcon,
} from "./SvgIcons";

interface Props {
    caption: string;
    likes: [];
    retweet: number;
    image: string;
    user: IUser;
    createdAt: Date;
    updateTweetLikes: (tweetId: string) => void;
    _id: string;
    currentUser: IUser;
}

function TweetCard({
    image,
    likes,
    retweet,
    caption,
    user,
    createdAt,
    updateTweetLikes,
    currentUser,
    _id,
}: Props) {
    const renderTwitterLikeIcon = () => {
        if (currentUser && likes.includes(currentUser._id as never)) {
            return <TwitterLikeFilledIcon />;
        } else {
            return <TwitterLikeIcon color="#6d7c87" />;
        }
    };

    return (
        <div className="cursor-pointer hover:bg-gray-100">
            <div className="font-[Open Sans] flex px-[20px] py-[20px] border-b border-l border-r border-gray-200">
                <div className="w-[48px] h-[48px] relative rounded-full overflow-hidden after:content-[''] after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 hover:after:bg-[rgba(0,0,0,.4)] after:transition-all after:duration-500">
                    {user.profile_photo && (
                        <img
                            src={user.profile_photo}
                            alt="avatar"
                            className="w-full h-full object-cover object-center"
                        />
                    )}
                </div>
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="ml-[20px]">
                            <Link to={`/${user.username}`} state={user?._id}>
                                <span className="font-[600] hover:underline capitalize">
                                    {user.name}
                                </span>
                                <span className="pl-[4px] text-gray-500 text-[14px]">
                                    @{user.username}
                                </span>
                            </Link>
                            <span className="text-[16px] text-gray-500 pl-[10px]">
                                {moment(createdAt).fromNow()}
                            </span>
                            <p className="font-[400] text-[15px]">{caption}</p>
                        </div>
                        <div>
                            <HiDotsHorizontal className="text-gray-500" />
                        </div>
                    </div>
                    {image && (
                        <div className="w-[436px] h-[519px] ml-[20px] overflow-hidden rounded-[10px] mt-4">
                            <img src={image} alt="avatar" className="w-full h-full" />
                        </div>
                    )}
                    <div className="flex mt-[20px] items-center justify-between  w-[436px] ml-[20px]">
                        <div className="relative flex items-center group gap-3 cursor-pointer">
                            <div className="absolute w-[25px] h-[25px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(29,155,240,.2)]">
                                <TwitterReplyIcon />
                            </div>
                            <p className="text-[14px] ml-7 group-hover:text-primary text-gray-500"></p>
                        </div>
                        <div className="flex items-center group gap-3 cursor-pointer">
                            <div className="relative flex items-center group gap-3 cursor-pointer">
                                <div className="absolute w-[25px] h-[25px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(29,155,240,.2)]">
                                    <TwitterRetweetIcon />
                                </div>
                            </div>
                            <p className="text-[14px] ml-5 group-hover:text-primary text-gray-500"></p>
                        </div>
                        <div
                            onClick={() => updateTweetLikes(_id)}
                            className="flex items-center group gap-3 cursor-pointer"
                        >
                            <div className="relative flex items-center group gap-3 cursor-pointer">
                                <div className="absolute w-[25px] h-[25px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[rgba(249,24,128,.4)]">
                                    {renderTwitterLikeIcon()}
                                </div>
                            </div>
                            <p className="text-[14px] ml-5 group-hover:text-[rgb(249,24,128)] text-gray-500">
                                {likes.length !== 0 && likes.length}
                            </p>
                        </div>
                        <div>
                            <div className="w-[18px]">
                                <TwitterShareIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TweetCard;
