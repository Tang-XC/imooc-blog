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
