import http from "../http-common";
import authHeader from './auth-header';

class TutorialDataService {
  getAll() {
    return http.get("/api/user/tasks", { headers: authHeader() });  
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
    return http.get(`/api/user/tasks?title=${title}`, { headers: authHeader() });
  }
}

export default new TutorialDataService();
