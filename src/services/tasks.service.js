import http from "../http-common";
import authHeader from './auth-header';

class TaskDataService {
  getTasksByTeamId(id){
    return http.get(`/api/teams/${id}/tasks`, { headers: authHeader() });  
  }

  getAll() {
    return http.get("/api/user/tasks", { headers: authHeader() });  
  }
  getComments(id) {
    return http.get(`/api/user/comments/${id}`, { headers: authHeader() });  
  }

  get(id) {
    return http.get(`/api/user/tasks/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/api/user/tasks", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/api/user/tasks/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/api/user/tasks/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/api/user/tasks`, { headers: authHeader() });
  }

  findByTitle(title) {
    console.log("inside find byd title in service ", title);
    return http.get(`/api/user/tasks/search/?title=${title}`, { headers: authHeader() });
  }
}

export default new TaskDataService();
