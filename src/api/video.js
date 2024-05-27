import request from './request';

export function getVideoList(data) {
  return request({
    url: '/video/list',
    data,
  });
}
