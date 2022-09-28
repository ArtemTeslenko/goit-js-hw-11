import { refs } from './variables';
import Notification from './notifications';
import BtnControl from './btnControl';

const note = new Notification();
const loadMoreBtn = new BtnControl({
  selector: '.load-more',
});

export function rendering(data) {
  if (data.hits.length === 0) {
    note.getNotification('noMatch');
    loadMoreBtn.hide();
    return;
  }
  const markup = createMarkup(data);
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

export function clearMarkup() {
  refs.galleryEl.innerHTML = '';
}

function createMarkup(data) {
  return data.hits.reduce(
    (
      acc,
      { likes, views, comments, downloads, tags, webformatURL, largeImageURL }
    ) =>
      (acc += `<div class="photo-card">
        <div class="thumb">
          <img class="prev-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span class="info-data">${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span class="info-data">${views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span class="info-data">${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span class="info-data">${downloads}</span>
            </p>
          </div>
        </div>`),
    ' '
  );
}