import React, { ChangeEvent, useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { TbCameraPlus } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

import CoverBgIMG from "../assets/cover-bg.jpg";
import AvatarIMG from "../assets/avatar.png";
import { getDaysMonths, getYearLists, MONTHS } from "../utils/dateUtils";
import { IDob, IUser } from "../types/user";

interface Props {
    isShown: boolean;
    handleShowUpdateProfileModal: () => void;
    closeUpdateProfileModal: () => void;
    handleUpdateInputChnage: (name: string) => (e: ChangeEvent<HTMLInputElement>) => void;
    dob: IDob;
    handleDobChange: (name: string) => (e: ChangeEvent<HTMLSelectElement>) => void;
    onSave: () => void;
    userUpdateDeatils: any;
    currentUser: IUser;
}

function ProfileUpdateModal({
    isShown,
    closeUpdateProfileModal,
    handleShowUpdateProfileModal,
    handleUpdateInputChnage,
    handleDobChange,
    dob,
    currentUser,
    onSave,
    userUpdateDeatils,
}: Props) {
    const [showDobEfit, setShowDobEfit] = useState(false);

    useEffect(() => {
        if (isShown) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isShown]);

    if (isShown) {
        return (
            <div className="font-[Open Sans] fixed top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,.4)] z-10">
                <div className="max-w-[600px] mx-auto max-h-[650px] pb-[40px] bg-white rounded-[20px] overflow-x-auto mt-[60px]">
                    {/* modal header */}
                    <div className="h-[59px]">
                        <div className="fixed w-[600px] h-[59px] z-20 bg-white flex items-center justify-between px-5">
                            <div className="flex items-center gap-4">
                                <div
                                    onClick={closeUpdateProfileModal}
                                    className="hover:bg-gray-200 w-[40px] h-[40px] cursor-pointer rounded-full flex justify-center items-center"
                                >
                                    <GrClose />
                                </div>
                                <div className="font-[600] text-[18px] text-[#2f2f2f]">
                                    Edit Profile
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={onSave}
                                    className="bg-[#000000] text-white px-[20px] py-[4px] rounded-full"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mx-[2px] relative">
                        <div className="w-full h-[200px] overflow-hidden relative">
                            <img
                                src={
                                    userUpdateDeatils.photo.coverPreview ||
                                    currentUser.cover_photo ||
                                    CoverBgIMG
                                }
                                alt="cover-photo"
                                className="w-full h-full"
                            />
                            <div className="absolute z-10 top-[45%] left-[40%] flex gap-5">
                                <input
                                    type="file"
                                    hidden
                                    id="cover-photo"
                                    onChange={handleUpdateInputChnage("coverFile")}
                                />
                                <label
                                    htmlFor="cover-photo"
                                    className="cursor-pointer border-none w-[40px] flex justify-center items-center h-[40px] overflow-hidden rounded-full bg-[rgba(0,0,0,.7)] hover:bg-[rgba(0,0,0,.5)] transition-all duration-200"
                                >
                                    <TbCameraPlus className="text-[1.4rem] text-white" />
                                </label>
                                <button className="border-none w-[40px] flex justify-center items-center h-[40px] overflow-hidden rounded-full bg-[rgba(0,0,0,.7)] hover:bg-[rgba(0,0,0,.5)] transition-all duration-200">
                                    <IoMdClose className="text-[1.4rem] text-white" />
                                </button>
                            </div>
                        </div>
                        <div className="px-[20px] h-[80px]">
                            <div className="absolute cursor-pointer w-[120px] h-[120px] overflow-hidden rounded-full border-[4px] border-white top-[140px]">
                                <img
                                    src={userUpdateDeatils.photo.profilePreview || AvatarIMG}
                                    alt="avatar"
                                    className="w-full h-full object-cover object-center"
                                />
                                <span className="absolute flex justify-center items-center z-10 top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,.4)]">
                                    <input
                                        type="file"
                                        id="profile-photo"
                                        hidden
                                        onChange={handleUpdateInputChnage("profileFile")}
                                    />
                                    <label
                                        htmlFor="profile-photo"
                                        className="cursor-pointer border-none w-[40px] flex justify-center items-center h-[40px] overflow-hidden rounded-full bg-[rgba(0,0,0,.7)] hover:bg-[rgba(0,0,0,.5)] transition-all duration-200"
                                    >
                                        <TbCameraPlus className="text-[1.4rem] text-white" />
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className="mx-[20px]">
                            <input
                                type="text"
                                placeholder="Name"
                                value={userUpdateDeatils.name}
                                onChange={handleUpdateInputChnage("name")}
                                className="w-full outline-primary py-[14px] px-[10px] rounded-[5px]"
                            />
                            <div className="my-[20px]" />

                            <textarea
                                placeholder="Bio"
                                value={userUpdateDeatils.bio}
                                onChange={handleUpdateInputChnage("bio") as any}
                                className="w-full outline-primary py-[14px] px-[10px] rounded-[5px]"
                            />

                            <div className="my-[20px]" />

                            <input
                                type="text"
                                placeholder="Location"
                                value={userUpdateDeatils.location}
                                onChange={handleUpdateInputChnage("location")}
                                className="w-full outline-primary py-[14px] px-[10px] rounded-[5px]"
                            />

                            <div className="my-[20px]" />

                            <input
                                type="text"
                                placeholder="Website"
                                value={userUpdateDeatils.website}
                                onChange={handleUpdateInputChnage("website")}
                                className="w-full outline-primary py-[14px] px-[10px] rounded-[5px]"
                            />

                            <div className="mt-[20px]">
                                <span>
                                    <span className="text-[14px] font-[600] inline-block">
                                        Birth date
                                    </span>

                                    <span
                                        onClick={() => setShowDobEfit(!showDobEfit)}
                                        className="pl-[9px] cursor-pointer text-primary text-[14px] inline-block"
                                    >
                                        {!showDobEfit ? "Edit" : "Cancel"}
                                    </span>
                                </span>

                                {/* dob edit component */}
                                {showDobEfit ? (
                                    <div>
                                        <div className="mt-[8px]">
                                            <p className="text-[14px] text-gray-600">
                                                This should be the date of birth of the person using
                                                the account. Even if you’re making an account for
                                                your business, event, or cat.
                                            </p>
                                            <p className="text-[14px] mt-[10px] text-gray-600">
                                                Twitter uses your age to customize your experience,
                                                including ads, as explained in our{" "}
                                                <span className="text-primary">
                                                    {" "}
                                                    Privacy Policy
                                                </span>
                                                .
                                            </p>

                                            <div className="mt-[20px] flex">
                                                <select
                                                    defaultValue={MONTHS[Number(dob.monthIndex)]}
                                                    onChange={() => {}}
                                                    className="w-[180px] h-[60px] bg-white border border-gray-300 rounded-[6px]"
                                                >
                                                    <option disabled>Month</option>
                                                    {MONTHS.map((month: string, i: number) => {
                                                        return (
                                                            <option value={i} key={i}>
                                                                {month}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                                <span className="inline-block px-2" />
                                                <select
                                                    value={dob.day}
                                                    onChange={handleDobChange("day")}
                                                    className="w-[100px] h-[60px] bg-white border border-gray-300 rounded-[6px]"
                                                >
                                                    <option disabled hidden>
                                                        Day
                                                    </option>
                                                    {getDaysMonths(dob).map(
                                                        (month: number, i: number) => {
                                                            return (
                                                                <option value={month + 1} key={i}>
                                                                    {month + 1}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                                <span className="inline-block px-2" />
                                                <select
                                                    value={dob.year}
                                                    onChange={handleDobChange("year")}
                                                    className="w-[150px] h-[60px] bg-white border border-gray-300 rounded-[6px]"
                                                >
                                                    <option disabled hidden>
                                                        Year
                                                    </option>
                                                    {getYearLists().map(
                                                        (year: number, i: number) => {
                                                            return (
                                                                <option value={year} key={i}>
                                                                    {year}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-[20px]">
                                            <h1 className="text-[14px] font-[600]">
                                                Who sees this?
                                            </h1>
                                            <p className="text-[14px] text-gray-600">
                                                You can control who sees your birthday on Twitter.{" "}
                                                <span className="text-primary">Learn more</span>
                                            </p>

                                            <div className="flex  flex-col">
                                                <div>
                                                    <p className="mt-[20px]">Month & date</p>
                                                    <select className="w-full h-[60px] bg-white border border-gray-300 rounded-[6px]">
                                                        <option value="0">Public</option>
                                                        <option value="0">Your followers</option>
                                                        <option value="0">People you follow</option>
                                                        <option value="0">
                                                            You follow each other
                                                        </option>
                                                        <option value="0">Only you</option>
                                                    </select>
                                                </div>
                                                <div className="my-[10px]" />
                                                <div>
                                                    <p>Year</p>
                                                    <select className="w-full h-[60px] bg-white border border-gray-300 rounded-[6px]">
                                                        <option value="0">Public</option>
                                                        <option value="0">Your followers</option>
                                                        <option value="0">People you follow</option>
                                                        <option value="0">
                                                            You follow each other
                                                        </option>
                                                        <option value="0">Only you</option>
                                                    </select>
                                                </div>

                                                <div className="text-center mt-[20px]">
                                                    <button className="border-none text-red-500 hover:bg-[rgba(234,53,87,.1)] w-full py-[14px] rounded-[5px]">
                                                        Remove birth date
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <div />;
}

export default ProfileUpdateModal;
