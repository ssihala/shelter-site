import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const WhatWeDoPage: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ padding: '20px' }}>
            <Box textAlign="center" mb={12} mt={12}>
                <Typography variant="h3" fontWeight="bold">
                    Our Mission
                </Typography>
            </Box>
            <Box mb={3}>
                <Typography variant="body1" paragraph>
                    In the devastating wildfire seasons of 2024 and 2025, California faced unprecedented destruction. Thousands of families were displaced, homes were destroyed, and entire communities faced immense challenges. Amid this crisis, the generosity of people nationwide was inspiring—but it also revealed a critical problem.
                </Typography>
                <Typography variant="body1" paragraph>
                    Shelters became overwhelmed by the mismatch between what was donated and what was truly needed. Essential items like hygiene products and medical supplies were often in short supply, while piles of clothing and canned goods sat untouched. Families in need struggled to find shelters with the specific resources they required.
                </Typography>
                <Typography variant="body1" paragraph>
                    This inspired us to create Shelter Seek, a platform that bridges the gap between generosity and need. We empower shelters to share their real-time needs, enabling donors to respond with precision and purpose, while also allowing people to find shelters that can provide the resources they need.
                </Typography>
                <Typography variant="body1" paragraph>
                    Together, we can ensure that every act of kindness creates real, lasting change for those who need it most.
                </Typography>
            </Box>
        </Container>
    );
};

export default WhatWeDoPage;