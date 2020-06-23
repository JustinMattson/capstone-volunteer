<template>
  <div class="comment container">
    <!-- COMMENT TEMPLATE API -->

    <div class="row bg-light border border-secondary rounded-lg mb-1 shadow" v-if="cIndex == 0">
      <div class="d-flex col-12 m-0 px-3 justify-content-between" v-if="comment.creator">
        <span>{{comment.creator.name}}</span>
        <small class="text-muted align-self-center">{{updated}}&nbsp;</small>
      </div>
      <!-- can use a different bg-color if the comment index % = 0? -->
      <!-- TODO need to add edit/delete functions to owned comments -->
      <div class="col-2 text-left m-0 d-flex align-self-center" v-if="comment.creator">
        <img
          :src="comment.creator.picture"
          class="card-img-top p-2"
          alt="http://placehold.it/75x75"
          style="width:75px;height:75px;"
        />
      </div>
      <div class="col-10 m-0 d-flex align-self-center">
        <textarea
          class="text-left text-primary unbold bg-light border-0 py-0 pl-2 ml-2"
          v-model="comment.body"
          style="height:88px;width:99%"
          placeholder="comment.body"
        ></textarea>
      </div>

      <div class="d-flex col-12 m-0 justify-content-between">
        <span class="pb-2">
          <i
            class="far fa-edit text-secondary action"
            v-show="comment.creatorEmail == profile.email"
            @click="toggleEditForm()"
          ></i>
        </span>
        <span>
          <!-- REVIEW seems to work without parens deleteComment() -->
          <i
            class="far fa-trash-alt text-danger action"
            v-show="comment.creatorEmail == profile.email || job.creatorEmail == profile.email"
            @click="deleteComment"
          ></i>
        </span>
      </div>

      <!-- EDIT COMMENT FORM -->
      <form
        v-show="this.editForm"
        class="form border border-top"
        @submit.prevent="editComment"
        style="height:88px;width:99%"
      >
        <div class="d-flex justify-content-between">
          <span class="d-flex text-center align-self-center px-3">
            <button type="submit" class="btn btn-outline-secondary">Update</button>
          </span>
          <span class="text-right" style="height:88px;width:99%">
            <textarea
              class="text-left text-primary unbold bg-light border-0 p-2"
              v-model="comment.body"
              placeholder="comment.body"
              style="width:99%;height:88px;"
            ></textarea>
          </span>
        </div>
      </form>
      <!-- END EDIT COMMENT FORM -->
    </div>

    <!-- Alternate BG color -->
    <div class="row border border-secondary rounded-lg mb-1 shadow" v-if="cIndex == 1">
      <div class="d-flex col-12 m-0 px-3 justify-content-between" v-if="comment.creator">
        <span>{{comment.creator.name}}</span>
        <small class="text-muted align-self-center">{{updated}}&nbsp;</small>
      </div>
      <!-- can use a different bg-color if the comment index % = 0? -->
      <!-- TODO need to add edit/delete functions to owned comments -->
      <div class="col-2 text-left m-0 d-flex align-self-center" v-if="comment.creator">
        <img
          :src="comment.creator.picture"
          class="card-img-top p-2"
          alt="http://placehold.it/75x75"
          style="width:75px;height:75px;"
        />
      </div>
      <div class="col-10 m-0 d-flex align-self-center">
        <textarea
          class="text-left text-secondary unbold border-0 py-0 pl-2 ml-2"
          v-model="comment.body"
          style="height:88px;width:99%;background-color:var(--elephant);"
          placeholder="comment.body"
        ></textarea>
      </div>

      <div class="d-flex col-12 m-0 justify-content-between">
        <span class="pb-2">
          <i
            class="far fa-edit text-secondary action"
            v-show="comment.creatorEmail == profile.email"
            @click="toggleEditForm()"
          ></i>
        </span>
        <span>
          <!-- REVIEW seems to work without parens deleteComment() -->
          <i
            class="far fa-trash-alt text-danger action"
            v-show="comment.creatorEmail == profile.email || job.creatorEmail == profile.email"
            @click="deleteComment"
          ></i>
        </span>
      </div>

      <!-- Alt EDIT COMMENT FORM -->
      <form
        v-show="this.editForm"
        class="form border border-top"
        @submit.prevent="editComment"
        style="height:88px;width:99%"
      >
        <div class="d-flex justify-content-between">
          <span class="d-flex text-center align-self-center px-3">
            <button type="submit" class="btn btn-outline-secondary">Update</button>
          </span>
          <span class="text-right" style="height:88px;width:99%">
            <textarea
              class="text-left text-secondary unbold border-0 p-2"
              v-model="comment.body"
              placeholder="comment.body"
              style="width:99%;height:88px;background-color:var(--elephant);"
            ></textarea>
          </span>
        </div>
      </form>
      <!-- END EDIT COMMENT FORM -->
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
      editForm: false,
      updated: moment(String(this.comment.updatedAt)).format(
        "MM/DD/YYYY h:mm A"
      )
    };
  },
  mounted() {},
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    // TODO idea below was to alternate the comment row background based on % = 0
    cIndex() {
      let num = this.$store.state.comments.findIndex(
        c => c.id == this.comment.id
      );
      return num % 2;
    },
    job() {
      return this.$store.state.activeJob;
    }
  },
  methods: {
    toggleEditForm() {
      this.editForm == false ? (this.editForm = true) : (this.editForm = false);
    },
    addComment() {
      // TODO this method has not bee tested from the app.
      this.$store.dispatch("addComment", this.comment);
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
    toggleEditForm() {
      this.editForm = !this.editForm;
    },
    editComment() {
      this.$store.dispatch("editComment", this.comment);
      this.editForm = false;
    },
    deleteComment() {
      swal({
        title: "Are you sure?",
        text:
          "Click 'Ok' to confirm you wish to delete this comment.  This action cannot be undone.",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          let data = this.$store.dispatch("deleteComment", this.comment.id);
          swal("Poof! Your comment has been deleted!", {
            icon: "success"
          });
          this.edit = false;
        } else {
          swal("Deletion cancelled");
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