import http from "../http-common";
import authHeader from './auth-header';

const API_URL = '/api/test/';

class UserService {
  getPublicContent() {
    return http.get(API_URL + 'all');
  }

  getUserBoard() {
    return http.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
