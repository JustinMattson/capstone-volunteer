<template>
  <div class="requesterJobs container">
    {{requesterJob.title}}
    <!-- Color 1 -->
    <div class="row bg-light border border-secondary rounded-lg mb-1 shadow" v-if="rIndex == 0">
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <router-link
          :to="{ name: 'job', params: { jobId: requesterJob.id } }"
        >{{requesterJob.title}}</router-link>
        <span class="unbold">{{when}}</span>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <span class="unbold">Status: {{requesterJob.jobStatus}}</span>
        <span title="Rate Volunteer(s)">
          <i class="fas fa-star-half-alt text-warning action" alt="Ratings" @click="toggleRatings"></i>
        </span>
      </div>
      <!-- Ratings -->
      <div v-show="volunteerRatings" class="border border-top">
        <!-- FIXME Ratings Component goes here -->
      </div>
    </div>
    <!-- Alt Color -->
  </div>
</template>


<script>
import moment from "moment";
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
  },
  components: {}
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