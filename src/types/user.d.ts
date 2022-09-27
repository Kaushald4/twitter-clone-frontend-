export interface IUser {
    name: string;
    email: string;
    password: string;
    profile_photo: string;
    cover_photo: string;
    phone_no: number;
    pass_changed_at: Date | undefined;
    forgot_password_token: string | undefined;
    forgot_password_expire: number | undefined;
    username: string;
    bio: string;
    isVerified: boolean;
    isNewUser: boolean;
    dob: Date;
    verificationCode: string;
    verificationCodeExpire: Date;
    _id: string;
    location: string;
    website: string;
    createdAt: Date;
}

export interface ISignUpDetails {
    name: string;
    email: string;
}
export interface IDob {
    monthIndex: string;
    day: string;
    year: string;
}
