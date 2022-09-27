import React, { useEffect, useState } from "react";
import {} from "react-icons";
import { AiOutlineCheck } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { IUser } from "../types/user";
import Container from "./Container";
import LoadingIndicator from "./LoadingIndicator";
import NavBarIconLink from "./NavBarIconLink";
import {
    TwitterBelIlcon,
    TwitterDotIlcon,
    TwitterFriendGroupIcon,
    TwitterHashIcon,
    TwitterHomeIcon,
    TwitterMessageIcon,
    TwitterProfileIcon,
} from "./SvgIcons";
import TwitterLogo from "./TwitterLogo";

interface UserResProps {
    isLoading: boolean;
    currentUser: IUser;
}

interface Props {
    user: UserResProps;
}

const SidebarHeader = ({ user }: Props) => {
    const [showProfileModel, setShowProfileModel] = useState(false);
    const navigate = useNavigate();

    const renderProfileImage = () => {
        return (
            <Container
                horizontal="between"
                vertical="center"
                hover
                onClick={showProfileModelHandle}
            >
                <Container horizontal="center" vertical="center">
                    <div className="w-[40px] h-[40px] rounded-full overflow-hidden group">
                        <img
                            src={user.currentUser && user.currentUser.profile_photo}
                            className="w-full h-full"
                            alt="profile-photo"
                        />
                    </div>
                    <div className="mx-[5px]" />
                    <div>
                        <p className="font-[500] capitalize">{user.currentUser?.name}</p>
                        <p className="font-[500] text-[12px] text-gray-500 capitalize">
                            @{user.currentUser?.username.substring(0, 10)}
                        </p>
                    </div>

                    <div className="absolute w-[300px]"></div>
                </Container>
                <div className="w-[20px]">
                    <TwitterDotIlcon />
                </div>
            </Container>
        );
    };

    const showProfileModelHandle = () => {
        setShowProfileModel(!showProfileModel);
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/", { replace: true });
    };

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (!user) {
            navigate("/", { replace: true });
        }
    }, []);

    return (
        <div className="mt-[20px] min-w-[22%]">
            <div className="fixed">
                <div className="w-[28px]">
                    <TwitterLogo primary />
                </div>
                <div className="mt-[20px] flex flex-col justify-between h-[90vh] pb-[20px]">
                    <div className="flex flex-col">
                        <NavBarIconLink to="/home" title="Home" Icon={TwitterHomeIcon} />
                        <NavBarIconLink to="/" title="Explore" Icon={TwitterHashIcon} />
                        <NavBarIconLink to="/" title="Communities" Icon={TwitterFriendGroupIcon} />
                        <NavBarIconLink to="/" title="Notifications" Icon={TwitterBelIlcon} />
                        <NavBarIconLink to="/" title="Messages" Icon={TwitterMessageIcon} />
                        <NavBarIconLink
                            to={`/${user.currentUser?.username}`}
                            title="Profile"
                            Icon={TwitterProfileIcon}
                            state={user.currentUser?._id}
                        />
                        <NavBarIconLink to="/" title="More" Icon={TwitterDotIlcon} />
                        <button className="bg-primary mt-[10px] text-white font-[500] py-[15px] w-[220px] rounded-full">
                            Tweet
                        </button>
                    </div>
                    <LoadingIndicator isLoading={user.isLoading}>
                        <div className="relative">
                            {renderProfileImage()}

                            {showProfileModel && (
                                <div className="absolute w-[280px] bg-white shadow-[0px_0px_10px_rgba(0,0,0,.2)] -top-[160px] rounded-[20px] px-[10px] py-[20px]">
                                    <Container horizontal="between" vertical="center">
                                        <Container horizontal="center" vertical="center">
                                            <div className="w-[40px] h-[40px] rounded-full overflow-hidden group">
                                                <img
                                                    src={
                                                        user.currentUser &&
                                                        user.currentUser.profile_photo
                                                    }
                                                    className="w-full h-full"
                                                    alt="profile-photo"
                                                />
                                            </div>
                                            <div className="mx-[5px]" />
                                            <div>
                                                <p className="font-[500] capitalize">
                                                    {user.currentUser?.name}
                                                </p>
                                                <p className="font-[500] text-[12px] text-gray-500 capitalize">
                                                    @{user.currentUser?.username.substring(0, 10)}
                                                </p>
                                            </div>
                                        </Container>
                                        <div>
                                            <AiOutlineCheck className="text-[#55d985]" />
                                        </div>
                                    </Container>
                                    <div
                                        onClick={logout}
                                        className="px-[10px] mt-[20px] py-[10px] font-[400] text-[14px] cursor-pointer hover:bg-gray-100 rounded-[10px]"
                                    >
                                        <p>
                                            Log Out of {user.currentUser && user.currentUser.name}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </LoadingIndicator>
                </div>
            </div>
        </div>
    );
};

export default SidebarHeader;
