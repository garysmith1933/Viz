const axios = require('axios');
const jwt = require('jsonwebtoken');
const qs = require('qs');
const User = require('../../../db/models/user');

//User has logged into google. Google sends code to verify its you.
const googleOAuthHandler = async (req, res) => {
  //get code from query string that was sent to callback
  const code = req.query.code;

  //get id and access token with the code
  //Exchange authorization code for refresh and access tokens
  const url = process.env.GOOGLE_TOKEN_URL;
  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT,
    grant_type: 'authorization_code',
  };

  //Send code to google to get the user info
  const {
    data: { id_token, access_token },
  } = await googleIdAndAccesssToken(url, values);

  //get user with token
  const { given_name, email, email_verified, name, picture } =
    jwt.decode(id_token);
  if (email_verified === true) {
    const userInfo = await User.byGoogle(email, given_name);
    console.log('UserINFO');
    console.log(userInfo.id);
    const jwtToken = jwt.sign({ id: userInfo.id }, process.env.JWT);
    return jwtToken;
    // res.send(`
    // <html>
    //   <head>
    //     <script>
    //       window.localStorage.setItem('token', '${jwtToken}')
    //       window.document.location = '/'
    //     </script>
    //   </head>
    // </html>
    // `);
    //return 'Emial is verified';
  } else {
    return ' Email is not verified use another please';
  }
  //console.log(email, email_verified, name, picture);
  //const googleUserId = jwt.decode(access_token);
  //console.log({ access_token });
  //console.log({ data });

  //upsert the user

  //create a session

  // create access & refresh tokens

  //set cookies

  // redirect back to client

  //return 'Hello user this is from google auth ';
};

//Send code back to google to verify its you and google sends user info back
const googleIdAndAccesssToken = async (url, values) => {
  try {
    response = await axios.post(url, qs.stringify(values), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response;
  } catch (error) {
    console.error(
      '***Failed to authorize Google User***',
      error,
      '***Failed to authorize Google User***'
    );
    // TODO also send an error message like oops something went wrong put it in this route later
    //Res is not defined here so handle it
    return res.redirect(`${process.env.ORIGIN}/oauth/error`);
  }
};

module.exports = googleOAuthHandler;
