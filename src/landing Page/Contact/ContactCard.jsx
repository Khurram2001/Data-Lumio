import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import ContactImg from "../../assets/images/contact-img.png";
import { Text, TextPop } from "../Home";
import ContactForm from "../../Components/ContactForm"; // ✅ Ensure this path is correct

const ContactCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          px: 1.5,
          py: 1.5,
          background: "#CFFFD9",
          borderRadius: { xs: "30px", md: "60px" },
          display: "flex",
          justifyContent: "center",
          flexWrap: { xs: "wrap", lg: "nowrap" },
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ borderRadius: { xs: "30px", md: "60px" }, maxWidth: "450px" }}>
          <img src={ContactImg} alt="Contact Illustration" />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "#0A3134",
            flexDirection: "column",
            px: 2,
            gap: 2,
          }}
        >
          <TextPop sx={{ fontSize: "18px" }}>
            Have questions about how DataLumio works? Need assistance with your data upload?
          </TextPop>

          <Text variant="h3" sx={{ fontSize: "20px", fontWeight: 700, color: "#0A3134" }}>
            We’d love to hear from you!
          </Text>

          <TextPop sx={{ fontSize: "18px" }}>
            Whether you're a student working on a thesis or a researcher managing large datasets— we’re ready to support you.
          </TextPop>

          <Text variant="h3" sx={{ fontSize: "20px", fontWeight: 700, color: "#0A3134" }}>
            Email Us{" "}
            <Box component="span" sx={{ fontSize: "16px", fontWeight: 500 }}>
              (Info@datalumio.co)
            </Box>
          </Text>

          <TextPop sx={{ fontSize: "18px" }}>
            We aim to respond within 24–48 hours on business days.
          </TextPop>

          <Text variant="h3" sx={{ fontSize: "20px", fontWeight: 700, color: "#0A3134" }}>
            Let’s Collaborate
          </Text>

          <TextPop sx={{ fontSize: "18px" }}>
            Interested in integrating DataLumio into your workflow? Reach out to explore collaboration or bulk licensing.
          </TextPop>
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
        Got questions or feedback? Click the button below to drop us an email — we’d love to hear from you!
      </TextPop>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            padding: { xs: "7px 30px", sm: "14px 66px" },
            background: "#F0CB52",
            color: "#0A3235",
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            textTransform: "none", // ✅ This keeps "a" lowercase
            "&:hover": { background: "#84F052" },
          }}
        >
          Send Us a Message
        </Button>
      </Box>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "90%",
            maxWidth: 600,
            bgcolor: "background.paper",
            p: 4,
            m: "auto",
            mt: "10vh",
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Text variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#0A3134" }}>
            Write Your Message
          </Text>
          <ContactForm onClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </>
  );
};

export default ContactCard;
