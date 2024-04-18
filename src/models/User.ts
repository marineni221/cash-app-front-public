export interface User {
    id?: number,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    photo?: string,
    created_at?: Date,
    updated_at?: Date,
}