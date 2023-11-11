import React, { useContext, useEffect, useState } from "react";
import "../../../public/pharmacistForm.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import config from "../../config/config";
import { Pharmacist } from "../../types";
import { uploadPharmacistDocument } from "../../services/upload";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

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
let myblack: string = "black";

const PharmacistAdditionalInfoForm = () => {
  // get current pharmacist
  const setLoggedInPharmacist = async () => {
    await axios
      .get<Pharmacist>(`${config.API_URL}/pharmacists/me/complete-info`)
      .then((res) => {
        setPharmacist(res.data);
        console.log("----", res.data);

        setGender(res.data.gender || "unspecified");
        console.log(res.data.gender);
        console.log(gender);
        setPhoneNum(res.data.mobileNumber || "");
        setDateOfBirth(res.data.dateOfBirth || null);
        setIDPreviewUrl(res.data.identification || "");
        setPharmacyDegreePreviewUrl(res.data.pharmacyDegree || "");
        setWorkingLicensePreviewUrl(res.data.workingLicense || "");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [pharmacist, setPharmacist] = useState<Pharmacist | null>(null);
  const theme = useContext(ThemeContext).theme;
  myblack = theme === "dark" ? "white" : "black";
  const [gender, setGender] = React.useState<"male" | "female" | "unspecified">(
    "unspecified"
  );
  const [phoneNum, setPhoneNum] = React.useState(
    pharmacist?.mobileNumber || ""
  );
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);
  const [pharmacyDegree, setPharmacyDegree] = React.useState<File | null>(null);
  const [workingLicense, setWorkingLicense] = React.useState<File | null>(null);
  const [selectedIdDocument, setSelectedIdDocument] = useState<File | null>(
    null
  );
  const [idPreviewUrl, setIDPreviewUrl] = useState<string | null>(null);
  const [pharmacyDegreePreviewUrl, setPharmacyDegreePreviewUrl] = useState<
    string | null
  >(null);
  const [workingLicensePreviewUrl, setWorkingLicensePreviewUrl] = useState<
    string | null
  >(null);
  const [policy, setPolicy] = useState(false);
  const [viewAlert, setViewAlert] = useState(false);

  const [nameColor, setNameColor] = useState(myblack);
  const [phoneColor, setPhoneColor] = useState(myblack);
  const [genderColor, setGenderColor] = useState(myblack);
  const [dobColor, setDobColor] = useState(myblack);
  const [idColor, setIdColor] = useState(myblack);
  const [degreeColor, setDegreeColor] = useState(myblack);
  const [licenseColor, setLicenseColor] = useState(myblack);
  const [loadopen, setLoadOpen] = React.useState(false);
  const handleLoadClose = () => {
    setLoadOpen(false);
  };
  const handleLoadOpen = () => {
    setLoadOpen(true);
  };

  // const resetIDPreview = () => {
  //   setSelectedIdDocument(null);
  //   setIDPreviewUrl(pharmacist?.identification || "");
  // };
  // const resetPharmacyDegreePreview = () => {
  //   setPharmacyDegree(null);
  // };
  // const resetWorkingLicensePreview = () => {
  //   setWorkingLicense(null);
  // };
  const handleSubmit = async () => {
    try {
      let finalIDUrl = idPreviewUrl;
      if (selectedIdDocument) {
        finalIDUrl = await uploadPharmacistDocument(selectedIdDocument);
      }
      let finalPharmacyDegreeUrl = pharmacyDegreePreviewUrl;
      if (pharmacyDegree) {
        finalPharmacyDegreeUrl = await uploadPharmacistDocument(pharmacyDegree);
      }
      let finalWorkingLicenseUrl = workingLicensePreviewUrl;
      if (workingLicense) {
        finalWorkingLicenseUrl = await uploadPharmacistDocument(workingLicense);
      }

      // check if all fields are filled
      if (
        !pharmacist ||
        !pharmacist?.name ||
        !pharmacist?.mobileNumber ||
        !pharmacist?.dateOfBirth ||
        pharmacist.gender === "unspecified" ||
        !finalIDUrl ||
        !finalPharmacyDegreeUrl ||
        !finalWorkingLicenseUrl ||
        !policy
      ) {
        // alert("Please fill all required fields");
        setViewAlert(true);

        if (!pharmacist?.name || pharmacist?.name === "") {
          setNameColor("red");
          console.log("name is null");
        } else {
          setNameColor(myblack);
          console.log("name is not null '" + pharmacist?.name + "'");
        }
        if (!pharmacist?.mobileNumber || pharmacist?.mobileNumber === "") {
          setPhoneColor("red");
        } else {
          setPhoneColor(myblack);
        }
        if (!pharmacist?.dateOfBirth || pharmacist?.dateOfBirth === null) {
          setDobColor("red");
        } else {
          setDobColor(myblack);
        }
        if (gender === "unspecified") {
          setGenderColor("red");
        } else {
          setGenderColor(myblack);
        }

        if (!finalIDUrl || finalIDUrl === "") {
          setIdColor("red");
        } else {
          setIdColor(myblack);
        }

        if (!finalPharmacyDegreeUrl || finalPharmacyDegreeUrl === "") {
          setDegreeColor("red");
        } else {
          setDegreeColor(myblack);
        }

        if (!finalWorkingLicenseUrl || finalWorkingLicenseUrl === "") {
          setLicenseColor("red");
        } else {
          setLicenseColor(myblack);
        }

        return;
      }
      setViewAlert(false);
      handleLoadOpen();

      pharmacist!.mobileNumber = phoneNum;
      pharmacist!.dateOfBirth = dateOfBirth!;
      pharmacist!.gender = gender;
      pharmacist!.identification = finalIDUrl!;
      pharmacist!.pharmacyDegree = finalPharmacyDegreeUrl!;
      pharmacist!.workingLicense = finalWorkingLicenseUrl!;
      // name is handled down below in the input field itself

      //patch request to update pharmacist
      await axios
        .patch(`${config.API_URL}/pharmacists/me/complete-info`, pharmacist)
        .then(() => {
          handleLoadClose();
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleIDUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const maxSize = 12 * 1024 * 1024; // 12 MB

      if (event.target.files[0].size > maxSize) {
        alert("File is too large, please select a file smaller than 12 MB.");
        return;
      }
      setSelectedIdDocument(event.target.files[0]);
      setIDPreviewUrl(URL.createObjectURL(event.target.files[0]));
      console.log("selectedIdDocument", selectedIdDocument);
    }
    event.target.value = "";
  };
  const handlePharmacyDegreeUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const maxSize = 12 * 1024 * 1024; // 12 MB

      if (event.target.files[0].size > maxSize) {
        alert("File is too large, please select a file smaller than 12 MB.");
        return;
      }
      setPharmacyDegree(event.target.files[0]);
      setPharmacyDegreePreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
    event.target.value = "";
  };
  const handleWorkingLicenseUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const maxSize = 12 * 1024 * 1024; // 12 MB

      if (event.target.files[0].size > maxSize) {
        alert("File is too large, please select a file smaller than 12 MB.");
        return;
      }
      setWorkingLicense(event.target.files[0]);
      setWorkingLicensePreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
    event.target.value = "";
  };

  const required = () => {
    return <span style={{ color: "red" }}>*</span>;
  };

  const uploadButton = (
    label: string,
    handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
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
          {label}
          <VisuallyHiddenInput
            accept="image/*,.pdf"
            id="upload-document"
            type="file"
            onChange={handleUpload}
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
    if (["unspecified", "male", "female"].includes(event.target.value))
      setGender(event.target.value as "unspecified" | "male" | "female");
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
              <Typography
                sx={{
                  fontSize: "14px",
                  color: nameColor,
                  display: "inline-block",
                }}
              >
                Your Name
              </Typography>
              {required()}{" "}
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
              <Typography
                sx={{
                  fontSize: "14px",
                  display: "inline-block",
                }}
              >
                Username
              </Typography>
              {required()}{" "}
              <input
                name="field2"
                disabled
                style={{ cursor: "not-allowed" }}
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
              <Typography
                sx={{
                  fontSize: "14px",
                  display: "inline-block",
                }}
              >
                Email Address
              </Typography>{" "}
              {required()}
              <input
                type="email"
                name="field3"
                disabled
                style={{ cursor: "not-allowed" }}
                defaultValue={pharmacist?.email}
              />
            </label>
            <label>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: phoneColor,
                  display: "inline-block",
                }}
              >
                Phone Number
              </Typography>
              {required()}
              <input
                type="text"
                name="field4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (pharmacist) pharmacist.mobileNumber = e.target.value;
                  setPhoneNum(e.target.value);
                }}
                defaultValue={pharmacist?.mobileNumber || phoneNum || ""}
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
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: genderColor,
                    display: "inline-block",
                  }}
                >
                  Gender
                </Typography>
                {required()}
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
              <Typography
                sx={{
                  fontSize: "14px",
                  color: dobColor,
                  display: "inline-block",
                }}
              >
                Date Of Birth
              </Typography>{" "}
              <input
                type="date"
                name="field6"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (pharmacist)
                    pharmacist.dateOfBirth = new Date(e.target.value);
                  setDateOfBirth(new Date(e.target.value));
                }}
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
              <Typography
                sx={{
                  fontSize: "14px",
                  color: idColor,
                  display: "inline-block",
                }}
              >
                Identifcation:
              </Typography>
              {required()} {"    "}
              {selectedIdDocument && (
                <p style={{ color: "#c0c0c0", display: "inline-block" }}>
                  selected: {selectedIdDocument.name}
                </p>
              )}
              {uploadButton("Upload Identification", handleIDUpload)}
              {idPreviewUrl && (
                <>
                  <a href={idPreviewUrl} download>
                    <IconButton
                      style={{ display: "inline", padding: "1px" }}
                      aria-label="delete"
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </a>{" "}
                  {!selectedIdDocument && idPreviewUrl && (
                    <p style={{ color: "#c0c0c0", display: "inline-block" }}>
                      (view already uploaded document)
                    </p>
                  )}
                </>
              )}
            </label>
            <label>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: degreeColor,
                  display: "inline-block",
                }}
              >
                Pharmacy Degree
              </Typography>
              {required()} {"    "}
              {pharmacyDegree && (
                <p style={{ color: "#c0c0c0", display: "inline-block" }}>
                  selected: {pharmacyDegree.name}
                </p>
              )}
              {uploadButton(
                "Upload Pharmacy Degree",
                handlePharmacyDegreeUpload
              )}
              {pharmacyDegreePreviewUrl && (
                <>
                  <a href={pharmacyDegreePreviewUrl} download>
                    <IconButton
                      style={{ display: "inline", padding: "1px" }}
                      aria-label="delete"
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </a>{" "}
                  {!pharmacyDegree && pharmacyDegreePreviewUrl && (
                    <p style={{ color: "#c0c0c0", display: "inline-block" }}>
                      (view already uploaded document)
                    </p>
                  )}
                </>
              )}
            </label>
            <label>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: licenseColor,
                  display: "inline-block",
                }}
              >
                Working License
              </Typography>
              {required()} {"    "}
              {workingLicense && (
                <p style={{ color: "#c0c0c0", display: "inline-block" }}>
                  selected: {workingLicense.name}
                </p>
              )}
              {uploadButton(
                "Upload Working License",
                handleWorkingLicenseUpload
              )}
              {workingLicensePreviewUrl && (
                <>
                  <a href={workingLicensePreviewUrl} download>
                    <IconButton
                      style={{ display: "inline", padding: "1px" }}
                      aria-label="delete"
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </a>{" "}
                  {!workingLicense && workingLicensePreviewUrl && (
                    <p style={{ color: "#c0c0c0", display: "inline-block" }}>
                      (view already uploaded document)
                    </p>
                  )}
                </>
              )}
            </label>
          </div>
          <div className="button-section">
            <span style={{ fontSize: "14px" }}>
              <input
                type="checkbox"
                name="field7"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPolicy(e.target.value === "on");
                }}
              />
              I hereby confirm that the information provided herein is accurate,
              correct and complete and that the documents submitted along with
              this application form are legitment and up to date, otherwise I
              will be subjected to legal actions.{" "}
            </span>
            <br />
            <br />
            {viewAlert && (
              <p style={{ color: "red" }}>
                Please fill all required fields and agree to the above check-box
              </p>
            )}
            <input
              type="button"
              name="Sign Up"
              value="Save"
              onClick={handleSubmit}
            />
          </div>
        </form>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (themee: any) => themee.zIndex.drawer + 1,
          }}
          open={loadopen}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default PharmacistAdditionalInfoForm;
