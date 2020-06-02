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
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();
