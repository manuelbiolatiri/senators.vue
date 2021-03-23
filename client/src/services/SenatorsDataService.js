import http from "../http-common";
class SenatorDataService {
  async getAll() {
    try {
      const all = await http.get("/senators");
      console.log("get allll", all)
      return all.data.data;
    } catch (error) {
      console.log("errorrrrr", error)
      return error;
    }
    
  }

  get(id) {
    return http.get(`/senators/${id}`);
  }

  async create(data) {
    try {
      const user = await http.post("/signup", data)
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

}

export default new SenatorDataService();