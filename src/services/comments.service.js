import http from "../http-common";
import authHeader from './auth-header';

class CommentDataService {
  getComments(id) {
    return http.get(`/api/user/comments/${id}`, { headers: authHeader() });  
  }
  createComment(data){
    console.log("Sending create comment request");
    return http.post(`/api/user/comments/`,data, { headers: authHeader() });  
  }

  deleteComment(id){
    console.log("Entered delete function in service");
    return http.delete(`/api/user/comments/${id}`, { headers: authHeader()});
  }

  editComment(id, data){
    return http.put(`/api/user/comments/${id}`, data, { headers: authHeader() });
  }
}

export default new CommentDataService();
