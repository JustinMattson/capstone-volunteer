<template>
  <div class="job">
    <!-- CARD TEMPLATE API -->
    <div class="card shadow border-warning rounded-lg">
      <router-link :to="{ name: 'job', params: { jobId: job.id } }">
        <img :src="job.imgUrl" class="card-img-top p-2" alt="..." />
      </router-link>
      <div class="card-body p-2">
        <div class="d-flex text-left text-primary font-weight-bold font-lg justify-content-between">
          <span>{{job.title}}</span>
          <span v-show="job.creatorEmail == profile.email">
            <!-- <br /> {{job.creatorEmail}} <br /> {{profile.email}} -->
            <i class="far fa-trash-alt action text-danger" @click="deleteJob"></i>
          </span>
        </div>
        <div class="d-flex text-left text-secondary align-self-center">
          <span>
            <img class="rounded-lg" :src="job.creator.picture" style="height:25px;width:25px" />
          </span>
          <span class="d-flex align-self-center pl-2 unbold">{{job.creator.name}}</span>
        </div>
        <p class="card-text text-left py-2">{{ job.description }}</p>
        <div class="unbold">General Location: {{ job.generalLocation }}</div>
        <small class="unbold">
          When: {{ when }}
          <!-- <br /> S:{{job.startDate}} <br /> E:{{job.endDate}}-->
        </small>
        <div>{{ job.status }}</div>

        <router-link :to="{ name: 'job', params: { jobId: job.id } }">
          <span class="d-flex my-3 justify-content-center">
            <i class="fas fa-hands-helping action text-primary font-lg">&nbsp;More Info</i>
            <!-- <i class="far fa-handshake action text-primary font-lg">&nbsp;More Info</i> -->
          </span>
        </router-link>
        <p class="small text-muted mb-0 text-center unbold">#{{ job.id }}</p>
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
          let data = this.$store.dispatch("deleteJob", this.job.id);

          swal("Poof! Your help request has been deleted!", {
            icon: "success"
          });
          this.editJob = false;
        } else {
          swal("Close cancelled");
        }
      });
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
img {
  border-radius: 13px;
}
</style>
