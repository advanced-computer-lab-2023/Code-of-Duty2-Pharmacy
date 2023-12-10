export interface IHealthPackage {
  name: string;
  amountToPay: number;
  discounts: {
    gainedDoctorSessionDiscount: number;
    gainedPharmacyMedicinesDiscount: number;
    gainedFamilyMembersDiscount: number;
  };
  packageDurationInYears: number;
}
