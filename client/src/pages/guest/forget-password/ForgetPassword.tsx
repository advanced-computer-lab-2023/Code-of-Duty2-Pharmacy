import { useContext, useState } from "react";
import EmailForm from "./components/EmailForm";
import OTPForm from "./components/OTPForm";
import PasswordResetForm from "./components/PasswordResetForm";
import ForgetPasswordContextProvider, { ForgetPasswordContext } from "./contexts/ForgetPasswordContext";

const ForgotPassword = () => {
  return (
    <ForgetPasswordContextProvider>
      <ForgetPasswordComponent />
    </ForgetPasswordContextProvider>
  );
};

const ForgetPasswordComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const handlesubmit = (email: string) => {
    setEmail(email);
  };
  const { step, error } = useContext(ForgetPasswordContext);
  return (
    <div>
      {step === 1 && <EmailForm onSubmit={handlesubmit} />}

      {step === 2 && <OTPForm email={email} />}

      {step === 3 && <PasswordResetForm />}
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
};

export default ForgotPassword;
