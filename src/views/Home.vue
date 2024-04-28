<!-- eslint-disable max-len -->
<template>
  <div class="container d-flex flex-column align-items-center">
    <div id="cookingCarousel" class="mb-5">
      <img src="..\assets\carousel\BanerImg.png" class="d-block w-100" alt="Welcome to our Kitchen">
    </div>

    <div class="row">
    <div class="col-lg-4 mb-4">
      <div class="bg-white rounded p-3 shadow">
        <div id="containerCarousel1" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="..\assets\carousel\image5.jpg" class="d-block w-100" alt="Image 1">
            </div>
            <div class="carousel-item">
              <img src="..\assets\carousel\image6.jpg" class="d-block w-100" alt="Image 2">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#containerCarousel1" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#containerCarousel1" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <div class="col-lg-4 mb-4">
      <div class="bg-white rounded p-3 shadow">
        <div id="containerCarousel2" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="..\assets\carousel\image1.jpg" class="d-block w-100" alt="Image 2">
            </div>
            <div class="carousel-item">
              <img src="..\assets\carousel\image2.jpg" class="d-block w-100" alt="Image 2">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#containerCarousel2" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#containerCarousel2" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <div class="col-lg-4  mb-4">
      <div class="bg-white rounded p-3 shadow">
        <div id="containerCarousel3" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="..\assets\carousel\image3.jpg" class="d-block w-100" alt="Image 3">
            </div>
            <div class="carousel-item">
              <img src="..\assets\carousel\image4.jpg" class="d-block w-100" alt="Image 2">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#containerCarousel3" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#containerCarousel3" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
export default {
  name: 'AppHomeView',
};
</script>

<!-- Home page containing carousel galleries with photos. -->