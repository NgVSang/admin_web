export interface LoginData {
    email: string
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