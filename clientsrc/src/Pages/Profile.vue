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
    <div class="font-lg unbold">
      {{ profile.email }}
      <div class="text-muted unbold" style="font-size:12px">{{profile.id}}</div>
      <!-- Last Updated: {{prettyDate}}
      <br />-->
      <!-- <span class="text-danger" :style="{fontSize:fontSize}">{{profile.id}}</span> -->
    </div>
    <p class="text-muted unbold">Click on profile image to edit user profile.</p>

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
      <div class="row py-3 rounded-lg">
        <div class="col">
          <h3>Future Opportunites:</h3>
          <jobQueue
            v-for="jobQueue in jobQueues"
            :key="jobQueue.id"
            :jobQueue="jobQueue"
            v-show="jobQueue.jobId.jobStatus == 'pending'"
          />
        </div>
      </div>
      <div class="row py-3 bg-white rounded-lg">
        <div class="col">
          <h3>Opportunities Completed:</h3>
          <volunteerJob
            v-for="volunteerJob in volunteerJobs"
            :key="volunteerJob.id"
            :volunteerJob="volunteerJob"
            v-show="volunteerJob.jobStatus == 'completed'"
          />
        </div>
      </div>
      <div class="row py-3 rounded-lg">
        <div class="col">
          <h3>Requests You've Posted:</h3>
          <requesterJob
            v-for="requesterJob in requesterJobs"
            :key="requesterJob.id"
            :requesterJob="requesterJob"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JobQueue from "@/components/JobsQueueComponent.vue";
import VolunteerJob from "@/components/JobsCompletedComponent.vue";
import RequesterJob from "@/components/JobsRequestedComponent.vue";
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
    await this.$store.dispatch("getProfilePageData");
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    jobQueues() {
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
      let vr = this.$store.state.profile.volunteerRating || [];
      for (let index = 0; index < vr.length; index++) {
        total += vr[index];
      }
      let avg = total / vr.length;
      if (vr.length == 0) {
        return "No Rating";
      } else return avg.toFixed(1);
    },
    requesterAverage() {
      let total = 0;
      let vr = this.$store.state.profile.requesterRating || [];
      for (let index = 0; index < vr.length; index++) {
        total += vr[index];
      }
      let avg = total / vr.length;
      if (vr.length == 0) {
        return "No Rating";
      } else return avg.toFixed(1);
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
  },
  components: {
    JobQueue,
    VolunteerJob,
    RequesterJob
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap");
.unbold {
  font-family: "Balsamiq Sans", cursive;
}
.action {
  cursor: pointer;
}
.font-lg {
  font-size: 20pt;
}
img {
  max-width: 150px;
  max-height: 150px;
}
</style>
