import request from './request';
export function getHotTabs() {
  return request({ url: '/hot/tabs' });
}
export function getHotList(type) {
  return request({
    url: '/hot/list',
    data: {
      type,
    },
  });
}
export function getDefaultText() {
  return request({
    url: '/search/default-text',
  });
}
export function getSearchHot() {
  return request({
    url: '/search/hot-list',
  });
}
export function getSearchResult(data) {
  return request({
    url: '/search',
    data,
  });
}
