import request from './request';
export function getDetail(data) {
  return request({
    url: '/article/details',
    data,
  });
}
export function getComments(data) {
  return request({
    url: '/article/comment/list',
    data,
  });
}
