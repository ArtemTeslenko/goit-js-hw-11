import { refs } from './variables';

export function rendering(data) {
  const markup = createMarkup(data);
  refs.listEl.insertAdjacentHTML('beforeend', markup);
}

function createMarkup(data) {
  return data.hits.reduce(
    (acc, item) =>
      (acc += `<li><img src="${item.previewURL}" alt=""></img></li>`),
    ' '
  );
}
