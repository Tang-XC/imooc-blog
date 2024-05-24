import request from './request';
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data,
  });
}
