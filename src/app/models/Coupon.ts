export interface CouponReq {
    code: string;
    discount: number,
    isPercentage: true,
    description: string;
    isActive: true,
    expiryDate: string;
    minimumOrderAmount: number,
}

export interface CouponRes {
    id: string;
    code: string;
    discount: number,
    isPercentage: true,
    description: string;
    isActive: true,
    expiryDate: string;
    minimumOrderAmount: number,
}