import React from 'react'

const SpotifyLogin = () => {
    let AUTH = 'https://accounts.spotify.com/authorize'
    const CLIENT_ID =  'e12df55eb7a54cdaa1dd9f840f7e46a3'
    const REDIRECT_URI = 'http://localhost:3000'
    const RESPONSE_TYPE = "token"

    //able to get an access token. Will continue tomorrow -GS
    return (
        <>
        <h1>Spotify</h1> 
        <a href={`${AUTH}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}> Login With Spotify </a>
        </>
    )
}

export default SpotifyLogin