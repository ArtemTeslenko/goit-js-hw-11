import { clearMarkup, rendering } from './rendering';
import { refs } from './variables';
import ImgService from './imgService';
import * as notifications from './notifications';
import BtnControl from './btnControl';

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreClick);

const imgService = new ImgService();
const loadMoreBtn = new BtnControl({
  selector: '.load-more',
});

function onSearch(e) {
  e.preventDefault();

  clearMarkup();
  imgService.query = e.currentTarget.elements.searchQuery.value;
  if (imgService.query === '') {
    return notifications.invalidSearchParams();
  }
  imgService.resetPage();
  imgService.fetchImgs().then(rendering);
}

function onLoadMoreClick() {
  imgService.fetchImgs().then(rendering);
}
