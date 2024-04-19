<template>
  <div class="container">
    <div id="cookingCarousel" class="mb-5">
      <img src="..\assets\carousel\BanerImg.png" class="d-block w-100" alt="Welcome to our Kitchen">
    </div>

    <div class="content-container" style="background-color: #FEEBD3;">
      <div id="containerCarousel1" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="..\assets\carousel\mock.jpg" class="d-block w-100" alt="Image 1">
          </div>
          <div class="carousel-item">
            <img src="..\assets\carousel\mbape.jpg" class="d-block w-100" alt="Image 2">
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
      <p>essa</p>
    </div>

    <div class="content-container" style="background-color: #E7F1F5;">
      <div id="containerCarousel2" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="..\assets\carousel\klopsiki.jpg" class="d-block w-100" alt="Image 2">
          </div>
          <div class="carousel-item">
            <img src="..\assets\carousel\mbape.jpg" class="d-block w-100" alt="Image 2">
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
      <p>Rizz</p>
    </div>

    <div class="content-container" style="background-color: #FADBD8;">
      <div id="containerCarousel3" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="..\assets\carousel\burger.jpg" class="d-block w-100" alt="Image 3">
          </div>
          <div class="carousel-item">
            <img src="..\assets\carousel\mbape.jpg" class="d-block w-100" alt="Image 2">
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
      <p>Sigma</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHomeView',
}
</script>

<style>
  .container {
  /* background-image: url("../assets/homeBackground/backgroundPale.jpg"); 
  background-repeat: repeat;  */
  
  /*opacity: 0.5; */

  /* padding: 20px; */
}

.content-container {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.content-container p {
  text-align: center;
  margin-top: 15px;
}

@media (min-width: 768px) {
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .content-container {
    flex-basis: calc(33.33% - 20px);
  }
}
</style>
