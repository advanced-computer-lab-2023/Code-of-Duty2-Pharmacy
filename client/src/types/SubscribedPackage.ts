export interface SubscribedPackage {
    packageId: string;
    startDate: Date;
    endDate: Date;
    status: 'subscribed' | 'unsubscribed' | 'cancelled';
}