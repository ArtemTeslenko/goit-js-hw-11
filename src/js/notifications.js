import Notiflix from 'notiflix';

export default class Notification {
  constructor() {
    this.option = this.textOptions();
  }
  textOptions() {
    const options = {
      noMatch:
        'Sorry, there are no images matching your search query. Please try again.',
      richEnd: "We're sorry, but you've reached the end of search results.",
    };

    return options;
  }
  getNotification(value) {
    Notiflix.Notify.failure(`${this.option[value]}`);
  }
}
