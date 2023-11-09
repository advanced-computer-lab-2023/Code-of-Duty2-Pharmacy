import { createContext } from "react";

interface ICheckoutContext {
  cartItems: any;
  total: any;
  addressData: any;
  setAddressData: any;
  paymentData: any;
  setPaymentData: any;
  handleCreateOrder: any;
  handleNext: any;
}

const CheckoutContext = createContext<ICheckoutContext>({
  cartItems: null,
  total: 0,
  addressData: "",
  setAddressData: () => {},
  paymentData: null,
  setPaymentData: () => {},
  handleCreateOrder: () => {},
  handleNext: () => {},
});

export default CheckoutContext;
