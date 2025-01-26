import React from "react";
import { Box, Typography, Container, Paper, Grid } from "@mui/material";

const WhatWeDoPage: React.FC = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            sx={{ mb: 3 }}
          >
            Our Mission
          </Typography>
          <Typography variant="h5" textAlign="center" sx={{ opacity: 0.9 }}>
            Bridging the gap between generosity and need
          </Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography
                variant="h4"
                color="primary"
                gutterBottom
                sx={{ mb: 4 }}
              >
                The Challenge
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
                In the devastating wildfire seasons of 2024 and 2025, California
                faced unprecedented destruction. Thousands of families were
                displaced, homes were destroyed, and entire communities faced
                immense challenges.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography
                variant="h4"
                color="primary"
                gutterBottom
                sx={{ mb: 4 }}
              >
                The Problem
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
                Shelters became overwhelmed by the mismatch between what was
                donated and what was truly needed. Essential items like hygiene
                products and medical supplies were often in short supply, while
                piles of clothing and canned goods sat untouched.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography
                variant="h4"
                color="primary"
                gutterBottom
                sx={{ mb: 4 }}
              >
                Our Solution
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem" }}>
                This inspired us to create Shelter Seek, a platform that bridges
                the gap between generosity and need. We empower shelters to
                share their real-time needs, enabling donors to respond with
                precision and purpose.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                bgcolor: "primary.main",
                color: "white",
                mt: 2,
                mb: 6,
              }}
            >
              <Typography
                variant="h5"
                textAlign="center"
                sx={{ fontStyle: "italic" }}
              >
                "Together, we can ensure that every act of kindness creates
                real, lasting change for those who need it most."
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhatWeDoPage;
