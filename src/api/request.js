const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api';

const request = ({ url, data, method }) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      header: {
        icode: 'helloqianduanxunlianying',
      },
      success: ({ data, statusCode, header }) => {
        if (data.success) {
          resolve(data);
        } else {
          uni.showToast({
            title: data.message,
            icon: 'none',
            mask: true,
            duration: 3000,
          });
          reject(data.message);
        }
      },
      fail: (error) => {
        reject(error);
      },
      complete: () => {
        uni.hideLoading();
      },
    });
  });
};
export default request;
