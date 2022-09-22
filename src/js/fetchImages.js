import { rendering } from './rendering';

const PIX_ROUTE = 'https://pixabay.com/api/';
const PIX_KEY = '30103302-a3ef06cdfdc78e2e196d775c9';

function fetchCats() {
  return fetch(
    `${PIX_ROUTE}?key=${PIX_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => response.json())
    .then(rendering);
}

fetchCats();
