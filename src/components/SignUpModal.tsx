import React, { ChangeEvent, useState } from "react";
import { GrClose } from "react-icons/gr";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import LoadingButton from "./LoadingButton";
import { IDob, ISignUpDetails } from "../types/user";
import { getDaysMonths, getYearLists, MONTHS } from "../utils/dateUtils";

interface Props {
    closeModal: () => void;
    signUpDetails: ISignUpDetails;
    dob: IDob;
    handleChange: (name: string) => (e: ChangeEvent<HTMLInputElement>) => void;
    signUpUsingPhone: boolean;
    setsignUpUsingPhone: (flag: boolean) => void;
    signUp: () => void;
    handleDobChange: (param: string) => (e: ChangeEvent<HTMLSelectElement>) => void;
    isLoading?: boolean;
    signUpSteps: number;
    setSignUpSteps: (param: number) => void;
    setsignupVerification: (verificationCode: string) => void;
    verifySignup: () => void;
    finishSignUp: () => void;
}

function SignUpModal({
    closeModal,
    dob,
    signUpDetails,
    handleChange,
    signUpUsingPhone,
    setsignUpUsingPhone,
    signUp,
    handleDobChange,
    isLoading,
    signUpSteps,
    setSignUpSteps,
    setsignupVerification,
    verifySignup,
    finishSignUp,
}: Props) {
    const [showPassword, setshowPassword] = useState(false);

    const stepOneContent = () => {
        return (
            <div className="mt-[20px] max-w-[80%] mx-auto">
                <div className="">
                    <h1 className="text-[31px] font-[600]">Create your account</h1>
                    <div className="pt-[20px]" />
                    <input
                        type="text"
                        placeholder="Name"
                        value={signUpDetails.name}
                        onChange={handleChange("name")}
                        className="w-[100%] h-[50px] px-[20px] border border-gray-400 rounded-[6px]"
                    />
                    <div className="py-3" />
                    <input
                        type={signUpUsingPhone ? "number" : "email"}
                        placeholder={signUpUsingPhone ? "Phone" : "Email"}
                        value={signUpDetails.email}
                        onChange={handleChange("email")}
                        className="w-[100%] h-[50px] px-[20px] border border-gray-400 rounded-[6px]"
                    />
                    <button
                        className="text-[#1d9bf0] text-[14px] text-right w-full pt-[10px]"
                        onClick={() => setsignUpUsingPhone(!signUpUsingPhone)}
                    >
                        Use {signUpUsingPhone ? "email" : "phone"} instead
                    </button>

                    <p className="text-[15px] font-[600] pt-[40px] pb-[5px]">Date of birth</p>
                    <span className="text-[14px] text-gray-500 leading-[20px] block">
                        This will not be shown publicly. Confirm your own age, even if this account
                        is for a business, a pet, or something else.
                    </span>

                    <div className="mt-[20px] flex">
                        <select
                            defaultValue={MONTHS[Number(dob.monthIndex)]}
                            onChange={handleDobChange("monthIndex")}
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
                            {getDaysMonths(dob).map((month: number, i: number) => {
                                return (
                                    <option value={month + 1} key={i}>
                                        {month + 1}
                                    </option>
                                );
                            })}
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
                            {getYearLists().map((year: number, i: number) => {
                                return (
                                    <option value={year} key={i}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="mt-[40px] mb-[30px]">
                        <button
                            onClick={() => setSignUpSteps(signUpSteps + 1)}
                            className="bg-[#000000] text-white font-[500] w-full py-[10px] rounded-full hover:bg-[#2d2d2d] transition-all duration-500"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const stepTwoContent = () => {
        return (
            <div className="max-w-[80%] mx-auto mt-[10px]">
                <h1 className="font-[700] text-[31px] text-[#0f1419]">Customise your experience</h1>
                <p className="font-[600] text-[20px] text-[#0f1419] mt-[20px]">
                    Track where you see Twitter content across the web
                </p>
                <div className="flex mt-[10px]">
                    <p className="text-[15px] text-[#0f1419]">
                        Twitter uses this data to personalise your experience. This web browsing
                        history will never be stored with your name, email, or phone number.
                    </p>
                    <span>
                        <input type="checkbox" defaultChecked />
                    </span>
                </div>
                <div className="mt-[40px]">
                    <p className="text-[15px] text-gray-500">
                        By signing up, you agree to our{" "}
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Terms, Privacy Policy
                        </a>
                        and
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Cookie use.
                        </a>
                        Twitter may use your contact information, including your email address and
                        phone number for purposes outlined in our Privacy Policy.
                        <a href="#" className="text-[#1d9bf0] hover:underline">
                            Learn more
                        </a>
                    </p>
                </div>
                <div className="mt-[40px] mb-[30px]">
                    <button
                        onClick={() => setSignUpSteps(signUpSteps + 1)}
                        className="bg-[#000000] text-white font-[500] w-full py-[10px] rounded-full hover:bg-[#2d2d2d] transition-all duration-500"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const stepThreeContent = () => {
        let isBtnDisabled;
        if (
            signUpDetails.email &&
            signUpDetails.name &&
            dob.day !== "Day" &&
            dob.monthIndex !== "Month" &&
            dob.year !== "Year"
        ) {
            isBtnDisabled = false;
        } else {
            isBtnDisabled = true;
        }
        return (
            <div className="max-w-[80%] mx-auto">
                <h1 className="font-[700] text-[31px] text-[#0f1419]">Create your account</h1>
                <div className="mt-[40px]">
                    <input
                        type="text"
                        defaultValue={signUpDetails.name}
                        placeholder="Name"
                        onFocus={() => {
                            setSignUpSteps(0);
                        }}
                        className="w-[100%] h-[50px] px-[20px] border border-gray-400 rounded-[6px] text-gray-500"
                    />
                    <div className="py-2" />
                    <input
                        type="email"
                        defaultValue={signUpDetails.email}
                        placeholder="Email"
                        onFocus={() => {
                            setSignUpSteps(0);
                        }}
                        className="w-[100%] h-[50px] px-[20px] border border-gray-400 rounded-[6px] text-gray-500"
                    />
                    <div className="py-2" />
                    <input
                        type="text"
                        defaultValue={`${dob.day}, ${MONTHS[Number(dob.monthIndex)].substring(
                            0,
                            3
                        )}, ${dob.year}`}
                        onFocus={() => {
                            setSignUpSteps(0);
                        }}
                        placeholder="Name"
                        className="w-[100%] h-[50px] px-[20px] border border-gray-400 rounded-[6px] text-gray-500"
                    />

                    <span className="block mt-[20px]">
                        <p className="text-[13px] text-gray-500 leading-[18px]">
                            By signing up, you agree to the{" "}
                            <a href="#" className="text-[#1d9bf0]">
                                Terms of Service
                            </a>
                            and
                            <a href="#" className="text-[#1d9bf0]">
                                Privacy Policy
                            </a>
                            , including
                            <a href="#" className="text-[#1d9bf0]">
                                Cookie use.
                            </a>
                            Twitter may use your contact information, including your email address
                            and phone number for purposes outlined in our Privacy Policy, like
                            keeping your account secure and personalising our services, including
                            ads.
                            <a href="#" className="text-[#1d9bf0]">
                                Learn more
                            </a>
                            . Others will be able to find you by email or phone number, when
                            provided, unless you choose otherwise
                            <a href="#" className="text-[#1d9bf0]">
                                here.
                            </a>
                        </p>
                    </span>

                    <div className="mt-[40px] mb-[30px]">
                        <LoadingButton
                            title="Sign up"
                            isDisabled={isBtnDisabled}
                            isLoading={isLoading}
                            primary
                            onClick={signUp}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const verifyAccount = () => {
        return (
            <div className="max-w-[80%] mx-auto">
                <div className="">
                    <h1 className="font-[700] text-[31px] text-[#0f1419]">We sent you a code</h1>
                    <p className="text-gray-500 text-[15px] ">
                        Enter it below to verify {signUpDetails.email}.
                    </p>

                    <input
                        type="number"
                        onChange={(e) => {
                            setsignupVerification(e.target.value);
                        }}
                        placeholder="Verification code"
                        className="w-[100%] mt-[30px] h-[50px] px-[20px] border border-gray-400 rounded-[6px] text-gray-500"
                    />
                    <button className="text-[12px] font-[500] pl-[5px] text-[#1d9bf0]">
                        Didn't recive an email?
                    </button>
                </div>

                <div className="mb-[30px] mt-[120px]">
                    <button
                        onClick={verifySignup}
                        className="bg-[#000000] text-white font-[500] w-full py-[10px] rounded-full hover:bg-[#2d2d2d] transition-all duration-500"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const setPasswordAccount = () => {
        return (
            <div className="max-w-[80%] mx-auto">
                <div className="">
                    <h1 className="font-[700] text-[31px] text-[#0f1419]">
                        You'll need a password.
                    </h1>
                    <p className="text-gray-500 text-[15px] ">
                        Make sure it’s 8 characters or more.
                    </p>

                    <div className="flex relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={handleChange("password")}
                            className="w-[100%] mt-[30px] h-[50px] text-[#000000] px-[20px] border border-gray-400 rounded-[6px]"
                        />
                        <div
                            className="absolute right-4 top-[45px] cursor-pointer"
                            onClick={() => setshowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaRegEyeSlash className="text-[20px]" />
                            ) : (
                                <FaRegEye className="text-[20px]" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-[120px] mb-[30px]">
                    <button
                        onClick={finishSignUp}
                        className="bg-[#000000] text-white font-[500] w-full py-[10px] rounded-full hover:bg-[#2d2d2d] transition-all duration-500"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    };

    const contents = [
        stepOneContent,
        stepTwoContent,
        stepThreeContent,
        verifyAccount,
        setPasswordAccount,
    ];

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.4)] z-50">
            {/* {modal card} */}
            <div className="max-h-[640px] pb-[10px] overflow-y-auto w-[586px] mx-auto rounded-[20px] mt-[60px] bg-white">
                {/* modal header */}
                <div className="flex items-center h-[60px]">
                    <div className="ml-[20px] cursor-pointer" onClick={closeModal}>
                        <GrClose />
                    </div>
                    <div>
                        <p className="pl-[20px] font-[500]">Setp {signUpSteps + 1} of 5</p>
                    </div>
                </div>
                {contents[signUpSteps]()}
            </div>
        </div>
    );
}

export default SignUpModal;
