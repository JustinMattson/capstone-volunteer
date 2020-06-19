<template>
  <div class="job">
    <!-- CARD TEMPLATE API -->
    <div class="card shadow border-warning">
      <img :src="job.imgUrl" class="card-img-top p-2" alt="..." />
      <div class="card-body p-2">
        <span class="text-left text-primary font-weight-bold">
          {{
          job.title
          }}
        </span>
        <p class="card-text text-left">{{ job.description }}</p>
        <div>General Location: {{ job.generalLocation }}</div>
        <div>{{ start }}</div>
        <div>{{ end }}</div>
        <div>{{ job.status }}</div>

        <router-link :to="{ name: 'job', params: { jobId: job.id } }">
          <span class="d-flex my-2 justify-content-center">
            <i class="fas fa-hands-helping action text-primary">&nbsp;More Info</i>
          </span>
        </router-link>
        <p class="small text-muted mb-0 text-center">#{{ job.id }}</p>
      </div>
    </div>
    <!-- END CARD TEMPLATE -->
  </div>
</template>

<script>
import moment from "moment";
import swal from "sweetalert";
export default {
  name: "job",
  props: ["job"],
  data() {
    return {
      start: moment(String(this.job.startDate)).format("MM/DD/YYYY"),
      end: moment(String(this.job.startDate)).format("MM/DD/YYYY")
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    deleteJob() {
      swal({
        title: "Are you sure?",
        text:
          "Click 'Ok' to confirm you wish to delete this request.  This action cannot be undone.",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          let data = this.$store.dispatch("deleteJob", this.job);

          swal("Poof! Your request has been closed!", {
            icon: "success"
          });
          this.editJob = false;
        } else {
          swal("Close cancelled");
        }
      });
      // this.job.status = "cancelled"; // if it is deleted, this is not necessary
    }
  },
  components: {}
};
</script>

<style scoped>
.action {
  cursor: pointer;
}
</style>
