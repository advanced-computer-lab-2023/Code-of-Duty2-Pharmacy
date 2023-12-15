import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        padding: (theme) => theme.spacing(6, 0),
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        position: "static",
        bottom: 0,
        width: "100%",
        color: "white"
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          © {new Date().getFullYear()} El7a2ni. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
