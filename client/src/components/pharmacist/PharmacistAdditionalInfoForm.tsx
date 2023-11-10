import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import "../../../public/pharmacistForm.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/joy";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import config from "../../config/config";
import { Pharmacist } from "../../types";
import { set } from "react-hook-form";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const PharmacistAdditionalInfoForm = () => {
  // get current pharmacist
  const setLoggedInPharmacist = async () => {
    await axios
      .get<Pharmacist>(`${config.API_URL}/pharmacists/me/complete-info`)
      .then((res) => {
        setPharmacist(res.data);
        // console.log("----", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [pharmacist, setPharmacist] = useState<Pharmacist | null>(null);
  const theme = useContext(ThemeContext).theme;
  const [gender, setGender] = React.useState("unspecified");
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [idPreviewUrl, setIDPreviewUrl] = useState<string | null>(null);

  const resetIDPreview = () => {
    setSelectedDocument(null);
    setIDPreviewUrl(pharmacist?.identification || "");
  };
  const handleIDUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedDocument(event.target.files[0]);
      setIDPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
    event.target.value = "";
  };
  const required = () => {
    return <span style={{ color: "red" }}>*</span>;
  };

  const uploadButton = () => {
    return (
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        style={{
          backgroundColor: "#3f51b5",
          color: "white",
          width: "57%",
          display: "flex",
        }}
      >
        <div>
          Upload Identification
          <VisuallyHiddenInput
            accept="image/*,.pdf"
            id="upload-document"
            type="file"
            onChange={handleIDUpload}
          />
        </div>
      </Button>
    );
  };
  const handleGender = (event: SelectChangeEvent) => {
    if (
      event.target.value !== "unspecified" &&
      event.target.value !== "male" &&
      event.target.value !== "female"
    ) {
      setGender("unspecified");
    }
    setGender(event.target.value);
    if (pharmacist) {
      if (["unspecified", "male", "female"].includes(event.target.value)) {
        pharmacist.gender = event.target.value as
          | "unspecified"
          | "male"
          | "female";
      } else {
        pharmacist.gender = "unspecified";
      }
    }
  };
  const formatDate = (date: Date) => {
    const d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  };

  useEffect(() => {
    setLoggedInPharmacist();
    setGender(pharmacist?.gender || "unspecified");
  }, []);

  return (
    <>
      <div
        className={theme !== "dark" ? "form-style-10" : "form-style-10-dark"}
      >
        <h1>
          Your Basic Info:
          <span>Welcome to our site, El7a2ni!</span>
        </h1>
        <form>
          <div className="section">
            <span>1</span>Name & Username
          </div>
          <div className={theme !== "dark" ? "inner-wrap" : "inner-wrap-dark"}>
            <label>
              Your Name{required()}{" "}
              <input
                type="text"
                name="field1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (pharmacist) pharmacist.name = e.target.value;
                }}
                defaultValue={pharmacist?.name || ""}
              />
            </label>
            <label>
              Username{required()}{" "}
              <input
                name="field2"
                disabled
                type="text"
                defaultValue={pharmacist?.username || ""}
              />
            </label>
          </div>

          <div className="section">
            <span>2</span>Email & Phone
          </div>
          <div className={theme !== "dark" ? "inner-wrap" : "inner-wrap-dark"}>
            <label>
              Email Address {required()}
              <input
                type="email"
                name="field3"
                disabled
                defaultValue={pharmacist?.email}
              />
            </label>
            <label>
              Phone Number {required()}
              <input
                type="text"
                name="field4"
                defaultValue={pharmacist?.mobileNumber}
              />
            </label>
          </div>

          <div className="section">
            <span>3</span>Demographics
          </div>
          <div className={theme !== "dark" ? "inner-wrap" : "inner-wrap-dark"}>
            {/* <label>
              Gender */}
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Gender{required()}
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={gender}
                label="Gender"
                onChange={handleGender}
              >
                <MenuItem value="unspecified">
                  <em>unspecified</em>
                </MenuItem>
                <MenuItem value="male">male</MenuItem>
                <MenuItem value="female">female</MenuItem>
              </Select>
            </FormControl>
            {/* </label> */}
            <label>
              Date Of Birth{" "}
              <input
                type="date"
                name="field6"
                defaultValue={
                  pharmacist ? formatDate(pharmacist.dateOfBirth) : ""
                }
              />
            </label>
          </div>
          <div className="section">
            <span>4</span>Documents
          </div>
          <div>
            <label>
              Identifcation {required()} {uploadButton()}
            </label>
            <label>
              Pharmacy Degree {required()}
              <input type="password" name="field6" />
            </label>
            <label>
              Working License {required()}
              <input type="password" name="field6" />
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
