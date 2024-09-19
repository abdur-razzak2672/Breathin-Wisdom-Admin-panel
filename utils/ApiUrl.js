const baseUrl = "http://localhost:4001/api/v1/admin/"
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

};
export default ApiUrl;
