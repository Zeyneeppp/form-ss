import './App.scss';
import * as React from 'react';
import image from "./img/logo.png";
import tree from "./img/tree.png";
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
import hij from "./img/hij.png";
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from 'react';

function App() {

  //-------------------Text min 70 word hhh -------------
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const minWordCount = 70;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const validateInput = () => {
    if (!submitted) {
      return true; // makach erreur avant la soumission
    }
    
    const wordCount = inputValue.split(/\s+/).filter((word) => word !== '').length;
    return wordCount >= minWordCount;
  };

  //---------------- Max 3 fields
  const maxChecked = 3;
  const [checkedCount, setCheckedCount] = useState(0);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const newCount = isChecked ? checkedCount + 1 : checkedCount - 1;

    if (newCount <= maxChecked) {
      setCheckedCount(newCount);
    }
    // else => empêche la coche
  };

  //bool pour verifier user a coché plus de 3
  const hasExceededMaxChecked = checkedCount > maxChecked;
  //if yes (checker plus de 3 error = true)

 
  
  return (

    <div className="App">
      <div className="image-container">
        <img src={image} alt="Image" />
      </div>

      <div className='Inputs'>  
      <TextField fullWidth
        id="fullWidth"
        label="Full Name" 
        variant="outlined" 
      />
      <TextField fullWidth
       id="fullWidth" 
       label="Discord ID" 
       variant="outlined" 
      />
      <TextField fullWidth
        id="fullWidth" 
        type='email'
        label="E-mail Adresse" 
        variant="outlined" 
      />
      
      <FormControl>
       <FormLabel id="demo-checkbox-group-label">Field</FormLabel>
       <FormGroup aria-labelledby="demo-checkbox-group-label">
       <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} />}
            label="UI/UX Design"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} />}
            label="Web Dev"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} />}
            label="Git/Linux"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} />}
            label="Intro to AI"
          />
          <FormControlLabel
            control={<Checkbox onChange={handleCheckboxChange} />}
            label="3D Modeling"
          />
       </FormGroup>
       {hasExceededMaxChecked && (
          <FormHelperText>Maximum 3 Fields allowed.</FormHelperText>
        )}
      </FormControl>


      <TextField fullWidth
          id="fullWidth"
          label="What did u got from the trainings"
          multiline
          rows={4}
          value={inputValue}
          onChange={handleInputChange}
          error={!validateInput()}
          helperText={
            !validateInput() ? `Minimum word count: ${minWordCount}` : ''
          }
      />
      </div>



    <div className='send-button'>
    <Stack direction="row" spacing={2}>
      <Button type= "submit" variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
    </div>

    <p className="text">
        Cheers to all our amazing participants who made this Summer School an unforgettable journey! 🌞
    </p>

    
      {/* <div className="image-corner"> 
        <img src={tree} alt="Image-tree" />
      </div>  */}

    <div className='social-icons'>
      <a href=''>
        <button className='icon'>
          <img src= {fcb} alt='facebook-icon'/>
        </button>
      </a>

      <a href=''>
        <button className='icon'>
          <img src={twitter} alt='twitter-icon'/>
        </button>
      </a>

      <a href=''>
        <button className='icon'>
          <img src={insta} alt='insta-icon'/>
        </button>
      </a>

      <a href=''>
        <button className='icon'>
          <img src= {linkd} alt='linkd-icon'/>
        </button>
      </a>


    </div>

      
    </div>
  );
}

export default App;
