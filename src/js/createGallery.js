import { clearMarkup, rendering } from './rendering';
import { refs } from './variables';
import ImgService from './imgService';
import BtnControl from './btnControl';
import { upBtnClassToggle } from './upButton';
import Notiflix from 'notiflix';
import { options } from './notifications';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtnEl.addEventListener('click', fetchImages);
window.addEventListener('scroll', upBtnClassToggle);

const imgService = new ImgService();
const loadMoreBtn = new BtnControl({
  selector: '.load-more',
  hidden: true,
});
const lightbox = new SimpleLightbox('.gallery a', {});
lightbox.on('show.simplelightbox', function () {});

function onSearch(e) {
  e.preventDefault();

  clearMarkup();
  imgService.resetHits();
  imgService.query = e.currentTarget.elements.searchQuery.value;

  if (imgService.query === '') {
    return Notiflix.Notify.failure(options.noMatch);
  }

  loadMoreBtn.show();
  imgService.resetPage();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imgService.fetchImgs().then(data => {
    loadMoreBtn.enable();
    if (data.totalHits > 0 && imgService.page < 3) {
      Notiflix.Notify.success(options.success(data.totalHits));
    }
    if (
      data.totalHits === imgService.hitsAmount &&
      imgService.hitsAmount >= 1
    ) {
      Notiflix.Notify.failure(options.richEnd);
      loadMoreBtn.hide();
    }

    rendering(data);
    lightbox.refresh();
    if (imgService.page > 2) {
      autoscroll();
    }
    return;
  });
}

function autoscroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
