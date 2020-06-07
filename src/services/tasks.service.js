import http from "../http-common";
import authHeader from './auth-header';

class TaskDataService {
  getTasksByTeamId(id){
    return http.get(`/api/teams/${id}/tasks`, { headers: authHeader() });  
  }

  getAll() {
    return http.get("/api/tasks", { headers: authHeader() });  
  }
  
  get(id) {
    return http.get(`/api/tasks/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/api/tasks", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/api/tasks/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/api/tasks/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return http.delete(`/api/tasks`, { headers: authHeader() });
  }

  findByTitle(title) {
    console.log("inside find byd title in service ", title);
    return http.get(`/api/tasks/search/?title=${title}`, { headers: authHeader() });
  }
}

export default new TaskDataService();
