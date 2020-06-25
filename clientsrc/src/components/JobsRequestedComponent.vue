<template>
  <div class="requesterJobs container">
    <!-- Color 1 -->
    <div class="row bg-light border border-secondary rounded-lg mb-1 shadow" v-if="rIndex == 0">
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <router-link
          :to="{ name: 'job', params: { jobId: requesterJob.id } }"
        >{{requesterJob.title}}</router-link>
        <span class="unbold">{{when}}</span>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <span class="unbold">Job Status: {{requesterJob.jobStatus}}</span>
        <span title="Rate Volunteer(s)">
          <!-- TODO this star should only show once completed -->
          <i class="fas fa-star-half-alt text-warning action" alt="Ratings" @click="toggleRatings"></i>
        </span>
      </div>
      <!-- Ratings -->
      <div v-show="volunteerRatings" class="border border-top col-12">
        <VolunteerId
          v-for="volunteerId in requesterJob.volunteerIds"
          :key="volunteerId.id"
          :volunteerId="volunteerId"
          :requesterJob="requesterJob"
        />
      </div>
    </div>
    <!-- Alt Color -->
    <div class="row border border-secondary rounded-lg mb-1 shadow" v-if="rIndex == 1">
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <router-link
          :to="{ name: 'job', params: { jobId: requesterJob.id } }"
        >{{requesterJob.title}}</router-link>
        <span class="unbold">{{when}}</span>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <span class="unbold">Job Status: {{requesterJob.jobStatus}}</span>
        <span title="Rate Volunteer(s)">
          <!-- TODO this star should only show once completed -->
          <i class="fas fa-star-half-alt text-warning action" alt="Ratings" @click="toggleRatings"></i>
        </span>
      </div>
      <!-- Ratings -->
      <div v-show="volunteerRatings" class="border border-top col-12">
        <VolunteerId
          v-for="volunteerId in requesterJob.volunteerIds"
          :key="volunteerId.id"
          :volunteerId="volunteerId"
          :requesterJob="requesterJob"
        />
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
import VolunteerId from "@/components/RatingsComponent";
export default {
  name: "requesterJob",
  props: ["requesterJob"],
  data() {
    return {
      volunteerRatings: false
    };
  },
  computed: {
    rIndex() {
      let num = this.$store.state.postedJobs.findIndex(
        q => q.id == this.requesterJob.id
      );
      return num % 2;
    },
    when() {
      if (this.requesterJob.startDate == this.requesterJob.endDate) {
        return moment(String(this.requesterJob.startDate)).format("MM/DD/YYYY");
      } else {
        return (
          moment(String(this.requesterJob.startDate)).format("MM/DD/YYYY") +
          " - " +
          moment(String(this.requesterJob.endDate)).format("MM/DD/YYYY")
        );
      }
    }
  },
  methods: {
    toggleRatings() {
      this.volunteerRatings = !this.volunteerRatings;
    },
    volunteers() {
      let arr = this.$state.store.profile.find(
        p => p.id == this.requestorJob.volunteerIds
      );
    }
  },
  components: {
    VolunteerId
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
</style>