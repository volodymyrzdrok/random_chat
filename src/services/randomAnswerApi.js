import axios from 'axios';

const URL = 'https://api.chucknorris.io/jokes/random';
const API_Pixabay = '15400175-8ce22b8808542891276b8dfa1';
const randomNumber = Math.floor(Math.random() * 201);

export const fetchRandomAnswer = () => {
  return axios.get(URL).then(response => response.data.value);
};

export const fetchRandomImages = () => {
  return axios
    .get(
      `https://pixabay.com/api/?q=face_dog&per_page=200&key=${API_Pixabay}&image_type=photo&orientation=horizontal`,
    )
    .then(
      response => response.data.hits.map(el => el.webformatURL)[randomNumber],
    );
};
