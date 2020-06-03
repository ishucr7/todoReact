import http from "../http-common";

class SeederDataService {

    getAllStatuses() {
        console.log("inside get All Statuses");
        return http.get("/api/statuses");
    }

    getAllLabels() {
        console.log("inside get All Labels");
        return http.get("/api/labels");
    }

    getAllPriorities() {
        console.log("inside get All Priorities");
        return http.get("/api/priorities");
    }
}

export default new SeederDataService();
