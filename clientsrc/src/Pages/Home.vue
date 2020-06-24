<template>
  <div class="home container-fluid text-center">
    <div class="row">
      <div class="col-12 p-0">
        <img
          src="https://www.ci.medford.or.us/SIB/images/Many-Hands-Holding-the-red-Letters-Volunteer-Isolated-1024x300.jpg"
          class="cstm-size"
        />
      </div>
    </div>
    <div class="row d-flex justify-content-around my-5">
      <router-link
        :to="{name: 'Jobs'}"
        class="col-12 col-md-5 bg-primary box-height no-line d-flex align-items-center justify-content-center rounded my-1"
      >
        <h1 class="text-secondary">Get help with something</h1>
      </router-link>
      <router-link
        :to="{name: 'Jobs'}"
        class="col-12 col-md-5 bg-secondary box-height no-line d-flex align-items-center justify-content-center rounded my-1"
      >
        <h1 class="text-primary">Find something to help with</h1>
      </router-link>
    </div>
    <div class="row my-5 d-flex justify-content-around">
      <div class="card col-12 col-md-3 height-fix my-1 shadow">
        <img
          src="https://i.pinimg.com/originals/0d/c5/7b/0dc57b8d66c12736c666f157a3afa3ff.jpg"
          class="card-img-top mt-3"
          alt="error loading image"
        />
        <div class="card-body">
          <h5 class="card-title">Sydney</h5>
          <p class="card-text">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </p>
          <p
            class="card-text"
          >I love this website! I run an after-school program to help keep kids busy and off the streets. We use this site almost exclusively to find projects to help out with. I reccomend this to everyone I know!</p>
        </div>
      </div>
      <div class="card col-12 col-md-3 height-fix my-1 shadow">
        <img
          src="https://headshotphotographerasheville.com/wp-content/uploads/headshots-in-asheville-3.jpg"
          class="card-img-top mt-3"
          alt="error loading image"
        />
        <div class="card-body">
          <h5 class="card-title">Albert</h5>
          <p class="card-text">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </p>
          <p
            class="card-text"
          >I really enjoy this site! I've had tons of projects I've needed help with and have found plenty of people to help me out. I've also been able to return the favor by helping others with their projects as well. This has been very useful!</p>
        </div>
      </div>
      <div class="card col-12 col-md-3 height-fix my-1 shadow">
        <img
          src="https://i1.wp.com/kinserstudios.com/wp-content/uploads/2019/06/man.png?fit=384%2C295&ssl=1"
          class="card-img-top mt-3"
          alt="error loading image"
        />
        <div class="card-body">
          <h5 class="card-title">Scott</h5>
          <p class="card-text">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </p>
          <p
            class="card-text"
          >I've been using this site for months now and found it very helpful! I use it to help others in my community with various jobs they have going on. It gives me opportunities to learn new skills and connect with those around me.</p>
        </div>
      </div>
    </div>
    <footer class="row sticky-bottom bg-primary d-flex justify-content-between">
      <div class="col-4">Xander</div>
      <div class="col-4">
        Kevin Lane
        <a href="https://www.linkedin.com/in/kevin-lane-2422b51b0/" target="_blank">
          <i class="fa fa-linkedin-square text-black p-1"></i>
        </a>
        <a href="https://github.com/Kevinclane" target="_blank">
          <i class="fa fa-github text-black p-1"></i>
        </a>
      </div>
      <!-- Justin -->
      <div class="col-4 text-center">
        <div>
          Justin Mattson
          <br />
          <a href="https://www.facebook.com/justin.mattson.9" target="_blank">
            <i class="fa fa-facebook-official text-dark" aria-hidden="true"></i>
          </a>&nbsp;
          <a href="https://www.linkedin.com/in/justin-mattson" target="_blank">
            <i class="fa fa-linkedin-square text-dark" aria-hidden="true"></i>
          </a>&nbsp;
          <a href="https://justinmattson.github.io/" target="_blank">
            <i class="fa fa-github text-dark p-1" aria-hidden="true"></i>
          </a>&nbsp;
          <a href="mailto:justin.mattson@outlook.com" class="text-dark">
            <i class="fa fa-envelope-o text-dark" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      <!-- Justin -->
    </footer>
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

.cstm-size {
  height: auto;
  width: 100%;
}
.height-fix {
  height: fit-content !important;
}
.text-black {
  color: black;
}
</style>