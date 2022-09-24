import { refs } from './variables';
import * as notifications from './notifications';

export function rendering(data) {
  const markup = createMarkup(data);
  refs.listEl.insertAdjacentHTML('beforeend', markup);
}

//likes views comments downloads

function createMarkup(data) {
  if (data.hits.length === 0) {
    notifications.invalidSearchParams();
    return;
  }
  return data.hits.reduce(
    (
      acc,
      { likes, views, comments, downloads, tags, webformatURL, largeImageURL }
    ) =>
      (acc += `<li class="card"><div class="thumb"><img src="${webformatURL}" alt="${tags}" class="prev-img"></img></div>
      <ul class="card-info">
      <li class="card-item">
        <h2 class="card-header">likes</h2>
        <p class="card-data">${likes}</p>
      </li>
      <li class="card-item">
        <h2 class="card-header">views</h2>
        <p class="card-data">${views}</p>
      </li>
      <li class="card-item">
        <h2 class="card-header">comments</h2>
        <p class="card-data">${comments}</p>
      </li>
      <li class="card-item">
        <h2 class="card-header">downloads</h2>
        <p class="card-data">${downloads}</p>
      </li>
    </ul></li>`),
    ' '
  );
}
