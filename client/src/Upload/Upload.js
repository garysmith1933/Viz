import React, { useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Upload = () => {
  const image = 'https://i.ytimg.com/vi/LdeDIwzN0zU/maxresdefault.jpg';
  const [img, setImg] = useState(image);

  const imageInput = document.querySelector('#imageInput');

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const file = imageInput.files[0];
    console.log('This is the file' + { file });
    //Send from front end to server backend. Backend sends back url
    const { data } = await axios.get('/api/s3url');
    const configuration = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { config } = await axios.put(data, file, configuration);

    setImg(config.url.split('?')[0]);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='140'
            image={img}
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Lizard
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <h2>Image Upload</h2>
      <form id='imageForm' onSubmit={(ev) => handleSubmit(ev)}>
        <input id='imageInput' type='file' accept='image/*' />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
};

export default Upload;
