<template>
  <div class="requesterJobs row justify-content-center">
    <div class="col-md-8">
      <!-- Color 1 -->
      <div class="row bg-light border border-secondary rounded-lg mb-1 shadow" v-if="rIndex == 0">
        <div class="col-12 col-md-6 d-flex justify-content-between">
          <router-link :to="{ name: 'job', params: { jobId: requesterJob.id } }">
            <h4>{{requesterJob.title}}</h4>
          </router-link>
          <span class="unbold">
            <h5>{{when}}</h5>
          </span>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-between">
          <span class="unbold">
            <h5>Job Status: {{requesterJob.jobStatus}}</h5>
          </span>
          <h5
            v-if="requesterJob.jobStatus == 'completed'"
            title="Rate Volunteer(s)"
            class="action"
            @click="toggleRatings"
          >
            <!-- TODO this star should only show once completed -->
            Rate
            <i class="fas fa-star-half-alt text-warning" alt="Ratings"></i>
          </h5>
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
      <div class="row bg-primary rounded-lg mb-1 shadow text-white" v-if="rIndex == 1">
        <div class="col-12 col-md-6 d-flex justify-content-between">
          <router-link class="text-white" :to="{ name: 'job', params: { jobId: requesterJob.id } }">
            <h4>{{requesterJob.title}}</h4>
          </router-link>
          <h5 class="unbold">{{when}}</h5>
        </div>
        <div class="col-12 col-md-6 d-flex justify-content-between">
          <h5 class="unbold">Job Status: {{requesterJob.jobStatus}}</h5>
          <h5
            v-if="requesterJob.jobStatus == 'completed'"
            title="Rate Volunteer(s)"
            class="action"
            @click="toggleRatings"
          >
            <!-- TODO this star should only show once completed -->
            Rate
            <i class="fas fa-star-half-alt text-warning" alt="Ratings"></i>
          </h5>
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
    }
    // volunteers() {
    //   let arr = this.$state.store.profile.find(
    //     p => p.id == this.requestorJob.volunteerIds
    //   );
    // }
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
/* .bg-grey{
  background: rgba(218, 218, 218, 0.712);
} */
</style>