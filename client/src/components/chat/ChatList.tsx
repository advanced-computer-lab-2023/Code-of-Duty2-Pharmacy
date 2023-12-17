import Box from "@mui/material/Box";
import ChatPerson from "./ChatPerson";
import Button from "@mui/material/Button";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Ref, forwardRef, useContext, useState } from "react";
import React from "react";
import Tab from "@mui/material/Tab";
import useFirstPath from "../../hooks/useFirstPath";
import Patient from "../../types/Patient";
import { Doctor, Pharmacist } from "../../types";
import axios from "axios";
import config from "../../config/config";
import TabContext from "@mui/lab/TabContext";
import { TabList, TabPanel } from "@mui/lab";
import { Backdrop, CircularProgress, IconButton, Snackbar, Typography } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { NameSearchBar, goSearch } from "../search/NameSearchBar";
import { UserContext } from "../../contexts/UserContext";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}
const AlertRef = forwardRef(Alert);

interface Props {}
const ChatList: React.FC<Props> = () => {
  const usertype = useFirstPath();
  const currentUser = useContext(UserContext).user!;
  const [chats, setChats] = useState<
    [{ contactId: string; contactName: string; message: string; contactType: string; date: string; iread: boolean }]
  >([{ contactId: "", contactName: "", message: "", contactType: "Unknown", date: "", iread: false }]);
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
      if (patients.length === 0) fetchPatients();
      if (doctors.length === 0) fetchDoctors();
    } else if (usertype.includes("patient")) {
      if (pharmacists.length === 0) fetchPharmacists();
    }
    fetchChats();
  }, [patients, doctors, pharmacists]);

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

    setChats(await getChatHistory());

    if (pharmacists && doctors && patients) setLoading(false);
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

  const handleSearch = async (searchTerm: string, searchCollection: string) => {
    try {
      let responseData = await goSearch(searchTerm, searchCollection);
      if (searchCollection === "patients") {
        setPatients(responseData);
      } else if (searchCollection === "doctors") {
        setDoctors(responseData);
      } else if (searchCollection === "pharmacists") {
        setPharmacists(responseData);
      }
    } catch (err: any) {
      if (err.response?.status === 400) {
        if (searchCollection === "patients") {
          fetchPatients();
        } else if (searchCollection === "doctors") {
          fetchDoctors();
        } else if (searchCollection === "pharmacists") {
          fetchPharmacists();
        }
        return;
      }
      if (err.response?.status === 404) {
        if (searchCollection === "patients") {
          setPatients([]);
        } else if (searchCollection === "doctors") {
          setDoctors([]);
        } else if (searchCollection === "pharmacists") {
          setPharmacists([]);
        }
      } else {
        console.log(err);
      }
    }
  };

  const getOtherUserData = (id: string | null, currentUserType: string): { name: string; role: string } => {
    if (!id) return { name: "Unknown", role: "Unknown" };
    if (currentUserType === "PATIENT") {
      for (const pharmacist of pharmacists) {
        if (pharmacist._id === id) {
          return { name: pharmacist.name, role: "pharmacist" };
        }
      }
    } else if (currentUserType === "PHARMACIST") {
      for (const patient of patients) {
        if (patient._id === id) {
          return { name: patient.name, role: "patient" };
        }
      }
      for (const doctor of doctors) {
        if (doctor._id === id) {
          return { name: doctor.name, role: "doctor" };
        }
      }
    }
    return { name: "Unknown", role: "Unknown" };
  };

  const getChatHistory = async () => {
    const appId = config.TALKJS_APP_ID; // replace with your TalkJS app ID
    const secretKey = config.TALKJS_SECRET_KEY; // replace with your TalkJS secret key

    // Get a list of all conversations
    const conversationsResponse = await fetch(`https://api.talkjs.com/v1/${appId}/conversations`, {
      headers: {
        Authorization: `Bearer ${secretKey}`
      }
    });
    const responseJson = await conversationsResponse.json();
    const conversations = responseJson.data; // Adjust this line

    let myhistory: [
      { contactId: string; contactName: string; message: string; contactType: string; date: string; iread: boolean }
    ] = [{ contactId: "", contactName: "", message: "", contactType: "Unknown", date: "", iread: false }];

    // For each conversation, get the messages
    for (const conversation of conversations) {
      const messagesResponse = await fetch(
        `https://api.talkjs.com/v1/${appId}/conversations/${conversation.id}/messages`,
        {
          headers: {
            Authorization: `Bearer ${secretKey}`
          }
        }
      );

      const messages = await messagesResponse.json();
      // for (const message of messages.data) {
      const senderId = messages.data[0]?.senderId;
      const receiverId = Object.keys(conversation.participants).find((id) => id !== senderId);
      //   console.log(`Sender ID: ${senderId}, Receiver ID: ${receiverId}`);
      // }
      // console.log(messages);
      if (!senderId || !receiverId) continue;
      if (senderId !== currentUser.id && receiverId !== currentUser.id) continue;

      if (senderId === currentUser.id && receiverId === currentUser.id) continue;
      if (senderId === currentUser.id && receiverId?.length === 0) continue;
      if (receiverId === currentUser.id && senderId?.length === 0) continue;

      const formattedToday = `${new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      })}`;
      const formattedDate = `${new Date(messages.data[0]?.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
      })}`;
      const date = `${formattedDate === formattedToday ? "" : formattedDate} ${new Date(
        messages.data[0]?.createdAt
      ).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      })}`;
      const otherUser = await getOtherUserData(senderId === currentUser.id ? receiverId : senderId, currentUser.role);

      // if (myhistory[0].contactId === "") {
      //   myhistory.pop();
      // }
      myhistory.push({
        contactId: senderId === currentUser.id ? receiverId : senderId,
        contactName: otherUser && otherUser.name ? otherUser.name : "Unknown",
        message: messages.data[0]?.text,
        contactType: otherUser && otherUser.role ? otherUser.role : "Unknown",
        date: date,
        iread: messages.data[0]?.senderId === currentUser.id ? true : messages.data[0]?.readBy.length > 0 ? true : false
      });
    }
    return myhistory;
  };

  return (
    <div>
      {!showNewChat && (
        <Box
          sx={{
            m: 2,

            gap: 3,
            padding: "0.0rem",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
          }}
        >
          {" "}
          {/* <NameSearchBar
            searchCollection="chats"
            attribute="name"
            onSearch={() => {}}
            initialValue="Search for a person"
          /> */}
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
          {/*<ChatPerson
            name="AbdelRahman Saleh"
            lastmessage="Hello, I am here to ensure you are having a great experience with our app. If you have any problems make sure to report."
            time="12:54 PM"
            unread={2}
          />
          <hr style={{ width: "70%", marginLeft: "1.0rem", border: "1px solid #f0f0f0" }} />
          <br />
           <ChatPerson
            name="Mohamed Salah"
            lastmessage="Hello there, I have a question about the active ingredient in the medicine I am taking."
            time="09:54 AM"
            unread={10}
          />
          <hr style={{ width: "70%", marginLeft: "1.0rem", border: "1px solid #f0f0f0" }} />
          <br />
          <ChatPerson name="Ahmed Mohamed" lastmessage="Hello Dr!." time="10:35 PM" unread={1} />
          <hr style={{ width: "70%", marginLeft: "1.0rem", border: "1px solid #f0f0f0" }} />
          <br /> */}
          {!(chats && (chats.length > 1 || chats[0]?.contactId.length > 0)) && (
            <Typography variant="h6" style={{ textAlign: "center", marginTop: "2.0rem" }}>
              No Chats Yet...
              <br />
              Start a new chat!
            </Typography>
          )}
          {chats &&
            (chats.length > 1 || chats[0]?.contactId.length > 0) &&
            chats.map(
              (chat, index) =>
                chat.contactId.length > 0 &&
                (chat.contactType === "patient" ||
                  chat.contactType === "pharmacist" ||
                  chat.contactType === "doctor") && (
                  <div key={index}>
                    <ChatPerson
                      key={index}
                      name={`${chat.contactName}`}
                      lastmessage={`${chat.message}`}
                      time={`${chat.date}`}
                      unread={chat.iread ? undefined : ""}
                      href={`/${usertype}/current-chat?id=${chat.contactId}&role=${chat.contactType}`}
                    />
                    {index !== chats.length - 1 && (
                      <hr style={{ width: "70%", marginLeft: "1.0rem", border: "1px solid #f0f0f0" }} />
                    )}
                  </div>
                )
            )}
        </Box>
      )}

      {/* New Chat page */}
      {/* ------------------------------------------------------- */}

      {showNewChat && (
        <Box
          sx={{
            m: 2,
            gap: 3,
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
          <NameSearchBar
            searchCollection={value === "pat" ? "patients" : value === "doc" ? "doctors" : "pharmacists"}
            attribute="name"
            onSearch={handleSearch}
            initialValue="Search for a person"
          />

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
                    <ChatPerson
                      key={patient._id}
                      name={`${patient.name}`}
                      href={`/${usertype}/current-chat?id=${patient._id}&role=patient`}
                    />
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
                    <ChatPerson
                      key={doctor._id}
                      name={`${doctor.name}`}
                      href={`/${usertype}/current-chat?id=${doctor._id}&role=doctor`}
                    />
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
                    <ChatPerson
                      key={pharmacist._id}
                      name={`${pharmacist.name}`}
                      href={`/${usertype}/current-chat?id=${pharmacist._id}&role=pharmacist`}
                    />
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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ChatList;
