<template>
  <div class="job">
    <!-- CARD TEMPLATE API -->
    <div class="card shadow bg-primary text-secondary rounded-lg">
      <router-link :to="{ name: 'job', params: { jobId: job.id } }">
        <img :src="job.imgUrl" class="card-img-top p-2" alt="..." />
      </router-link>
      <div class="card-body p-2">
        <div class="d-flex text-left text-primary font-weight-bold font-lg justify-content-between">
          <h3 class="text-white text-shadow">{{job.title}}</h3>
          <span v-show="job.creatorEmail == profile.email">
            <i class="far fa-trash-alt action text-danger" @click="deleteJob"></i>
          </span>
        </div>
        <div class="d-flex text-left text-secondary align-self-center">
          <span>
            <img class="rounded-lg" :src="job.creator.picture" style="height:25px;width:25px" />
          </span>
          <h4 class="d-flex align-self-center pl-2">{{job.creator.name}} </h4>
          <h4 class="ml-1"> {{requestorRating}}</h4>
        </div>
        <h5 class="card-text text-left py-2">{{ job.description }}</h5>
        <h4>General Location: {{ job.generalLocation }}</h4>
        <h4>When: {{ when }}</h4>

        <router-link  :to="{ name: 'job', params: { jobId: job.id } }">
          <button class=" btn btn-secondary d-flex my-3 justify-content-center">
            <i class="fas fa-hands-helping action text-white text-shadow font-lg">&nbsp;More Info</i>
          </button>
        </router-link>
        <!-- <p class="small text-muted mb-0 text-center unbold">#{{ job.id }}</p> -->
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
  mounted() {
    this.expireCheck;
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
    requestorRating() {
      if (this.job) {
        let rateArr = this.job.jobCreatorRatings;
        let length = rateArr.length;
        let x = 0;
        let i = 0;
        while (i < length) {
          x += rateArr[i];
          i++;
        }
        if (length == 0) {
          return "No Ratings";
        } else return x.toFixed(1);
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
    },
    expireCheck() {
      debugger;
      let jobDate = moment(String(this.job.endDate)).format("MM/DD/YYYY");
      let currentDate = moment(String(new Date())).format("MM/DD/YYYY");
      if (jobDate < currentDate) {
        this.job.jobStatus = "completed";
        this.$store.dispatch("editJob", this.job);
        this.$store.dispatch("removeOldJob", this.job.id);
      } else return "upcoming";
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
.text-shadow {
text-shadow: 2px 2px black;
}
</style>
