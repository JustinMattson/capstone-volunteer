import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    profile: {},
    jobs: [],
    activeJob: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setJobs(state, jobs) {
      state.jobs = jobs;
    },
    setActiveJob(state, job) {
      state.activeJob = job;
    },
    updateJob(state, update) {
      let foundJob = state.jobs.find((j) => j.id == update.id);
      foundJob = update;
    },
    removeJob(state, id) {
      let index = state.jobs.findIndex((j) => j.id == id);
      state.jobs.splice(index, 1);
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    //#region VOLUNTEER OPPORTUNITIES (JOBS)
    async getAllJobs({ commit, dispatch }) {
      try {
        let res = await api.get("jobs");
        commit("setJobs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getJobById({ commit, dispatch }, id) {
      try {
        let res = await api.get("jobs/" + id);
        commit("setActiveJob", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async addJob({ commit, dispatch }, jobData) {
      try {
        let res = await api.post("jobs", jobData);
        dispatch("getAllJobs");
        router.push({ name: "job", params: { jobId: res.data.id } });
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async editJob({ commit, dispatch }, update) {
      try {
        let id = update.id;
        let res = await api.put("jobs/" + id, update);
        commit("updateJob", res.data);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteJob({ commit, dispatch }, id) {
      try {
        let res = await api.put("jobs/" + id);
        commit("removeJob", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region PROFLIE
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async updateProfile({ commit, dispatch }, dataObj) {
      try {
        let res = await api.put("profile/" + dataObj.id, dataObj);
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion
  },
});
