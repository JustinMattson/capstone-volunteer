<template>
  <div class="jobQueue container">
    <!-- Color 1 -->
    <div class="row bg-light border border-secondary rounded-lg mb-1 shadow" v-if="qIndex == 0">
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <router-link :to="{ name: 'job', params: { jobId: jobQueue.id } }">{{jobQueue.jobId.title}}</router-link>
        <span>{{when}}</span>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <span class="unbold">Status: {{jobQueue.jobApproval}}</span>
        <span title="Remove from Queue">
          <i
            class="far fa-trash-alt text-danger action"
            v-if="jobQueue.jobApproval == 'rejected'"
            alt="Delete"
            @click="cancelQueue"
          ></i>
          <i class="fas fa-ban text-danger action" v-else alt="Cancel" @click="cancelQueue"></i>
        </span>
      </div>
    </div>
    <!-- Alt Color -->
    <div class="row border border-secondary rounded-lg mb-1 shadow" v-if="qIndex == 1">
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <router-link :to="{ name: 'job', params: { jobId: jobQueue.id } }">{{jobQueue.jobId.title}}</router-link>
        <span>{{when}}</span>
      </div>
      <div class="col-12 col-md-6 d-flex justify-content-between">
        <span class="unbold">Status: {{jobQueue.jobApproval}}</span>
        <span title="Remove from Queue">
          <i
            class="far fa-trash-alt text-danger action"
            v-if="jobQueue.jobApproval == 'rejected'"
            alt="Delete"
            @click="cancelQueue"
          ></i>
          <i class="fas fa-ban text-danger action" v-else alt="Cancel" @click="cancelQueue"></i>
        </span>
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
    qIndex() {
      let num = this.$store.state.queues.findIndex(
        q => q.id == this.jobQueue.id
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