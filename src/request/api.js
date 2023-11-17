import request from './request';

const URLS = {
  uploadImage: '/upload',
};

export const uploadImage = (data) => request({ method: 'post', url: URLS.uploadImage, data });