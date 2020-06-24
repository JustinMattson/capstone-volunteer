<template>
  <div class="jobQueue container">
    <div class="row">
      <div class="col-12">
        <!-- <router-link :to="{ name: 'job', params: { jobId: job.id } }"></router-link> -->
        {{jobQueue.jobId.title}}
        {{jobQueue.jobApproval}}
      </div>
    </div>
  </div>
</template>


<script>
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
    when() {
      if (this.job.startDate == this.job.endDate) {
        return moment(String(this.job.startDate)).format("MM/DD/YYYY");
      } else {
        return (
          moment(String(this.job.startDate)).format("MM/DD/YYYY") +
          " - " +
          moment(String(this.job.endDate)).format("MM/DD/YYYY")
        );
      }
    }
  },
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>