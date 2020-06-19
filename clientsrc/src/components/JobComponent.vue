<template>
  <div class="job">
    <!-- CARD TEMPLATE API -->
    <div class="card shadow border-warning">
      <img :src="job.imgUrl" class="card-img-top p-2" alt="..." />
      <div class="card-body p-2">
        <div class="d-flex justify-content-between">
          <span class="text-left text-primary font-weight-bold">{{
            job.title
          }}</span>
          <span>
            <i
              class="fas fa-pencil-alt action"
              v-if="job.creatorEmail == profile.email"
              @click="toggleEdit"
            ></i>
          </span>
        </div>

        <p class="card-text text-left">{{ job.description }}</p>
        <div>General Location: {{ job.location }}</div>
        <div>{{ start }}{{ job.startDate }}</div>
        <div>{{ end }}{{ job.endDate }}</div>
        <div>{{ job.status }}</div>

        <router-link :to="{ name: 'job', params: { jobId: job.id } }">
          <span class="d-flex my-2 justify-content-center">
            <i
              class="fas fa-hands-helping action text-primary "
              @click="volunteer"
            >
              &nbsp;Help Out!
            </i></span
          >
        </router-link>
        <p class="small text-muted mb-0 text-center">#{{ job.id }}</p>
      </div>
    </div>
    <!-- END CARD TEMPLATE -->
  </div>
</template>

<script>
export default {
  name: "job",
  props: ["job"],
  data() {
    return {
      editJob: true, //not showing up on Vue Tools
      start: moment(String(this.job.startDate)).format("MM/DD/YYYY hh:mm"),
      end: moment(String(this.job.startDate)).format("MM/DD/YYYY hh:mm"),
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    volunteer() {},
    toggleEdit() {
      this.editJob = !this.editJob;
    },
    editJob() {
      let data = this.$store.dispatch("editJob", this.job);
      this.editJob = false;
    },
    deleteJob() {
      swal({
        title: "Are you sure?",
        text:
          "Click 'Ok' to confirm you wish to delete this request.  This action cannot be undone.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          let data = this.$store.dispatch("deleteJob", this.job);

          swal("Poof! Your request has been closed!", {
            icon: "success",
          });
          this.editJob = false;
        } else {
          swal("Close cancelled");
        }
      });
      // this.job.status = "cancelled"; // if it is deleted, this is not necessary
    },
  },
  components: {},
};
</script>

<style scoped>
.action {
  cursor: pointer;
}
</style>
