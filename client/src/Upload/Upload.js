import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Button,
  CardActionArea,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import AudioFileIcon from '@mui/icons-material/AudioFile';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const image = 'https://i.ytimg.com/vi/LdeDIwzN0zU/maxresdefault.jpg';
  const [img, setImg] = useState(image);
  const [open,setOpen] = useState(false)
  //this is when the file is selected
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAgree = () => {
    setOpen(false);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);

    setImg(
      'https://i.guim.co.uk/img/media/c8d2ce29dc0112693a25995b06b75e387507ea8d/0_0_1082_649/master/1082.png?width=1200&height=900&quality=85&auto=format&fit=crop&s=ac914714823722273907ce983fc4c7a9'
    );
  };

  //this is when the file is saved
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    
    //get secure url from out server
    const { data } = await axios.get('/api/s3url');
    handleClickOpen();
    // post the image directley to the s3 bucket
    //post request to my server to store extra data
    //Send from front end to server backend. Backend sends back url
    const configuration = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { config } = await axios.put(data, selectedFile, configuration);
    setImg(config.url.split('?')[0]);
  };

  return (
    <Container maxWidth='xl'>
      <Grid
        sx={{
          marginTop: 6,
          marginBottom: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        container
      >
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component='img'
                height='400'
                image={img}
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  A Flick
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  What a beautiful flick What is it a baby with a wooden shoe?
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item>
          <h2>Audio Upload</h2>
          <form id='songUploadForm' onSubmit={(ev) => handleSubmit(ev)}>
            <input
              style={{ display: 'none' }}
              accept='image/*'
              id='songUpload'
              type='file'
              onChange={handleCapture}
            />
            <Tooltip title='Select Audio File'>
              <label htmlFor='songUpload'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                >
                  <AudioFileIcon fontSize='large' />
                </IconButton>
              </label>
            </Tooltip>
            <label>
              {selectedFile ? selectedFile.name : 'Select Audio File'}
            </label>
            . . .
            <Button type='submit' color='primary'>
              Save
            </Button>
          </form>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogTitle id="song-save-alert">
            {"Wanna save this song to your playlist?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText >
              Save this song to your playlist so that you can access anytime.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDisagree}>Disagree</Button>
            <Button onClick={handleAgree}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );
};

export default Upload;
