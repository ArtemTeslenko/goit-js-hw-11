import { clearMarkup, rendering } from './rendering';
import { refs } from './variables';
import ImgService from './imgService';
import * as notifications from './notifications';
import BtnControl from './btnControl';

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtnEl.addEventListener('click', fetchImages);

const imgService = new ImgService();
const loadMoreBtn = new BtnControl({
  selector: '.load-more',
  hidden: true,
});

function onSearch(e) {
  e.preventDefault();

  clearMarkup();
  imgService.query = e.currentTarget.elements.searchQuery.value;
  if (imgService.query === '') {
    return notifications.invalidSearchParams();
  }

  loadMoreBtn.show();
  imgService.resetPage();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.desable();
  imgService.fetchImgs().then(data => {
    loadMoreBtn.enable();
    return rendering(data);
  });
}
