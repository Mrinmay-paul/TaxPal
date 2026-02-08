export interface TransactionLogType{
    description: string;
    amount: number;
    category: string;
    date: Date;
    notes?: string;
}