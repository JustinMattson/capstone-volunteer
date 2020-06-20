<template>
  <div clas="comment">
    <!-- COMMENT TEMPLATE API -->
    <div class="card shadow border-warning">
      <img :src="comments.creator.picture" class="card-img-top p-2" alt="http://placehold.it/75x75" />
      <div class="card-body p-2">
        <span class="text-left text-primary font-weight-bold">{{comments.body}}</span>
        <span>{{comment.creator.name}}</span>
        {{comment.updatedAt}}
      </div>
    </div>
    <!-- END COMMENT TEMPLATE -->
  </div>
</template>

<script>
import moment from "moment";
import swal from "sweetalert";
export default {
  name: "comment",
  props: ["comment"],
  data() {
    return {};
  },
  computed: {
    profile() {
      this.$store.state.profile;
    }
  },
  methods: {
    deleteComment() {
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