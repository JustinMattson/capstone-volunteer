<template>
  <div clas="comment container">
    <!-- COMMENT TEMPLATE API -->
    <div class="row bg-light border border-secondary">
      <!-- can use a different bg-color if the comment index % = 0? -->
      <!-- TODO need to add edit/delete functions to owned comments -->
      <div class="col-2 text-left m-0 mt-2 d-flex align-self-center">
        <img
          :src="comment.creator.picture"
          class="card-img-top p-2"
          alt="http://placehold.it/75x75"
          style="width:75px;height:75px;"
        />
      </div>
      <div class="col-10 m-0 mt-2 d-flex align-self-center">
        <textarea
          class="text-left text-primary border border-warning p-2"
          v-model="comment.body"
          style="height:100px;width:100%"
          placeholder="comment.body"
        ></textarea>
      </div>
      <div class="d-flex col-12 m-0 mx-1 px-3 justify-content-between">
        <span>{{comment.creator.name}}</span>
        <span class="text-muted">{{updated}}</span>
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
    return {
      updated: moment(String(this.comment.updatedAt)).format(
        "MM/DD/YYYY h:mm A"
      ),
      commentIndex: 0
    };
  },
  mounted() {},
  computed: {
    // TODO idea below was to alternate the comment row background based on % = 0
    // cIndex() {
    //   this.$store.state.comments.findIndex(c => c.id == this.comment.id);
    // }
  },
  methods: {
    addComment() {
      // TODO this method has not bee tested from the app.
      this.$store.state.dispatch("addComment", this.comment);
    },
    // REVIEW in the event comments need sorted by date.
    // commentSortAsc() {
    //   function compare(a, b) {
    //     if (a.updatedAt < b.updatedAt) return -1;
    //     if (a.updatedAt > b.updatedAt) return 1;
    //     return 0;
    //   }
    //   return this.comments.sort(compare);
    // },
    // commentSortDesc() {
    //   function compare(a, b) {
    //     if (a.updatedAt < b.updatedAt) return 1;
    //     if (a.updatedAt > b.updatedAt) return -1;
    //     return 0;
    //   }
    //   return this.comments.sort(compare);
    // },
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