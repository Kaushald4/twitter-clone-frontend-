import React, { ChangeEvent, useState } from "react";
import ProfileAvatar from "../assets/avatar.png";
import { getCurrentUserAction, updateCurrentUserAction } from "../features/user/userAction";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import LoadingButton from "./LoadingButton";

interface Props {
    isShown?: boolean;
}

function ProfileModal({ isShown }: Props) {
    const [profilePhoto, setProfilePhoto] = useState({
        file: {},
        previewUrl: "",
    });
    const [username, setUsername] = useState("");
    const [currentModalIndex, setCurrentModalIndex] = useState(0);

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const previewUrl = URL.createObjectURL(e.target.files[0]);
            setProfilePhoto({ ...profilePhoto, file: e.target.files[0], previewUrl: previewUrl });
        }
    };
    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleUpload = () => {
        dispatch(
            updateCurrentUserAction({
                photo: { profileFile: profilePhoto.file },
                next: onUploadSuccess,
            })
        );
    };
    const handleUserName = () => {
        dispatch(updateCurrentUserAction({ data: { username }, next: onUsernameSetSuccess }));
    };

    const onSkipClick = () => {
        dispatch(updateCurrentUserAction({}));
    };

    const onUploadSuccess = () => {
        setCurrentModalIndex(currentModalIndex + 1);
    };
    const onUsernameSetSuccess = () => {
        dispatch(getCurrentUserAction());
    };

    const proifleModalContent = () => {
        return (
            <div className="w-[500px] min-h-[500px] mt-[100px] rounded-[10px] bg-white mx-auto">
                <h1 className="font-[500] text-center pt-[20px] text-[31px] text-[#0f1419]">
                    Pick Your Profile Photo
                </h1>
                <div className="mt-[20px]">
                    <div className="w-[100px] h-[100px] mx-auto text-center rounded-full overflow-hidden">
                        <img
                            src={profilePhoto.previewUrl ? profilePhoto.previewUrl : ProfileAvatar}
                            className="w-full block h-full"
                            alt="avatar-photo"
                        />
                    </div>
                    <div className="flex justify-center w-full mt-[20px]">
                        <label
                            htmlFor="profile-picker"
                            className="block bg-primary cursor-pointer text-white text-[15px] font-[500] px-[15px] rounded-full py-[6px]"
                        >
                            Pick Profile
                        </label>
                        <input
                            onChange={handleInputFileChange}
                            type="file"
                            className="hidden"
                            id="profile-picker"
                        />
                    </div>
                </div>
                <div className="flex justify-end flex-col items-center h-[200px] ">
                    <div className="w-[200px] mb-[40px]">
                        <LoadingButton
                            onClick={handleUpload}
                            title="Upload"
                            isDisabled={user.isLoading}
                            isLoading={user.isLoading}
                        />
                    </div>
                    <button
                        onClick={() => setCurrentModalIndex(1)}
                        className="block bg-gray-200 px-[100px] py-[10px] rounded-full text-[18px] text-gray-900"
                    >
                        Skip
                    </button>
                </div>
            </div>
        );
    };

    const setUserNameModalContent = () => {
        return (
            <div className="w-[500px] px-[50px] min-h-[500px] mt-[100px] rounded-[10px] bg-white mx-auto">
                <h1 className="font-[500] text-center pt-[20px] text-[31px] text-[#0f1419]">
                    Set Your username
                </h1>
                <div className="mt-[20px]">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={handleUsernameChange}
                        className="w-[100%] mt-[30px] h-[50px] text-[#000000] px-[20px] border border-gray-400 rounded-[6px]"
                    />
                </div>
                <div className="flex justify-end flex-col items-center h-[200px] ">
                    <div className="w-[200px] mb-[40px]">
                        <LoadingButton
                            onClick={handleUserName}
                            title="Save"
                            primary
                            isDisabled={user.isLoading || username.length < 4}
                            isLoading={user.isLoading}
                        />
                    </div>
                    <button
                        onClick={onSkipClick}
                        className="block bg-gray-200 px-[100px] py-[10px] rounded-full text-[18px] text-gray-900"
                    >
                        Skip
                    </button>
                </div>
            </div>
        );
    };

    const contents = [proifleModalContent, setUserNameModalContent];
    if (user.currentUser && user.currentUser.isNewUser) {
        return (
            <div className="fixed font-[Open Sans] top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.7)] z-40">
                {contents[currentModalIndex]()}
            </div>
        );
    } else {
        return <div />;
    }
}

export default ProfileModal;
