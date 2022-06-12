
import { useRef,useState, useEffect } from 'react';
import {
    Button,
    Typography,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    InputAdornment,
    Checkbox,
    Grid,
    Paper,
    Avatar,
    IconButton,
  } from "@mui/material";

const paperStyle = {
    padding: 20,
    height: "auto",
    width: 380,
    margin: "20px auto",
};


const Login = ()=>{
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd,setPwd] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('')
    },[user,pwd])

    const handleSubmit = async(e)=>{
        e.preventDefault();

    }

    return(
        <>
            {success?(
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ):(
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <section>
                            <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <h1>Sign In</h1>
                            <form onSubmit={handleSubmit}>
                                <FormControl
                                    variant="standard"
                                    className="textfield"
                                    sx={{ margin: "8px" }}
                                    fullWidth
                                    required
                                >
                                    <InputLabel htmlFor="username">Username</InputLabel>
                                    <Input 
                                        type="text" 
                                        id='username'
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e)=> setUser(e.target.value)}
                                        value = {user}
                                        required 
                                    />
                                </FormControl>
                                <FormControl
                                    variant="standard"
                                    className="textfield"
                                    sx={{ margin: "8px" }}
                                    fullWidth
                                    required
                                >
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input 
                                        type="password" 
                                        id='password'
                                        onChange={(e)=> setPwd(e.target.value)}
                                        value = {pwd}
                                        required
                                    />
                                </FormControl>
                                <Button
                                    variant="contained"
                                    sx={{
                                        margin: "0",
                                        backgroundColor: "mediumblue",
                                        fontWeight: "600",
                                    }}
                                    type="submit"
                                    fullWidth
                                >
                                    Log In
                                </Button>
                            </form>
                            <p>
                                Need an Account?<br />
                                <span className="line">
                                    {/*put router link here*/}
                                    <a href="sign_up">Sign Up</a>
                                </span>
                            </p>
                        </section>
                    </Paper>
                </Grid>
                )
            }      
        </>
    )

}

export default Login