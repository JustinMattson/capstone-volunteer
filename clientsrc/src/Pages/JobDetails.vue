<template>
  <div class="jobDetails container-fluid">
    <div class="row mt-3 border-cstm">
      <div class="col-12 text-center">
        <h1>{{job.title}}</h1>
      </div>
    </div>
    <div class="row mb-3 d-flex justify-content-center bg-primary p-3 border-cstm">
      <div class="col-6 d-flex justify-content-center align-self-center">
        <img :src="job.imgUrl" class="mx-img border border-secondary" />
      </div>
      <div class="col-4 offset-1">
        <div class="row d-flex justify-content-center">
          <div class="col-6 d-flex justify-content-end">
            <img :src="job.creator.picture" class="profile-pic border border-secondary" />
          </div>
          <div class="col-6">
            <div>{{job.creator.name}}</div>
            <div>{{profile.requesterRatings}} 5 FIX THIS BEFORE DEPLOY</div>
          </div>
        </div>
        <div class="row my-5 text-center">
          <div class="col-12">
            <p>General Location: {{job.generalLocation}}</p>
            <p>Estimated Hours: {{job.estimatedHours}}</p>
            <p>Time Frame: {{jobStart}} - {{jobEnd}}</p>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-12 button-bottom">
            <button class="btn btn-secondary btn-lg text-primary text-shadow">Apply to Help</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row d-flex justify-content-center border-cstm py-5">
      <div class="col-8">{{job.description}}</div>
    </div>
    <div
      class="row mb-3 d-flex justify-content-center bg-secondary text-primary text-shadow border-cstm p-3"
    >
      <div class="col-10 text-center">Comments</div>
    </div>
    <div class="row">
      <div class="col-12">
        <!-- <comment v-for="comment in comments" :key="_id" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
// import comment from "@/components/CommentComponent.vue";
export default {
  name: "jobDetails",
  data() {
    return {};
  },
  async mounted() {
    await this.$store.dispatch("getJobById", this.$route.params.jobId);
    this.$store.dispatch("getComments", this.$route.params.jobId);
    this.$store.dispatch("getQueuesByJobId", this.$route.params.jobId);
    // I was thinking that this would give us access to all of user profiles for our app, but I am not sure we are storing user profiles...
    // this.$store.dispatch("getAllProfiles");
  },
  computed: {
    job() {
      return this.$store.state.activeJob;
    },
    profile() {
      return this.$store.state.profile;
    },
    profiles() {
      return this.$store.state.profiles;
    },
    comments() {
      return this.$store.state.comments;
    },
    queues() {
      return this.$store.state.queues;
    },
    jobStart() {
      let data = this.$store.state.activeJob.startDate;
      return moment(String(data)).format("MM/DD/YYYY");
    },
    jobEnd() {
      let data = this.$store.state.activeJob.endDate;
      return moment(String(data)).format("MM/DD/YYYY");
    }
  },
  methods: {},
  components: {
    // comment
  }
};
</script>

<style scoped>
.mx-img {
  max-width: 40vw;
  border-radius: 10px;
  box-shadow: 4px 4px 5px black;
}
.profile-pic {
  height: 150px;
  width: 150px;
  border-radius: 30px;
  box-shadow: 4px 4px 5px black;
}
.button-bottom {
  position: absolute !important;
  bottom: 0 !important;
}
.text-shadow {
  text-shadow: 2px 2px black;
}
.border-cstm {
  border-bottom: 3px solid black;
}
</style>
