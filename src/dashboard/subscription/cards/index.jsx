import {
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StarterCard from "./StarterCard";
import { Features } from "./features";
import {
  BtnSub,
  CustomBox,
  CustomGrid,
  HeadingText,
  StyledTableCell,
  StyledTableRow,
  Text,
} from "./styles";
import ProCard from "./ProCard";
import EnterpriseCard from "./EnterpriseCard";
import { Apps, MonetizationOn } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Cards = ({ onSelect }) => {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [tabValue, setTabValue] = useState(0);
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const [billingPeriod, setBillingPeriod] = useState(
    user?.subscription?.price === 99 ? "yearly" : "monthly"
  );

  console.log("Billing Period", billingPeriod);
  const [proBillingPeriod, setProBillingPeriod] = useState(
    user?.subscription?.price === 359.88 ? "yearly" : "monthly"
  );
  const [enterpriseBillingPeriod, setEnterpriseBillingPeriod] = useState(
    user?.subscription?.price === 1200 ? "yearly" : "monthly"
  );

  const handleBillingPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setProBillingPeriod(newPeriod);
    }
  };
  const handleProBillingPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setProBillingPeriod(newPeriod);
    }
  };

  const handleEnterpriseBillingPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setEnterpriseBillingPeriod(newPeriod);
    }
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (isSmallScreen) {
      setTabValue(0);
    }
  }, [isSmallScreen]);

  const convertToUnlimited = (value) => {
    return isNaN(value) ? value : value;
  };
  const [starterAnalysisType, setStarterAnalysisType] = useState("multi");
  return (
    <CustomGrid container>
      {isSmallScreen ? (
        <>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              scrollButtons="auto"
              sx={{
                backgroundColor: "#e5eaf2",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <Tab label="Starter Plan" wrapped />
              <Tab label="Pro Plan" wrapped />
              <Tab label="Enterprise Plan" wrapped />
            </Tabs>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {tabValue === 0 && (
              <Box
                sx={{
                  border: "1px  solid #e5eaf2",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "100%",
                  background: { xs: "white", md: "none" },
                }}
              >
                <StarterCard
                  onSelect={onSelect}
                  billingPeriod={billingPeriod}
                  handleBillingPeriodChange={handleBillingPeriodChange}
                  analysisType={starterAnalysisType}
                  setAnalysisType={setStarterAnalysisType}
                />
              </Box>
            )}
            {tabValue === 1 && (
              <Box
                sx={{
                  border: "1px  solid #e5eaf2",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "100%",
                  background: { xs: "#F0CB52", md: "none" },
                }}
              >
                <ProCard
                  onSelect={onSelect}
                  billingPeriod={proBillingPeriod}
                  handleBillingPeriodChange={handleProBillingPeriodChange}
                />
              </Box>
            )}
            {tabValue === 2 && (
              <Box
                sx={{
                  border: "1px  solid #e5eaf2",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "100%",
                  background: { xs: "#52F081", md: "none" },
                }}
              >
                <EnterpriseCard
                  onSelect={onSelect}
                  billingPeriod={enterpriseBillingPeriod}
                  handleBillingPeriodChange={
                    handleEnterpriseBillingPeriodChange
                  }
                />
              </Box>
            )}
          </Grid>
        </>
      ) : null}

      {isSmallScreen && (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          mt={2}
          sx={{
            border: "1px solid #F3F3F3",
            borderRadius: "12px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            backgroundColor: "#F3F3F3",
            width: "100%",
          }}
        >
          <Stack alignItems={"center"} spacing={1} p={1}>
            <HeadingText>Playing Big? Get a custom plan.</HeadingText>
            <BtnSub
              sx={{
                backgroundColor: "#1E4F6B !important",
                color: "#f3f3f3",
              }}
            >
              Contact Us
            </BtnSub>
          </Stack>
        </Grid>
      )}

      {!isSmallScreen ? (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "#CFFFD9",
          }}
        >
          <Table
            sx={{
              border: "0px",
            }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ backgroundColor: "#FFFFFF" }}>
                  <StarterCard
                    onSelect={onSelect}
                    billingPeriod={billingPeriod}
                    handleBillingPeriodChange={handleBillingPeriodChange}
                    analysisType={starterAnalysisType}
                    setAnalysisType={setStarterAnalysisType}
                  />
                </StyledTableCell>
                <StyledTableCell
                  sx={{
                    borderLeft: "1px solid #e5eaf2 !important",
                    borderRight: "1px solid #e5eaf2 !important",
                    backgroundColor: "#F0CB52",
                  }}
                >
                  <ProCard
                    onSelect={onSelect}
                    billingPeriod={proBillingPeriod}
                    handleBillingPeriodChange={handleProBillingPeriodChange}
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: "#52F081" }}>
                  <EnterpriseCard
                    onSelect={onSelect}
                    billingPeriod={enterpriseBillingPeriod}
                    handleBillingPeriodChange={
                      handleEnterpriseBillingPeriodChange
                    }
                  />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                borderTop: "0px",
              }}
            >
              {Features.map((feature) => (
                <StyledTableRow key={feature.id}>
                  <StyledTableCell sx={{ px: 2, backgroundColor: "#FFFFFF" }}>
                    <Chip
                      label={
                        feature.id === 0
                          ? starterAnalysisType === "single"
                            ? "✅ 1 analysis /payment"
                            : "✅ Upto 3 analysis /payment"
                          : feature.starterPlandescription
                      }
                      sx={{ fontFamily: "Poppins" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      borderLeft: "1px solid #e5eaf2 !important",
                      borderRight: "1px solid #e5eaf2 !important",
                      px: 2,
                      backgroundColor: "#F0CB52",
                    }}
                  >
                    <Chip
                      label={
                        feature.id === 0 && proBillingPeriod === "yearly"
                          ? "✅ Analyze up to 240 analysis/year"
                          : feature.proPlandescription
                      }
                      sx={{ fontFamily: "Poppins" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell sx={{ px: 2, backgroundColor: "#52F081" }}>
                    <Chip
                      label={feature.enterprisePlandescription || "-"}
                      sx={{ fontFamily: "Poppins" }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : tabValue === 0 ? (
        Features.map((feature) => (
          <CustomBox
            key={feature.id}
            sx={{ background: { xs: "white", md: "none" } }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                width: { xs: "100%", sm: "50%", md: "25%" },
              }}
            >
              <Text p={1}>
                {feature.id === 0
                  ? starterAnalysisType === "single"
                    ? "✅ 1 analysis /payment"
                    : "✅ Upto 3 analysis /payment"
                  : feature.starterPlandescription}
              </Text>
            </Grid>
          </CustomBox>
        ))
      ) : tabValue === 1 ? (
        Features.map((feature) => (
          <CustomBox
            key={feature.id}
            sx={{
              background: { xs: "#F0CB52", md: "none" },
              border: "1px solid #F3F3F3",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                width: { xs: "100%", sm: "50%", md: "25%" },
              }}
            >
              <Text p={1}>
                {feature.id === 0 && billingPeriod === "yearly"
                  ? "✅ Analyze up to 240 analysis/year"
                  : feature.proPlandescription}
              </Text>
            </Grid>
          </CustomBox>
        ))
      ) : tabValue === 2 ? (
        Features.map((feature) => (
          <CustomBox
            key={feature.id}
            sx={{
              background: {
                xs: "#52F081",
                md: "none",
                border: "1px solid #F3F3F3",
              },
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                width: { xs: "100%", sm: "50%", md: "25%" },
              }}
            >
              <Text p={1}>{feature.enterprisePlandescription || "-"}</Text>
            </Grid>
          </CustomBox>
        ))
      ) : null}
    </CustomGrid>
  );
};

export default Cards;
