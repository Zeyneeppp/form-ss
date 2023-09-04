import './App.scss';
import * as React from 'react';
import image from "./img/logos.svg";
import insta from "./img/instagram.svg";
import fcb from "./img/facebook.svg";
import twitter from "./img/twitter.svg";
import linkd from "./img/linkedin.svg";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';
import palmsImage from "./img/palms.svg";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    discord: "",
    email: "",
    text: "",
    selectedCheckboxes: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fields = [
    "UI/UX Design",
    "Web Dev",
    "Git/Linux",
    "Intro to AI",
    "3D Modeling",
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setSubmitted(true);
    const { name, email, discord, selectedCheckboxes, text } = formData;
    if (
      !name ||
      !email ||
      !discord ||
      !selectedCheckboxes.length ||
      !text ||
      !validText()
    )
      return;

    const msg = document.getElementById("msg");
    msg.innerHTML = "";

    const body = {
      name,
      email,
      discord,
      text,
      fields: selectedCheckboxes,
    };

    fetch("https://form-ss-api.onrender.com/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.err) {
          msg.innerHTML = `<p class="error">${data.errors[0].msg}</p>`;
          msg.class = "error";
        } else {
          msg.innerHTML = `<p class="success">${data.msg}</p>`;
          msg.class = "success";
          document.getElementById("form").reset();
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const validText = () => {
    return formData.text.trim().split(/\s+/).length >= 50;
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked && formData.selectedCheckboxes.length >= 2) {
      return;
    }

    const updatedCheckboxes = isChecked
      ? [...formData.selectedCheckboxes, value]
      : formData.selectedCheckboxes.filter((item) => item !== value);

    setFormData({
      ...formData,
      selectedCheckboxes: updatedCheckboxes,
    });
  };

  return (
    <div className="App">
      <div className="image-corner">
        <img src={palmsImage} alt="" />
      </div>
      <div className="image-container">
        <img src={image} alt="Image" />
      </div>
      <p className="cheers-message">
        {" "}
        To assist us in accurately completing your certificate, please provide
        the following informations.
      </p>
      <br />
      <p>
        Please provide your full name as it should appear on the certificate.
      </p>
      <br />

      <form id="form" onSubmit={handleSubmit} className="Inputs">
        <TextField
          fullWidth
          id="name"
          label="Full Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={submitted && !formData.name.trim()}
        />
        <TextField
          fullWidth
          id="discord"
          label="Discord ID"
          variant="outlined"
          name="discord"
          value={formData.discord}
          onChange={handleInputChange}
          error={submitted && !formData.name.trim()}
        />
        <TextField
          fullWidth
          id="email"
          type="email"
          label="E-mail Adresse"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={submitted && !formData.name.trim()}
        />

        <FormControl className="checkboxes" component="fieldset">
          <FormLabel>Which field(s) did you attend?</FormLabel>
          <FormGroup>
            {fields.map((field) => (
              <FormControlLabel
                key={field}
                control={
                  <Checkbox
                    value={field}
                    checked={formData.selectedCheckboxes.includes(field)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={field}
              />
            ))}
          </FormGroup>
          {submitted && formData.selectedCheckboxes.length === 0 && (
            <FormHelperText className="helpertext error">
              At least one field must be selected.
            </FormHelperText>
          )}
        </FormControl>

        <TextField
          fullWidth
          id="text"
          label="What did you gain from the Summer School training?"
          multiline
          rows={4}
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          error={submitted && !validText()}
          helperText={!validText() ? `Minimum word count: ${50}` : ""}
        />

        <div className="send-button">
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={loading}
            >
              Send
            </Button>
          </Stack>
        </div>
      </form>
      <p id="msg"></p>

      <p className="cheers-message">
        Cheers to all our amazing participants who made this Summer School an
        unforgettable journey! 🌞
      </p>

      <div className="social-icons">
        {/* Social icons here */}
        <a href="">
          <button className="icon">
            <img src={fcb} alt="facebook-icon" />
          </button>
        </a>
        <a href="">
          <button className="icon">
            <img src={twitter} alt="twitter-icon" />
          </button>
        </a>
        <a href="">
          <button className="icon">
            <img src={insta} alt="insta-icon" />
          </button>
        </a>
        <a href="">
          <button className="icon">
            <img src={linkd} alt="linkd-icon" />
          </button>
        </a>
      </div>
    </div>
  );
}

export default App;
