const PIX_ROUTE = 'https://pixabay.com/api/?key=';
const PIX_KEY = '30103302-a3ef06cdfdc78e2e196d775c9';

export default class ImgService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
  }

  fetchImgs() {
    return fetch(
      `${PIX_ROUTE}${PIX_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    )
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        this.hits += data.hits.length;
        return data;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }

  get hitsAmount() {
    return this.hits;
  }
}
