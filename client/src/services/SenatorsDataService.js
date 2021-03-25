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

  async getAllStates() {
    try {
      const states = await http.get("/states");
      console.log("all states", states)
      return states.data.data;
    } catch (error) {
      console.log("error", error)
      return error;
    }
    
  }

  async get(id) {
    try {
      const user = await http.get(`/senators/${id}`);
      console.log("userrrrrrr",user)
      return user.data.data;
    } catch (error) {
      console.log("errorrrrr", error)
      return error;
    }
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

    async createSenator(data) {
    try {
      const user = await http.post("/senators", data)
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