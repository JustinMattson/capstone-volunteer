<template>
  <div class="home container-fluid text-center">
    <div class="row">
      <div class="col-12">
        <h1>
          Welcome to
          <img alt="Vue logo" src="../assets/logo.png" class="sml-img" />olen-Told
        </h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <img
          src="https://www.ci.medford.or.us/SIB/images/Many-Hands-Holding-the-red-Letters-Volunteer-Isolated-1024x300.jpg"
          alt="error loading image"
          class="big-img"
        />
      </div>
    </div>
    <div class="row d-flex justify-content-around my-5">
      <router-link
        :to="{name: 'Jobs'}"
        class="col-12 col-md-5 bg-primary box-height no-line d-flex align-items-center justify-content-center rounded"
      >
        <h1 class="text-secondary">Get help with something</h1>
      </router-link>
      <router-link
        :to="{name: 'Jobs'}"
        class="col-12 col-md-5 bg-secondary box-height no-line d-flex align-items-center justify-content-center rounded"
      >
        <h1 class="text-primary">Find something to help with</h1>
      </router-link>
    </div>
    <div class="row my-5 d-flex justify-content-around">
      <div class="card col-3">
        <img
          src="https://qph.fs.quoracdn.net/main-qimg-134e3bf89fff27bf56bdbd04e7dbaedf.webp"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">Name</h5>
          <p class="card-text">Rating</p>
          <p
            class="card-text"
          >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card col-3">
        <img
          src="https://vignette.wikia.nocookie.net/wackishlyawesomerandomness/images/0/08/Imagemkksje.jpg/revision/latest?cb=20140414235032"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">Name</h5>
          <p class="card-text">Rating</p>
          <p
            class="card-text"
          >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card col-3">
        <img
          src="https://media.tumblr.com/53c511cd960aa91831bb98c4a7804871/tumblr_inline_mhxsraQw7F1qz4rgp.gif"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">Name</h5>
          <p class="card-text">1 Star</p>
          <p class="card-text">I'm not about helping others mate.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
<style scoped>
.sml-img {
  height: 3rem;
}
.box-height {
  height: 25vh;
}
.big-img {
  max-width: 90vw;
  max-height: 25vh;
}
.no-line {
  text-decoration: none;
}
.rounded {
  border-radius: 120px !important;
}
</style>