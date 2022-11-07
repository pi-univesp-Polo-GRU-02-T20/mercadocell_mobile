export interface RequestResponse<T> {
    data?: T;
    status: number;
}

export interface JWTResponse {
    id?: number;
    login?: string;
    token?: string;
    type?: string;
}