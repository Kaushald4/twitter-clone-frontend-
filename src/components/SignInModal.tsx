import React, { ChangeEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrApple, GrClose } from "react-icons/gr";
import ErrorMessage from "./ErrorMessage";
import IconButton from "./IconButton";
import TwitterLogo from "./TwitterLogo";

interface Props {
    closeModal: () => void;
    signInSteps: number;
    setSignInSteps: (steps: number) => void;
    signIn: () => void;
    handleSignInDetailsChange: (e: ChangeEvent<HTMLInputElement>) => void;
    signInCheck: () => void;
    authErrors: any;
    handleSignUpOpenModal: () => void;
    signInDetails: any;
}

function SignInModal({
    closeModal,
    setSignInSteps,
    signInSteps,
    signIn,
    handleSignInDetailsChange,
    signInCheck,
    handleSignUpOpenModal,
    authErrors,
    signInDetails,
}: Props) {
    const signInModalEmail = () => {
        return (
            <div className="h-[640px] w-[536px] mx-auto rounded-[20px] mt-[60px] bg-white">
                {/* modal header */}
                <div className="flex items-center w-full justify-between h-[40px]">
                    <div className="pt-[15px] ml-[20px] cursor-pointer" onClick={closeModal}>
                        <GrClose />
                    </div>
                    <div className="w-[30px] mt-[20px]">
                        <TwitterLogo primary />
                    </div>
                    <div></div>
                </div>
                <div className="flex justify-center mt-[30px]">
                    <div>
                        <h1 className="text-[31px] font-[600]">Sign in to Twitter</h1>
                        <div className="mt-[40px]">
                            <IconButton icon={<FcGoogle />} title="Sign in with Google" />
                            <span className="block py-2" />
                            <IconButton icon={<GrApple />} title="Sign in with Apple" />
                        </div>

                        <p className="text-center py-[20px]">or</p>
                        <input
                            type="text"
                            name="userIdentifier"
                            value={signInDetails.userIdentifier}
                            onChange={handleSignInDetailsChange}
                            placeholder="phone, email address or username"
                            className="border border-gray-400 rounded-[8px] h-[60px] w-[100%] px-[20px]"
                        />

                        <button
                            onClick={signInCheck}
                            className="text-white mt-[20px] font-[500] text-[15px] block w-full rounded-full py-[6px] bg-[#000000] transition-all duration-300 hover:bg-[#2e2e2e]"
                        >
                            Next
                        </button>
                        <button className="mt-[20px] block w-full font-[500] text-[15px] rounded-full py-[6px] border border-gray-300 transition-all duration-300 hover:bg-slate-300">
                            Forgot password?
                        </button>

                        <p className="mt-[50px] text-gray-500 text-[14px]">
                            Don't have an account?{" "}
                            <span
                                onClick={() => {
                                    closeModal();
                                    handleSignUpOpenModal();
                                }}
                                className="text-[#1d9bf0] cursor-pointer"
                            >
                                Sign up
                            </span>{" "}
                        </p>
                    </div>
                </div>
                <div className="mx-[40px] pt-[20px]">
                    <ErrorMessage isShow={authErrors ? true : false} message={authErrors} />
                </div>
            </div>
        );
    };
    const signInModalPassword = () => {
        return (
            <div className="h-[640px] w-[536px] mx-auto rounded-[20px] mt-[60px] bg-white">
                {/* modal header */}
                <div className="flex items-center w-full justify-between h-[40px]">
                    <div className="pt-[15px] ml-[20px] cursor-pointer" onClick={closeModal}>
                        <GrClose />
                    </div>
                    <div className="w-[30px] mt-[20px]">
                        <TwitterLogo primary />
                    </div>
                    <div></div>
                </div>
                <div className="flex justify-center mt-[30px]">
                    <div className="w-[80%]">
                        <h1 className="text-[31px] font-[600] mb-[20px]">Enter your password</h1>

                        <input
                            type="password"
                            name="password"
                            value={signInDetails.password}
                            onChange={handleSignInDetailsChange}
                            placeholder="phone, email address or username"
                            className="border border-gray-400 rounded-[8px] h-[60px] w-[100%] px-[20px]"
                        />

                        <button
                            onClick={signIn}
                            className="text-white mt-[20px] font-[500] text-[15px] block w-full rounded-full py-[6px] bg-[#000000] transition-all duration-300 hover:bg-[#2e2e2e]"
                        >
                            Next
                        </button>

                        <p className="mt-[50px] text-gray-500 text-[14px]">
                            Forgot Password? <span className="text-[#1d9bf0]">Reset</span>
                        </p>
                    </div>
                </div>
                <div className="mx-[40px] pt-[20px]">
                    <ErrorMessage isShow={authErrors ? true : false} message={authErrors} />
                </div>
            </div>
        );
    };

    const signInModalContents = [signInModalEmail, signInModalPassword];

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.4)] z-50">
            {/* {modal card} */}
            {signInModalContents[signInSteps]()}
        </div>
    );
}

export default SignInModal;
