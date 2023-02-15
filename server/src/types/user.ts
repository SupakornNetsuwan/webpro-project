export interface User {
    id: number;
    username: string;
    password: string;
    refreshToken: string;
    nickname:string;
    isAdmin: boolean;
}

export interface UserDetails {
    id: number;
    username: string;
    refreshToken: string;
    nickname:string;
    isAdmin: boolean;
}