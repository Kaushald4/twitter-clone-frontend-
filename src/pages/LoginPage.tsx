import React, { ChangeEvent, useEffect, useState } from "react";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";
import { IconButton, SignInModal, SignUpModal, TwitterLogo } from "../components";
import LoginBgPng from "../assets/login-bg.png";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import {
    finishSignUpAction,
    signInAction,
    signInCheckAction,
    signUpAction,
    signUpVerifyAction,
} from "../features/auth/authActions";
import { clearAuthErrors } from "../features/auth/authSlice";

const LoginPage = () => {
    const [showSigninModal, setshowSigninModal] = useState(false);
    const [showSignUpModal, setshowSignUpModal] = useState(false);
    const [signUpSteps, setSignUpSteps] = useState(0);
    const [signupVerification, setsignupVerification] = useState("");
    const [dob, setDob] = useState({
        monthIndex: "Month",
        day: "Day",
        year: "Year",
    });
    const [signUpDetails, setSignUpDetails] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [signUpUsingPhone, setsignUpUsingPhone] = useState(false);
    const [signInDetails, setSignInDetails] = useState({
        userIdentifier: "demouser@gmail.com",
        password: "12345",
    });
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        let user = localStorage.getItem("user");
        if (user) {
            navigate("/home", { replace: true });
        }
    }, []);

    // sign up
    const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setSignUpDetails((prevState) => {
            return {
                ...prevState,
                [name]: e.target.value,
            };
        });
    };
    const handleDobChange = (name: string) => (e: ChangeEvent<HTMLSelectElement>) => {
        setDob({ ...dob, [name]: e.target.value });
    };

    const handleSignUpOpenModal = () => {
        setshowSignUpModal(true);
    };
    const handleSignUpCloseModal = () => {
        setshowSignUpModal(false);
    };
    const signUp = () => {
        if (
            signUpDetails.email &&
            signUpDetails.name &&
            dob.day !== "Day" &&
            dob.monthIndex !== "Month" &&
            dob.year !== "Year"
        ) {
            const dobObj = new Date(
                Number(dob.year),
                Number(dob.monthIndex),
                Number(dob.day)
            ).toString();
            dispatch(
                signUpAction({
                    email: signUpDetails.email,
                    name: signUpDetails.name,
                    dob: dobObj,
                    next: partialSignUpSuccess,
                })
            );
        }
    };
    const verifySignup = () => {
        if (signupVerification.toString().length === 6) {
            dispatch(
                signUpVerifyAction({
                    code: signupVerification,
                    email: authState.user?.email,
                    next: verifySuccess,
                })
            );
        }
    };
    const finishSignUp = () => {
        if (signUpDetails.password && authState.user?.email) {
            dispatch(
                finishSignUpAction({
                    email: authState.user.email,
                    password: signUpDetails.password,
                    next: signUpSuccess,
                })
            );
        }
    };
    const partialSignUpSuccess = () => {
        setSignUpSteps(signUpSteps + 1);
    };
    const verifySuccess = () => {
        setSignUpSteps(signUpSteps + 1);
    };
    const signUpSuccess = () => {
        setSignUpSteps(0);
        navigate("/home", { replace: true });
    };

    //sign in
    const handleSigninOpenModal = () => {
        setshowSigninModal(true);
    };
    const handleSigninCloseModal = () => {
        setshowSigninModal(false);
        setSignUpSteps(0);
    };
    const handleSignInDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSignInDetails({ ...signInDetails, [e.target.name]: e.target.value });
    };

    const signInCheck = () => {
        dispatch(
            signInCheckAction({ data: signInDetails.userIdentifier, next: onSuccessSignInCheck })
        );
    };
    const onSuccessSignInCheck = (user: any) => {
        if (user && !user.isVerified) {
            setshowSigninModal(false);
            setshowSignUpModal(true);
            setSignUpSteps(3);
        } else if (user && user.isNewUser) {
            setshowSigninModal(false);
            setshowSignUpModal(true);
            setSignUpSteps(4);
        } else {
            setSignUpSteps(signUpSteps + 1);
        }
    };
    const signIn = () => {
        dispatch(
            signInAction({
                email: authState.user?.email,
                password: signInDetails.password,
                next: signInAuthSuccess,
            })
        );
    };

    const signInAuthSuccess = () => {
        setSignUpSteps(0);
        navigate("/home", { replace: true });
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(clearAuthErrors());
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, [authState.errors]);

    return (
        <div className="flex h-[98vh]">
            <div className="flex-[.7] relative">
                <div className="min-w-[360px] h-[100%]">
                    <img src={LoginBgPng} className="block w-full h-full" alt="twitter-bg" />
                </div>
                <div className="absolute z-10 w-[360px] left-[25%] top-[25%]">
                    <TwitterLogo white />
                </div>
            </div>
            <div className="flex-[.8] flex-shrink-0 fixed right-0 bg-white z-20 bottom-0 top-0 w-[700px]">
                <div className="pl-[40px] w-[80px] pt-[40px]">
                    <TwitterLogo primary />
                </div>
                <div className="pl-[40px] pt-[60px] font-[Open Sans]">
                    <h1 className="font-[800] text-[64px] text-[#0f1419]">Happening Now</h1>

                    <div className="w-[300px]">
                        <p className="text-[31px] pt-8 font-[700] text-[#0f1419]">
                            Join Twitter today.
                        </p>

                        <span className="block pt-[30px]" />

                        {/* {google button} */}
                        <IconButton
                            title="Sign up with Google"
                            icon={<FcGoogle className="text-[20px]" />}
                        />

                        <span className="py-2 block" />

                        {/* {apple button} */}
                        <IconButton
                            icon={<AiFillApple className="text-[20px]" />}
                            title="Signup with Apple"
                        />

                        <p className="text-center py-2">or</p>
                        <button
                            onClick={handleSignUpOpenModal}
                            className="border border-gray-200 bg-[#1d9bf0] text-[#FFFFFF] rounded-full flex items-center h-[40px] w-[300px] justify-center"
                        >
                            <span className="inline-block pl-2 font-[500] text-[15px]">
                                Sign up with phone number or email
                            </span>
                        </button>

                        <span className="text-[11px] text-gray-500 leading-[14px] pt-[10px] pl-[20px] block">
                            <span>By signing up, you agree to the </span>{" "}
                            <a href="#" className="text-[#1d9bf0]">
                                Terms of services
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-[#1d9bf0]">
                                Privacy policy
                            </a>
                            , including{" "}
                            <a href="#" className="text-[#1d9bf0]">
                                Cookie use.
                            </a>
                        </span>

                        <p className="font-[500] text-[17px] pt-[40px] text-[#0f1419]">
                            Already have an account
                        </p>

                        <button className="mt-[20px] border border-gray-200 text-[#1d9bf0] rounded-full flex items-center h-[40px] w-[300px] justify-center">
                            <span
                                className="inline-block pl-2 font-[500] text-[15px]"
                                onClick={handleSigninOpenModal}
                            >
                                Sign in
                            </span>
                        </button>

                        {/* {Signin Modal} */}
                        {showSigninModal ? (
                            <SignInModal
                                setSignInSteps={setSignUpSteps}
                                signInSteps={signUpSteps}
                                closeModal={handleSigninCloseModal}
                                signIn={signIn}
                                signInCheck={signInCheck}
                                handleSignUpOpenModal={handleSignUpOpenModal}
                                handleSignInDetailsChange={handleSignInDetailsChange}
                                authErrors={authState.errors}
                                signInDetails={signInDetails}
                            />
                        ) : (
                            <span />
                        )}

                        {showSignUpModal ? (
                            <SignUpModal
                                dob={dob}
                                handleChange={handleChange}
                                setsignUpUsingPhone={setsignUpUsingPhone}
                                signUpUsingPhone={signUpUsingPhone}
                                signUpDetails={signUpDetails}
                                closeModal={handleSignUpCloseModal}
                                signUp={signUp}
                                handleDobChange={handleDobChange}
                                isLoading={authState.isLoading}
                                setSignUpSteps={setSignUpSteps}
                                signUpSteps={signUpSteps}
                                setsignupVerification={setsignupVerification}
                                verifySignup={verifySignup}
                                finishSignUp={finishSignUp}
                            />
                        ) : (
                            <span />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
