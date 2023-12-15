import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

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
        background: (theme) => theme.palette.gradient
      }}
    >
      <Container maxWidth="lg">
        <Box>
          <Section>
            <Typography variant="h2" gutterBottom>
              El7a2ni Pharmacy
            </Typography>
            <Typography variant="body1" gutterBottom>
              Part of the El7a2ni Healthcare System. Providing high quality medical products for you and your family.
            </Typography>
          </Section>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
