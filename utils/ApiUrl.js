const baseUrl = "http://localhost:3012/api/v1/program/admin/private/"
const baseUrl_auth = "http://localhost:3012/api/v1/auth"
const baseUrl2 = "http://localhost:3012/api/v1/auth/payment"
const ApiUrl = {
  CREATE_CATEGORY: baseUrl + 'course_category',
  GET_CATEGORY_LIST: baseUrl + 'course_category',
  DELETE_CATEGORY: baseUrl + 'course_category',
  UPDATE_CATEGORY: baseUrl + 'course_category',
  GET_CATEGORY: baseUrl + 'course_category',


  // courses
  GET_ALL_COURSES: baseUrl + 'all-courses',
  CREATE_COURSE: baseUrl + 'course',
  UPDATE_COURSE: baseUrl + 'course',
  DETAIL_COURSE: baseUrl + 'course',
  DELETE_COURSE: baseUrl + 'course',

  // content
  GET_ALL_CONTENT: baseUrl + 'all-contents',
  CREAT_CONTENT: baseUrl + 'content',
  UPDATE_CONTENT: baseUrl + 'content',
  DETAIL_CONTENT: baseUrl + 'content',
  DELETE_CONTENT: baseUrl + 'content',

  // package
  GET_ALL_PACKAGES: baseUrl2 + 'private/subscriptions',
  CREATE_PACKAGE: baseUrl2 + 'private/subscriptions',
  UPDATE_PACKAGE_STATUS: (id) => `private/${baseUrl2}subscriptions/${id}/status`,


  // auth
  ADMIN_LOGIN: baseUrl_auth + '/public/login',


};
export default ApiUrl;
