import { rendering } from './rendering';
import { refs } from './variables';

const PIX_ROUTE = 'https://pixabay.com/api/';
const PIX_KEY = '30103302-a3ef06cdfdc78e2e196d775c9';

refs.formEl.addEventListener('input', onInput);

function onInput(e) {
  const searchingObj = getInputValue(e);
  fetchCats(searchingObj);
}

function fetchCats(searchingObj) {
  return fetch(
    `${PIX_ROUTE}?key=${PIX_KEY}&q=${searchingObj}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => response.json())
    .then(rendering);
}

function getInputValue(e) {
  return e.currentTarget.elements.searchQuery.value;
}
