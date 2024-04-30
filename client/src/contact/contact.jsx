import React, { useRef } from "react";
import { Container, useMediaQuery, TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import emailjs from "@emailjs/browser";
import { AccountCircle, Email } from '@mui/icons-material';
import { toast } from "react-toastify";

const StyledContainer = styled(Container)(
  ({ theme }) => `
    && {
      padding: ${theme.spacing(4)};
      text-align: center;
      background-color: #F0F5EF;
      border-radius: ${theme.spacing(2)};
    }
  `
);

const Contact = () => {
  const forms = useRef();
  const matches = useMediaQuery('(max-width:330px)');


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_9wezbct", "template_x5j2db3", forms.current, {
        publicKey: "bdMf2fJuRRPbu0FfC",
      })
      .then(
        () => {
          toast.success("Thanks for contacting me !! If you need further assistance, feel free to ask.");
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error('An error occurred while sending the message');
        }
      );
  };

  return (
    <Box
      maxWidth={450}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      marginTop={7}
      padding={5}
      borderRadius={6}
      boxShadow={3}
      bgcolor="#F0F5EF"
    >
      {!matches ? (
        <Typography variant="h4" gutterBottom>
          Contact Me
        </Typography>
      ) : (
        <Typography variant="h4" gutterBottom>
          Contact
        </Typography>
      )}
      <form ref={forms} onSubmit={sendEmail}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="User_Name"
          required
          InputProps={{
            startAdornment: (
              <AccountCircle />
            ),
            sx: { borderRadius: 3 }
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="user_email"
          type="email"
          required
          InputProps={{
            startAdornment: (
              <Email />
            ),
            sx: { borderRadius: 3 }
          }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Message"
          name="message"
          multiline
          rows={3}
          required
          InputProps={{
            sx: { borderRadius: 3 }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ textAlign: "center", fontWeight: "bold", borderRadius: 2.5, mt: 1, "&:hover": { transform: "scale(1.04)" } }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Contact;
