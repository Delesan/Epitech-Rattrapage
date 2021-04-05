const url = 'https//api.imgur.com/3/'
const id = 'f440458ff19dd9d'
const secret = '704243fe11f6d40419fb9e44c695928b67abba30'

fetch("https://api.imgur.com/oauth2/token", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));