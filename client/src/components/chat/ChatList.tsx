import Box from "@mui/material/Box";
import ChatPerson from "./ChatPerson";
import Button from "@mui/material/Button";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Ref, forwardRef, useState } from "react";
import React from "react";
import Tab from "@mui/material/Tab";
import useFirstPath from "../../hooks/useFirstPath";
import Patient from "../../types/Patient";
import { Doctor, Pharmacist } from "../../types";
import axios from "axios";
import config from "../../config/config";
import TabContext from "@mui/lab/TabContext";
import { TabList, TabPanel } from "@mui/lab";
import { IconButton, Snackbar, Typography } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import ArrowBack from "@mui/icons-material/ArrowBack";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}
const AlertRef = forwardRef(Alert);

interface Props {}
const ChatList: React.FC<Props> = () => {
  const usertype = useFirstPath();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showNewChat, setShowNewChat] = useState<boolean>(false);
  const [value, setValue] = React.useState<string>(usertype.includes("pharmacist") ? "pat" : "pha");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [pharmacists, setPharmacists] = useState<Pharmacist[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("success");

  React.useEffect(() => {
    if (usertype.includes("pharmacist")) {
      fetchPatients();
      fetchDoctors();
    } else if (usertype.includes("patient")) {
      fetchPharmacists();
    }
  }, []);

  const fetchPatients = async () => {
    await axios
      .get(`${config.API_URL}/patients`)
      .then((res) => {
        setPatients(res.data);
      })
      .catch(() => {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Error fetching patients");
      });
  };
  const fetchDoctors = async () => {
    try {
      const docs = await axios.get<Doctor[]>(`${config.API_URL}/doctors`);
      setDoctors(docs.data);
    } catch (err) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error fetching doctors");
    }
  };
  const fetchPharmacists = async () => {
    await axios
      .get(`${config.API_URL}/pharmacists`)
      .then((res) => {
        setPharmacists(res.data);
      })
      .catch(() => {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Error fetching pharmacists");
      });
  };

  const fetchChats = async () => {
    setLoading(true);
    // await axios.get(`${config.API_URL}/chats`).then((res) => {
    //   setChats(res.data.chats);
    // });
    setLoading(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSnackbarClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <div>
      {!showNewChat && (
        <Box
          sx={{
            m: 2,

            gap: 3,
            padding: "2.0rem",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
          }}
        >
          {" "}
          <div style={{ paddingRight: "0.5rem", paddingBottom: "3.0rem", marginTop: "-1.5rem" }}>
            <Button
              variant="contained"
              onClick={() => {
                setShowNewChat(true);
              }}
              startIcon={<AddCommentIcon />}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                float: "right"
              }}
            >
              New Chat
            </Button>
          </div>
          <ChatPerson
            name="AbdelRahman Saleh"
            lastmessage="Hello Dr Ahmed, I have a question about the dosage of the medicine I will take."
            time="12:54 PM"
            unread={2}
          />
          {/* {index !== patients.length - 1 && ( */}
          <hr style={{ width: "70%", marginLeft: "1.0rem", border: "1px solid #f0f0f0" }} />
          {/* )} 
          <br />*/}
          <ChatPerson
            name="Mohamed Salah"
            lastmessage="Hello there, I have a question about the active ingredient in the medicine I am taking."
            time="09:54 AM"
            unread={10}
          />
          {/* {index !== patients.length - 1 && ( */}
          <hr style={{ width: "70%", marginLeft: "1.0rem", border: "1px solid #f0f0f0" }} />
          {/* )} 
          <br />*/}
          <ChatPerson name="Ahmed Mohamed" lastmessage="Hello Dr!." time="10:35 PM" unread={1} />
        </Box>
      )}

      {showNewChat && (
        <Box
          sx={{
            m: 2,

            gap: 3,
            padding: "2.0rem",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: "0.5rem",
              paddingBottom: "1.0rem",
              marginTop: "-1.5rem"
            }}
          >
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => {
                setShowNewChat(false);
              }}
              style={{}}
            >
              <ArrowBack fontSize="inherit" />
            </IconButton>
            {/* "start new chat" typography in the center */}
            <Typography variant="h5" style={{ textAlign: "center", flex: 1 }}>
              Start New Chat
            </Typography>
          </div>

          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              {usertype.includes("pharmacist") && <Tab value="pat" label="Patients" />}
              {usertype.includes("pharmacist") && <Tab value="doc" label="Doctors" />}
              {usertype.includes("patient") && <Tab value="pha" label="Pharmacists" />}
            </TabList>

            <TabPanel value="pat">
              {patients &&
                patients.map((patient, index) => (
                  <div key={patient._id + "p"}>
                    <ChatPerson key={patient._id} name={`${patient.name}`} />
                    {index !== patients.length - 1 && (
                      <hr style={{ width: "70%", marginLeft: "1.0rem", border: "1px solid #f0f0f0" }} />
                    )}
                  </div>
                ))}
            </TabPanel>
            <TabPanel value="doc">
              {doctors &&
                doctors.map((doctor, index) => (
                  <div key={doctor._id + "d"}>
                    <ChatPerson key={doctor._id} name={`${doctor.name}`} />
                    {index !== doctors.length - 1 && (
                      <hr style={{ width: "70%", marginLeft: "1.0rem", border: "1px solid #f0f0f0" }} />
                    )}
                  </div>
                ))}
            </TabPanel>
            <TabPanel value="pha">
              {pharmacists &&
                pharmacists.map((pharmacist, index) => (
                  <div key={pharmacist._id + "d"}>
                    <ChatPerson key={pharmacist._id} name={`${pharmacist.name}`} />
                    {index !== pharmacists.length - 1 && (
                      <hr style={{ width: "70%", marginLeft: "1.0rem", border: "1px solid #f0f0f0" }} />
                    )}
                  </div>
                ))}
            </TabPanel>
          </TabContext>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AlertRef onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </AlertRef>
      </Snackbar>
    </div>
  );
};

export default ChatList;
