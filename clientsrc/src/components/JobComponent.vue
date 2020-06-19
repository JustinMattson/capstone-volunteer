<template>
  <div class="job">
    <!-- CARD TEMPLATE API -->
    <div class="card shadow border-warning">
      <!-- <img src=url('{{job.imgUrl}}') class="card-img-top p-2" alt="..." /> -->
      <div class="card-body p-2">
        <h5 class="card-title text-left text-primary">{{job.title}}</h5>
        <p class="card-text text-left">{{job.description}}</p>
        <div>General Location: {{job.location}}</div>
        <div>{{job.startDate}}</div>
        <div>{{job.endDate}}</div>
        <div>{{job.status}}</div>
        <span class="d-flex justify-content-between">
          <p class="small text-muted mb-0">#{{job.id}}</p>
          <i class="fas fa-hands-helping action text-primary" @click="volunteer">&nbsp;Help Out!</i>
        </span>
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
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    volunteer() {},
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
      this.job.status = "cancelled"; // if it is deleted, this is not necessary
    }
  },
  components: {}
};
</script>


<style scoped>
</style>