<template>
  <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
    </div>
    <div class="carousel-inner">

      <div class="carousel-item active" data-bs-interval="2000">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-11 d-flex flex-column justify-content-center">
              <img src="../assets/carousel/1-first-slide.png" class="d-block img-fluid" alt="App logo">
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="2000">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-11 d-flex flex-column justify-content-center">
                <img src="../assets/carousel/2-share-notes.png" class="d-block img-fluid" alt="Information about sharing notes.">
              </div>
            </div>
          </div>
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-11 d-flex flex-column justify-content-center">
              <img src="../assets/carousel/3-seek-ideas.png" class="d-block w-100" alt="Information about seeking new ideas.">
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-11 d-flex flex-column justify-content-center">
              <img src="../assets/carousel/4-organize-study.png" class="d-block w-100" alt="Information about organizing your study.">
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-11 d-flex flex-column justify-content-center">
              <img src="../assets/carousel/5-our-team.png" class="d-block w-100" alt="Our team">
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHomeView",
};
</script>

<style>
</style>