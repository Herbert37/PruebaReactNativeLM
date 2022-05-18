export interface LoginData {
    email:   string;
    password: string;
}

export interface RegisterData {
    email:   string;
    password: string;
    name:   string;
}


export interface LoginResponse {
    user: User;
    token:   string;
}

export interface User {
    rol:    string;
    status: boolean;
    google: boolean;
    name: string;
    email: string;
    uid:    string;
    img?:   string;
}