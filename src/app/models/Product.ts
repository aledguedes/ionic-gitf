export interface ProductReq {
    name: string;
    price: number,
    status: true,
    rating: number,
    cover: string;
    description: string;
}

export interface ProductRes {
    id: number
    name: string;
    price: number,
    status: true,
    rating: number,
    cover: string;
    description: string;
}