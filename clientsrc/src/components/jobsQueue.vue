<template>
  <div class="completeJob">
 <div class="col">
     <h1>{{job.title}}</h1>
 </div>
   
  </div>
</template>

<script>
import moment from "moment";
import swal from "sweetalert";
export default {
  name: "jobsQueue",
  props: ["jobsQueue"],
  data() {
    return {
      start: moment(String(this.job.startDate)).format("MM/DD/YYYY"),
      end: moment(String(this.job.startDate)).format("MM/DD/YYYY")
    };
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
    },
      jobsQueue(){
    return 
  },
  },

  methods: {

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
img {
  border-radius: 13px;
}
</style>
