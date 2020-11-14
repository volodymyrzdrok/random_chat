import axios from 'axios';

const URL = 'https://api.chucknorris.io/jokes/random';
const api_key = `c89f43b1c825df5dc6e73406f0f79577`;
const urlMovie = 'https://api.themoviedb.org/3/';
const randomNumber = Math.floor(Math.random() * 99);

export const fetchRandomAnswer = () => {
  return axios.get(URL).then(response => response.data.value);
};

export const fetchRandomImages = () => {
  return axios
    .get(`${urlMovie}movie/${'299534'}/credits?api_key=${api_key}`)
    .then(response => response.data.cast[randomNumber].profile_path);
};
