
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//Not sure where this is going to be placed yet. We'll discuss this thursday

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Instructions = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{padding: '1.5rem'}}>
            <div>
                <Button onClick={handleOpen}>How To Use Visualizer</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="instruction" variant="h4" component="h2">
                        What you need to know
                        </Typography>


                       {/* I believe this should be moved to either a tab in the navbar on maybe on the landing page somewhere, what do yall think? */}
                       <Typography id="instruction" variant="h6" component="h2" style={{marginTop: '1rem'}}>
                        How does it work? 
                            <Typography id='instruction-text' sx={{mt: 2}}>
                                When a song is playing the diamonds speed and size will vary based on the freqency each diamond represent. 
                                The inner most diamonds represents the treble frequency, followed by lowMid, mid, highmid, and the outer most diamonds representing the bass frequency.
                                The higher the amplitude of that frequency, the faster and bigger the diamond representing it will be, constantly varying as the song goes on! 
                                Try different songs and see how the diamonds will react!
                            </Typography>
                        </Typography>
                       

                        <Typography id="instruction" variant="h6" component="h2" style={{marginTop: '1rem'}}>
                        Key Features
                        </Typography>
                        <Typography id="instruction-text" sx={{ mt: 2 }}>
                        Pressing the A key to increases the speed of the diamonds.
                        </Typography>
                        <Typography id="instruction-text" sx={{ mt: 2 }}>
                        Pressing the S key to decreases the speed of the diamonds.
                        </Typography>
                        <Typography id="instruction-text" sx={{ mt: 2 }}>
                        Press the W key to rotate the direction of diamonds.
                        </Typography>
                        <Typography id="instruction-text" sx={{ mt: 2 }}>
                        Press the Enter key to cycle through our color pallettes of diamonds.
                        </Typography>
                    </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default Instructions

