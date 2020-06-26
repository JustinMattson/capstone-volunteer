<template>
  <div class="jobQueue row justify-content-center">
    <div class="col-md-8">
    <!-- Color 1 -->
    <div class="row bg-light border border-secondary rounded-lg mb-1 shadow text-secondary py-1" v-if="qIndex == 0">
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <router-link class="text-secondary"
          :to="{ name: 'job', params: { jobId: jobQueue.jobId.id } }"
        ><h4>{{jobQueue.jobId.title}}</h4></router-link>
        <span class="unbold"><h5>{{when}}</h5></span>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <h5 class="unbold">Status: {{jobQueue.jobApproval}}</h5>
        <h5 title="Remove from Queue">
          <i
            class="far fa-trash-alt text-danger action"
            v-if="jobQueue.jobApproval == 'rejected'"
            alt="Delete"
            @click="cancelQueue"
          ></i>
          <i class="fas fa-ban text-danger action" v-else alt="Cancel" @click="cancelQueue"></i>
        </h5>
      </div>
    </div>
    <!-- Alt Color -->
    <div class="row border border-secondary rounded-lg mb-1 shadow bg-primary text-secondary py-1" v-if="qIndex == 1">
      <div class="col-12 col-md-6 d-flex justify-content-between ">
        <router-link class="text-secondary" :to="{ name: 'job', params: { jobId: jobQueue.jobId.id } }"><h4>{{jobQueue.jobId.title}}</h4></router-link>
        <span class="unbold"><h5>{{when}}</h5></span>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <h5 class="unbold">Status: {{jobQueue.jobApproval}}</h5>
        <h5 title="Remove from Queue">
          <i
            class="far fa-trash-alt text-danger action"
            v-if="jobQueue.jobApproval == 'rejected'"
            alt="Delete"
            @click="cancelQueue"
          ></i>
          <i class="fas fa-ban text-danger action" v-else alt="Cancel" @click="cancelQueue"></i>
        </h5>
      </div>
    </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";
export default {
  name: "jobQueue",
  props: ["jobQueue"],
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    // FIXME once completed, the index is not sequential, colors can be all white or gray.
    qIndex() {
      let num = this.$store.state.queues.findIndex(
        q => q.id == this.jobQueue.id && q.jobStatus == "pending"
      );
      return num % 2;
    },
    when() {
      if (this.jobQueue.jobId.startDate == this.jobQueue.jobId.endDate) {
        return moment(String(this.jobQueue.jobId.startDate)).format(
          "MM/DD/YYYY"
        );
      } else {
        return (
          moment(String(this.jobQueue.jobId.startDate)).format("MM/DD/YYYY") +
          " - " +
          moment(String(this.jobQueue.jobId.endDate)).format("MM/DD/YYYY")
        );
      }
    }
  },
  methods: {
    cancelQueue() {
      this.$store.dispatch("cancelQueue", this.jobQueue.id);
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