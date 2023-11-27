export interface LoginData {
    username: string
    password: string
}

export interface ChangePassWordData {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

export interface UpdateProfileData {
    name: string
    email: string
    phoneNumber: string
}