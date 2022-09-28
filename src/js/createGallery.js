import { clearMarkup, rendering } from './rendering';
import { refs } from './variables';
import ImgService from './imgService';
import BtnControl from './btnControl';
import Notification from './notifications';

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtnEl.addEventListener('click', fetchImages);

const imgService = new ImgService();
const loadMoreBtn = new BtnControl({
  selector: '.load-more',
  hidden: true,
});

// TO DELETE ---------------------
const searchBtn = new BtnControl({
  selector: '.search',
  hidden: false,
});

const note = new Notification();

function onSearch(e) {
  e.preventDefault();

  clearMarkup();
  imgService.resetHits();
  imgService.query = e.currentTarget.elements.searchQuery.value;

  if (imgService.query === '') {
    return note.getNotification('noMatch');
  }

  loadMoreBtn.show();
  imgService.resetPage();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imgService.fetchImgs().then(data => {
    loadMoreBtn.enable();
    if (
      data.totalHits === imgService.hitsAmount &&
      imgService.hitsAmount >= 1
    ) {
      note.getNotification('richEnd');
      loadMoreBtn.hide();
    }
    return rendering(data);
  });
}
