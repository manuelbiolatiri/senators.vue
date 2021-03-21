import http from "../http-common";

class SenatorDataService {
  getAll() {
    return http.get("/senators");
  }

  get(id) {
    return http.get(`/senators/${id}`);
  }

  async create(data) {
    try {
      const user = await http.post("/login", data)
      return user.data;
    } catch (error) {
      console.log("errorrrrr", error)
      return error;
    }
  }

  update(id, data) {
    return http.put(`/senators/${id}`, data);
  }

  delete(id) {
    return http.delete(`/senators/${id}`);
  }

  deleteAll() {
    return http.delete(`/senators`);
  }

  findByTitle(title) {
    return http.get(`/senators?title=${title}`);
  }
}

export default new SenatorDataService();