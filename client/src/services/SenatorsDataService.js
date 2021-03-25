import http from "../http-common";
class SenatorDataService {
  async getAll() {
    try {
      const all = await http.get("/senators");
      console.log("get allll", all)
      return {data:all.data.data};
    } catch (error) {
      console.log("errorrrrr", error)
      return {error: error};
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
      console.log("user", await user)
      return {data: user.data};
    } catch (error) {
      console.log("errorrrrr", error)
      return {error: error};
    }
  }

  update(id, data) {
    return http.put(`/senators/${id}`, data);
  }

  async delete(id) {
    try {
      const deleteuser = await http.delete(`/senators/${id}`);
      console.log("user", deleteuser)
      return {data: deleteuser.data};
    } catch (error) {
      console.log("errorrrrr", error)
      return {error};
    }
  }

  async sendMail(id, payload) {
    try {
      const mail = await http.post(`/senators/email/${id}`, payload);
      console.log("user", mail)
      return {data: mail.data};
    } catch (error) {
      console.log("errorrrrr", error)
      return {error};
    }
  }

}

export default new SenatorDataService();