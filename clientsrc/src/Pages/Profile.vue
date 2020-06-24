<template>
  <div class="profile text-center container">
    <!-- <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt />
    <p>{{ profile.email }}</p>-->
    <h1>
      Welcome
      <span :style="{color:color}">{{ profile.name }}</span>
    </h1>
    <img class="rounded-circle shadow-lg" :src="profile.picture" @click="toggleEdit" />
    <h5>
      {{ profile.email }}
      <br />
      <!-- Last Updated: {{prettyDate}}
      <br />-->
      <!-- <span class="text-danger" :style="{fontSize:fontSize}">{{profile.id}}</span> -->
    </h5>
    <p class="text-muted">Click on profile image to edit user profile.</p>

    <form class="form text-left" v-if="edit" style="width:100%;" @submit.prevent="updateProfile">
      <div class="form-group">
        <label class="m-0" for>Update Name...</label>
        <input
          type="text"
          name="name"
          v-model="profile.name"
          id
          class="form-control m-1 shadow border-warning"
          placeholder="Name..."
          required
        />
        <label class="m-0" for>Update Image URL...</label>
        <input
          type="text"
          name="picture"
          v-model="profile.picture"
          id
          class="form-control m-1 shadow border-warning"
          placeholder="ImgUrl..."
          required
        />
        <button type="submit" class="btn btn-warning my-2 shadow">Submit</button>
        <!-- <p class="text-warning">* Please refresh page after clicking submit.</p> -->
      </div>
    </form>

    <div class="container-fluid shadow-lg">
      <div class="row justify-content-center">
        <div class="col-6 py-5 bg-primary text-secondary">
          <h3>Volunteer Rating:</h3>
          <h1>{{volunteerAverage}}</h1>
        </div>
        <div class="col-6 py-5 bg-secondary text-primary">
          <h3>Job Poster Rating:</h3>
          <h1>{{requesterAverage}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>Opportunites Enrolled In:</h2>
          <div v-for="jobQueue in jobsQueue" :key="jobQueue.id" :jobQueue="jobQueue">
            <div v-if="jobQueue.jobId.jobStatus == 'pending'" class="row text-center">
              <div class="col-6">
                <h3>{{jobQueue.jobId.title}}</h3>
              </div>
              <div class="col-6">
                <h3>{{jobQueue.jobApproval}}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row py-5 bg-white">
        <div class="col">
          <h3>Opportunities Completed:</h3>
          <div
            v-for="volunteerJob in volunteerJobs"
            :key="volunteerJob.id"
            :volunteerJob="volunteerJob"
          >
            <div v-if="volunteerJob.jobStatus == 'completed'">
              <h1>{{volunteerJob.title}} {{volunteerJob.jobStatus}}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h3>Opportunities You've Posted:</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      edit: false,
      fontSize: "10px",
      color: "#808"

      // prettyDate: new Date(this.profile.createdAt).toLocaleDateString("eu-US", {
      //   year: "numeric",
      //   month: "short",
      //   day: "numeric",
      //   hour: "2-digit",
      //   minute: "2-digit"
      // })
    };
  },
  async mounted() {
    await this.$store.dispatch(
      "getQueuesByProfileId",
      this.$store.state.profile.id
    );
    await this.$store.dispatch(
      "getJobsByVolunteerId",
      this.$store.state.profile.id
    );
    await this.$store.dispatch(
      "getJobsByRequesterId",
      this.$store.state.profile.id
    );
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    jobsQueue() {
      return this.$store.state.queues;
    },
    volunteerJobs() {
      return this.$store.state.volunteerJobs;
    },
    requesterJobs() {
      return this.$store.state.postedJobs;
    },
    volunteerAverage() {
      let total = 0;
      let vr = this.$store.state.profile.volunteerRating;
      for (let index = 0; index < vr.length; index++) {
        total += vr[index];
      }
      let avg = total / vr.length;
      if (vr.length == 0) {
        return "No Rating";
      } else return avg;
    },
    requesterAverage() {
      let total = 0;
      let vr = this.$store.state.profile.requesterRating;
      for (let index = 0; index < vr.length; index++) {
        total += vr[index];
      }
      let avg = total / vr.length;
      if (vr.length == 0) {
        return "No Rating";
      } else return avg;
    }
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", this.profile);
      this.edit = false;
    },
    toggleEdit() {
      this.edit = !this.edit;
    },
    toggleMyBlogs() {
      this.myBlogs = !this.myBlogs;
    },
    toggleMyComments() {
      // NOTE may need to enable debugger here to get the button to function again.
      // debugger
      this.myComments = !this.myComments;
    }
  }
};
</script>

<style scoped>
img {
  max-width: 150px;
  max-height: 150px;
}
</style>
