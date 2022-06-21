const queryString = require('querystring');

const googleOAuthHandler = require('./googleOAuthHandler');

const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const response = await googleOAuthHandler(req, res);
    // const stuff = `
    //     <html>
    //       <head>
    //         <script>
    //           window.localStorage.setItem('token', '${jwtToken}')
    //           window.document.location = '/'
    //         </script>
    //       </head>
    //     </html>
    //     `;

    //res.send('Google OAuth Handler' + response);
    // const jstring = encodeURIComponent(response);
    res.redirect(process.env.ORIGIN + '/' + response);

    // res.send(`
    // <html>
    //   <head>
    //     <script>
    //       window.localStorage.setItem('token', '${response}')
    //       window.document.location = '/'
    //     </script>
    //   </head>
    // </html>
    // `);
  } catch (error) {
    console.error(error);
    //return res.redirect(process.env.ORIGIN);
  }
});

module.exports = router;
