import http from "../http-common";
import authHeader from './auth-header';

class CommentDataService {
  getComments(id) {
    return http.get(`/api/task/${id}/comments`, { headers: authHeader() });  
  }
  
  createComment(data){
    console.log("Sending create comment request");
    return http.post(`/api/comments/`,data, { headers: authHeader() });  
  }

  deleteComment(id){
    console.log("Entered delete function in service");
    return http.delete(`/api/comments/${id}`, { headers: authHeader()});
  }

  editComment(id, data){
    return http.put(`/api/comments/${id}`, data, { headers: authHeader() });
  }
}

export default new CommentDataService();
