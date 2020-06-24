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
    profiles: [],
    profile: {},
    jobs: [],
    volunteerJobs: [],
    postedJobs: [],
    activeJob: {},
    comments: [],
    queues: [],
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setProfiles(state, profiles) {
      state.profiles = profiles;
    },
    setVolunteerJobs(state, volunteerJobs) {
      state.volunteerJobs = volunteerJobs;
    },
    setPostedJobs(state, postedJobs) {
      state.postedJobs = postedJobs;
    },
    //#region JOBS
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
    //#endregion

    //#region COMMENTS
    setAllComments(store, comments) {
      store.comments = comments;
    },
    setNewComment(store, comment) {
      store.comments.push(comment);
    },
    changeComment(store, comment) {
      let index = store.comments.findIndex((c) => c.id == comment.id);
      store.comments[index] = comment;
    },
    removeComment(store, id) {
      let index = store.comments.findIndex((c) => c.id == id);
      store.comments.splice(index, 1);
    },
    //#endregion

    //#region QUEUEUEUEUEUE
    setQueue(state, queues) {
      state.queues = queues;
    },
    addToQueue(state, queue) {
      state.queues.push(queue);
    },
    updateQueueStatus(state, queue) {
      let index = state.queues.findIndex((q) => q.id == queue.id);
      state.queues[index] = queue;
    },
    deleteQueue(state, id) {
      let index = state.queues.findIndex((q) => q.id == id);
      state.queues.splice(index, 1);
    },
    //#endregion
  },
  actions: {
    setBearer({ }, bearer) {
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
        let res = await api.delete("jobs/" + id);
        commit("removeJob", id);
      } catch (error) {
        console.error(error);
      }
    },
    async removeOldJob({ commit }, id) {
      try {
        commit("removeJob", id)
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion

    //#region PROFLIE
    async getJobsByVolunteerId({ commit }, id) {
      try {
        let res = await api.get("profile/" + id + "/jobs");
        commit("setVolunteerJobs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getJobsByRequesterId({ commit }, id) {
      try {
        let res = await api.get("profile/" + id + "/myJobs");
        commit("setPostedJobs", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getProfile({ commit, dispatch }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
        dispatch("getQueuesByProfileId", res.data.id)
        dispatch("getJobsByVolunteerId", res.data.id)
        dispatch("getJobsByRequesterId", res.data.id)
      } catch (error) {
        console.error(error);
      }
    },
    async getAllProfiles({ commit }) {
      try {
        let res = await api.get("profiles");
        commit("setProfiles", res.data);
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

    //#region COMMENTS
    async getComments({ commit }, id) {
      try {
        let res = await api.get("jobs/" + id + "/comments", id);
        commit("setAllComments", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async addComment({ commit }, newComment) {
      try {
        let res = await api.post("comments", newComment);
        commit("setNewComment", res.data);
        this.dispatch("getComments", newComment.jobId);
      } catch (error) {
        console.error(error);
      }
    },
    async editComment({ commit, dispatch }, update) {
      try {
        let data = await api.put("comments/" + update.id, update);
        commit("changeComment", data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit }, id) {
      try {
        let res = await api.delete("comments/" + id);
        commit("removeComment", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region QUEUEUEUEUEUEUE
    async getQueuesByProfileId({ commit }, id) {
      try {
        let res = await api.get("profile/" + id + "/queue");
        commit("setQueue", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getQueuesByJobId({ commit }, id) {
      try {
        let res = await api.get("jobs/" + id + "/queue");
        commit("setQueue", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createQueue({ commit }, obj) {
      try {
        let res = await api.post("queue", obj);
        commit("addToQueue", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async approveDeny({ commit }, obj) {
      let res = await api.put("queue/" + obj.id, obj);
      commit("updateQueueStatus", res.data);
      if (obj.jobApproval == "accepted") {
        await api.put("queue/" + obj.id + "/jobs", obj);
      }
    },
    async cancelQueue({ commit }, id) {
      let res = await api.delete("queue/" + id, id);
      if (res) {
        commit("deleteQueue", id);
      }
    },
    //#endregion

    //#region 
    async jobPosterRating({ commit }, obj) {
      try {
        let res1 = await api.put("profile/" + obj.creatorId + "/jr", obj)
      } catch (error) {
        console.error(error)
      }
    }
    //#endregion
  },
});
