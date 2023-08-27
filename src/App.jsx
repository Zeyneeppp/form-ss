import './App.scss';
import * as React from 'react';
import image from "./img/logos.svg";
import insta from "./img/insta.png";
import fcb from "./img/fcb.png";
import twitter from "./img/twitter.png";
import linkd from "./img/linkd.png";
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
    setSubmitted(true);
    const {name, email, discord, selectedCheckboxes, text} = formData;
    if (!name || !email || !discord || !selectedCheckboxes.length || !text || !validText()) return;
    console.log(formData);
  };

  const validText = () => {
    return formData.text.trim().split(/\s+/).length >= 70;
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked && formData.selectedCheckboxes.length >= 3) {
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
      <div className='image-corner'>
        <img src={palmsImage} alt="" />
      </div>
      <div className="image-container">
        <img src={image} alt="Image" />
      </div>
      <p> To assist us in accurately completing your certificate, please provide the following informations.</p>
      <br />

      <form onSubmit={handleSubmit} className="Inputs">
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

        <FormControl component="fieldset">
          <FormLabel>Field</FormLabel>
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
            <FormHelperText>
              At least one field must be selected.
            </FormHelperText>
          )}
        </FormControl>

        <TextField
          fullWidth
          id="text"
          label="What did you get from the trainings"
          multiline
          rows={4}
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          error={submitted && !validText()}
          helperText={!validText() ? `Minimum word count: ${70}` : ""}
        />

        <div className="send-button">
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              disabled={false}
            >
              Send
            </Button>
          </Stack>
        </div>
      </form>

      <p className="text">
        Cheers to all our amazing participants who made this Summer School an
        unforgettable journey! 🌞
      </p>

      <div className="social-icons">{/* Social icons here */}</div>
    </div>
  );
}

export default App;
