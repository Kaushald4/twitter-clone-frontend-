import React, { ChangeEvent } from "react";
import moment from "moment";
import { IoMdClose } from "react-icons/io";
import {
    TwitterDateIcon,
    TwitterEmojiIcon,
    TwitterGifIcon,
    TwitterImageIcon,
    TwitterLocationIcon,
    TwitterPollIcon,
    TwitterStarIcon,
} from "./SvgIcons";
import TweetCard from "./TweetCard";

interface Props {
    handleFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleTweetInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    tweetPost: any;
    clearFileInput: () => void;
    handlePostTweet: () => void;
    tweets: [];
    uploadProgress: number;
    user: any;
    updateTweetLikes: (tweetId: string) => void;
}

function FeedComponent({
    handleFileInputChange,
    tweetPost,
    clearFileInput,
    handleTweetInputChange,
    handlePostTweet,
    tweets,
    uploadProgress,
    user,
    updateTweetLikes,
}: Props) {
    return (
        <div className="min-w-[50%]">
            <div className="h-[53px] border-r border-l border-gray-200">
                <div className="fixed px-[20px] h-[55px] w-[620px] backdrop-blur-[10px] backdrop-brightness-200 bg-white/75  z-10 flex justify-between items-center">
                    <h1 className="font-[500] text-[20px]">Home</h1>
                    <div className="w-[24px]">
                        <TwitterStarIcon />
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: (630 * uploadProgress) / 100,
                }}
                className=" bg-primary h-[5px]"
            ></div>
            <div className="px-[20px] pt-[10px] flex min-h-[130px] border-r border-l border-b border-gray-200">
                <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                    {user && user?.profile_photo && (
                        <img
                            src={user.profile_photo}
                            alt="avatar"
                            className="h-full w-full object-cover object-center"
                        />
                    )}
                </div>
                <div className="w-full">
                    <div>
                        <textarea
                            onChange={handleTweetInputChange}
                            className="w-full min-h-[60px] px-[20px] placeholder:text-[18px] placeholder:text-gray-500"
                            placeholder="What's happening?"
                            rows={1}
                            value={tweetPost.title}
                        />
                    </div>
                    {tweetPost.image.previewUrl && (
                        <>
                            <div className="relative h-[502px] w-[530px]  rounded-[20px] overflow-hidden ml-[10px] mb-[20px]">
                                <div className="absolute top-2 left-3">
                                    <button
                                        onClick={clearFileInput}
                                        className="w-[40px] h-[40px] bg-[rgba(0,0,0,.4)] hover:bg-[rgba(0,0,0,.7)] transition-all duration-300 backdrop-blur-[20px] rounded-full flex justify-center items-center"
                                    >
                                        <IoMdClose className="text-white" />
                                    </button>
                                </div>
                                <img
                                    src={tweetPost.image.previewUrl}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </>
                    )}
                    <div className="flex justify-between items-center px-[20px]">
                        <div className="flex gap-5">
                            <div className="cursor-pointer">
                                <input
                                    onChange={handleFileInputChange}
                                    type="file"
                                    id="file"
                                    className="hidden"
                                />
                                <label htmlFor="file" className="cursor-pointer">
                                    <TwitterImageIcon />
                                </label>
                            </div>
                            <div className="cursor-pointer">
                                <TwitterGifIcon />
                            </div>
                            <div className="cursor-pointer">
                                <TwitterPollIcon />
                            </div>
                            <div className="cursor-pointer">
                                <TwitterEmojiIcon />
                            </div>
                            <div className="cursor-pointer">
                                <TwitterDateIcon />
                            </div>
                            <div className="cursor-pointer">
                                <TwitterLocationIcon />
                            </div>
                        </div>
                        <div>
                            <button
                                disabled={
                                    tweetPost.title || tweetPost.image.previewUrl ? false : true
                                }
                                onClick={handlePostTweet}
                                className="bg-primary disabled:bg-opacity-50 text-white py-[6px] rounded-full px-[16px]"
                            >
                                Tweet
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* tweets */}
            <div>
                {tweets.map((tweet: any) => {
                    return (
                        <TweetCard
                            currentUser={user}
                            key={tweet._id}
                            {...tweet}
                            updateTweetLikes={updateTweetLikes}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default FeedComponent;
