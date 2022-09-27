// checks if response is valid (login token, expired or not)
export const isValidRequest = (data: any) => {
    if (data.response.data.message && data.response.data.message.includes("Invalid token!")) {
        localStorage.removeItem("user");
    }
    return data;
};
