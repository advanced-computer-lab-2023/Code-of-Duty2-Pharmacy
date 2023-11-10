import React, { useContext } from "react";
import "../../../public/pharmacistForm.css";
import { ThemeContext } from "../../contexts/ThemeContext";

const PharmacistAdditionalInfoForm = () => {
  const theme = useContext(ThemeContext).theme;

  return (
    <>
      <div
        className={theme !== "dark" ? "form-style-10" : "form-style-10-dark"}
      >
        <h1>
          Sign Up Now!
          <span>Sign up and tell us what you think of the site!</span>
        </h1>
        <form>
          <div className="section">
            <span>1</span>First Name & Address
          </div>
          <div className={theme !== "dark" ? "inner-wrap" : "inner-wrap-dark"}>
            <label>
              Your Full Name <input type="text" name="field1" />
            </label>
            <label>
              Address <textarea name="field2"></textarea>
            </label>
          </div>

          <div className="section">
            <span>2</span>Email & Phone
          </div>
          <div className={theme !== "dark" ? "inner-wrap" : "inner-wrap-dark"}>
            <label>
              Email Address <input type="email" name="field3" />
            </label>
            <label>
              Phone Number <input type="text" name="field4" />
            </label>
          </div>

          <div className="section">
            <span>3</span>Passwords
          </div>
          <div className={theme !== "dark" ? "inner-wrap" : "inner-wrap-dark"}>
            <label>
              Password <input type="password" name="field5" />
            </label>
            <label>
              Confirm Password <input type="password" name="field6" />
            </label>
          </div>
          <div className="button-section">
            <input type="submit" name="Sign Up" />
            <span className="privacy-policy">
              <input type="checkbox" name="field7" />
              You agree to our Terms and Policy.{" "}
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default PharmacistAdditionalInfoForm;
