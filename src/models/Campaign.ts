export enum DispatchTypes {
    wallet = "wallet",
    code = "code",
    hybrid = "hybrid",
}

enum PaymentStatus {
    success = "success",
    failed = "failed",
    pending = "pending",
}

export interface WalletProvider {
    id?: number;
    name: string;
    code: string;
    icon: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Campaign {
    id?: number;
    name: string;
    description: string;
    dispatch_date: Date | string;
    status?: string;
    dispatch_type: DispatchTypes;
    filename: string;
    account_id: number;
    wallet_provider: string;
    contacts_file?: File;
    created_at?: Date;
    updated_at?: Date;

    payments?: Payment[];
}

export interface Payment {
    id: number
    firstname: string
    lastname: string
    phone: string
    amount: number
    reference: string
    status: PaymentStatus
    wallet_provider_id: number
    walletProvider: WalletProvider
    payment_campaign_id: number
    created_at: string
    updated_at: string
}
