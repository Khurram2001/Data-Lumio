import { Box, Button, List, ListItem } from "@mui/material";
import React from "react";
import { TextPop, Text } from "../Home";
import DataSecurityImg from "../../assets/images/data-security-img.png";
import privacyContent from "./privacyContent";

const SecurityCard = () => {
  return (
    <>
      <Box
        sx={{
          pl: { xs: 2, sm: 7 },
          pr: 2,
          py: 1.5,
          background: "#CFFFD9",
          borderRadius: { xs: "30px", md: "40px" },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: "center",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box>
            <TextPop sx={{ color: "#0A3134" }}>
              <span style={{ fontWeight: 600 }}>Effective Date:</span> 1 June,
              2025
            </TextPop>
            <TextPop sx={{ color: "#0A3134" }}>
              <span style={{ fontWeight: 600 }}>Last Updated:</span> 18 June,
              2025
            </TextPop>
          </Box>

          <Box sx={{ width: "230px" }}>
            <img src={DataSecurityImg} alt="" />
          </Box>
        </Box>

        <Box sx={{ pr: { xs: 0, sm: 5 } }}>
          {privacyContent.map((section, index) => (
            <Box key={index} mb={4}>
              <TextPop
                variant="h2"
                gutterBottom
                sx={{ color: "#0A3134", fontWeight: 700, fontSize: "20px" }}
              >
                {section.heading}
              </TextPop>

              <TextPop
                fontWeight={500}
                my={2}
                color="text.secondary"
                sx={{ color: "#0A3134" }}
                dangerouslySetInnerHTML={{ __html: section?.content }}
              >
                {/* {section.content} */}
              </TextPop>

              {section?.points && (
                <List>
                  {section.points.map((point, idx) => (
                    <ListItem
                      key={idx}
                      sx={{
                        display: "list-item",
                        pl: 1,
                        py: 0,
                        color: "#0A3134",
                        fontFamily: "Poppins",
                      }}
                    >
                      •{" "}
                      <Box
                        component="span"
                        sx={{
                          "& strong": {
                            fontWeight: 600,
                          },
                        }}
                        dangerouslySetInnerHTML={{ __html: point }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              {section?.conclusion ? (
                <TextPop
                  fontWeight={500}
                  my={2}
                  color="text.secondary"
                  sx={{
                    color: "#0A3134",
                    "& strong": {
                      fontWeight: 600,
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: section?.conclusion }}
                ></TextPop>
              ) : null}
            </Box>
          ))}
        </Box>
      </Box>

      <TextPop
        sx={{
          textAlign: "center",
          color: "#FFFFFF",
          fontStyle: "italic",
          my: 3,
          mt: 8,
        }}
      >
        Transparency is our priority. Reach out if you'd like more details about
        how we handle your data.
      </TextPop>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Button
          variant="contained"
          //   onClick={() => navigate("/login")}
          sx={{
            padding: { xs: "7px 30px", sm: "14px 66px" },
            background: "#F0CB52",
            color: "#0A3235",
            // my: { xs: 1, sm: 2 },
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            textTransform: "capitalize",
            "&:hover": { background: "#84F052" },
          }}
        >
          Send Us a Message
        </Button>
      </Box>
    </>
  );
};

export default SecurityCard;
