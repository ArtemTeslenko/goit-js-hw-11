import Notiflix from 'notiflix';

export function invalidSearchParams() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
