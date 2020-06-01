import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/api/user/tasks", 
    {headers: {"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTkxMDUyMDg0LCJleHAiOjE1OTExMzg0ODR9.NodHGPrVl-2MWMWVE1a4MkXgS9VR-Fu9l6OM9dT6nUQ"}});
  }

  get(id) {
    return http.get(`/api/user/tasks/${id}`,
    {headers: {"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTkxMDUyMDg0LCJleHAiOjE1OTExMzg0ODR9.NodHGPrVl-2MWMWVE1a4MkXgS9VR-Fu9l6OM9dT6nUQ"}});
  }

  create(data) {
    return http.post("/api/user/tasks", data,
    {headers: {"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTkxMDUyMDg0LCJleHAiOjE1OTExMzg0ODR9.NodHGPrVl-2MWMWVE1a4MkXgS9VR-Fu9l6OM9dT6nUQ"}});

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
