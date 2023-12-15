import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { patientRegistrationRoute } from "../../data/routes/guestRoutes";
import { pharmacistRegistrationRoute } from "../../data/routes/guestRoutes";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import MedicationIcon from "@mui/icons-material/Medication";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ChatIcon from "@mui/icons-material/Chat";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import WalletIcon from "@mui/icons-material/Wallet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import SettingsSystemDaydreamIcon from "@mui/icons-material/SettingsSystemDaydream";

interface SectionProps {
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
  const [ref, setRef] = useState(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOpacity(entry.intersectionRatio);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i * 0.01)
      }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref]);

  return (
    <motion.div style={{ opacity }} transition={{ duration: 1 }}>
      <Box
        ref={setRef}
        sx={{
          width: "100%",
          padding: 2
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        color: (theme) => theme.palette.common.white,
        background: (theme) => theme.palette.complexGradient
      }}
    >
      <Container maxWidth="lg">
        <Section>
          <Grid container alignItems="center">
            <Grid
              item
              xs={12}
              md={6}
              order={{ xs: 1, md: 1 }}
              container
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <img src="/el7a2ni_logo.png" alt="Description of the image" />
              {/* <MedicationIcon style={{ fontSize: 600 }} /> */}
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
              <Typography variant="h2" gutterBottom>
                El7a2ni Pharmacy, the online pharmacy you can trust.
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                We believe that healthcare should be simple, effective, and accessible to all. Our online pharmacy
                platform is designed with you in mind, providing a user-friendly interface to connect you with a wide
                range of medical products and services.
              </Typography>
            </Grid>
          </Grid>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container justifyContent="center">
            <SettingsSystemDaydreamIcon style={{ fontSize: 240 }} />
          </Grid>
          <Typography variant="h2" gutterBottom>
            Part of the El7a2ni Healthcare System
          </Typography>
          <Typography variant="body1" gutterBottom>
            Our online pharmacy is one of two platforms on the <strong>El7a2ni Online Healthcare System</strong>, which
            also includes the <strong>El7a2ni Clinic platform</strong>. Together, these platforms provide a
            comprehensive suite of healthcare services, from online consultations with licensed physicians to the
            delivery of prescription medications and wellness products.
          </Typography>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
              <Typography variant="h2" gutterBottom>
                Medicine Catalog
              </Typography>
              <Typography variant="body1" gutterBottom>
                Browse through our extensive catalog of medicines. Find everything you need in one place. Whether you're
                looking for over-the-counter medication or prescription drugs, we've got you covered. Our user-friendly
                interface makes it easy to find and order the medicines you need.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 2 }}
              container
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <LocalPharmacyIcon style={{ fontSize: 240 }} />
            </Grid>
          </Grid>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 1 }}
              container
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <CreditCardIcon style={{ fontSize: 240 }} />
            </Grid>
            <Grid item xs={12} md={9} order={{ xs: 2, md: 2 }}>
              <Typography variant="h2" gutterBottom>
                Payment Options
              </Typography>
              <Typography variant="body1" gutterBottom>
                Pay with your credit card, use the El7a2ni e-wallet, or opt for cash on delivery. Choose the method that
                suits you best. We understand that everyone has different preferences when it comes to payment methods.
                That's why we offer a variety of options to cater to your needs.
              </Typography>
            </Grid>
          </Grid>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
              <Typography variant="h2" gutterBottom>
                Prescription Medicines
              </Typography>
              <Typography variant="body1" gutterBottom>
                Our platform is integrated with the El7a2ni Clinic application, allowing doctors to directly assign
                prescription medicines to patients. This ensures that you receive the correct medication as prescribed
                by your doctor. Plus, with our home delivery service, you can receive your medication right at your
                doorstep, making the process convenient and hassle-free.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 2 }}
              container
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <MedicationIcon style={{ fontSize: 240 }} />
            </Grid>
          </Grid>
        </Section>

        <Box mt={8} />

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 1 }}
              container
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <ChatIcon style={{ fontSize: 240 }} />
            </Grid>
            <Grid item xs={12} md={9} order={{ xs: 2, md: 2 }}>
              <Typography variant="h2" gutterBottom>
                Chat with Pharmacists
              </Typography>
              <Typography variant="body1" gutterBottom>
                Have questions or need advice? Chat with our professional pharmacists to get the help you need. Our team
                of experienced pharmacists is available to answer any questions you may have about your medication.
                Whether you're unsure about the side effects, dosage, or possible interactions with other drugs, our
                pharmacists can provide the information you need. With our chat feature, you can get your questions
                answered from the comfort of your own home.
              </Typography>
            </Grid>
          </Grid>
        </Section>

        <Box mt={8}>{/* <Divider sx={{ backgroundColor: "white" }} /> */}</Box>

        <Section>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
              <Typography variant="h2" gutterBottom>
                Join Us!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Become a part of our community. Join us today and start your journey towards better health.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Create your{" "}
                <NavLink to={patientRegistrationRoute.path} style={{ color: "lightblue" }}>
                  patient account
                </NavLink>
                , or{" "}
                <NavLink to={pharmacistRegistrationRoute.path} style={{ color: "lightblue" }}>
                  apply as a pharmacist
                </NavLink>{" "}
                here.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              order={{ xs: 1, md: 2 }}
              container
              justifyContent={{ xs: "center", md: "flex-end" }}
            >
              <SpaRoundedIcon style={{ fontSize: 240 }} />
            </Grid>
          </Grid>
        </Section>

        <Box pb={20} />
      </Container>
    </Box>
  );
};

export default Home;
