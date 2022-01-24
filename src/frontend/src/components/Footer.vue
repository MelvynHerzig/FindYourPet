<template>
  <footer class="footer">
    <div class="left">
      <p>{{$t("footer.contact")}}  contact@findyourpet.ch</p>
    </div>
    <div class="middle">
      <h2>@COPYRIGHT</h2>
    </div>
    <div class="right">
      <div>
        <router-link to="/"><img src="../assets/images/insta.png" alt="instagram"></router-link>
        <router-link to="/"><img src="../assets/images/twitter.png" alt="twitter"></router-link>
        <router-link to="/"><img src="../assets/images/fb.png" alt="facebook"></router-link>
      </div>
    </div>
  </footer>
</template>

<script>
</script>

<style scoped>

h2,
p {
  color: var(--header-selection-color);
}

.footer {
  width: 100%;
  bottom: 0;
  display: flex;
  position: relative;
  justify-content: space-between;
  background-color: var(--footer-color);
}

.footer > div {
  flex: 1;
  text-align: center;
}

.left p {
  padding: 10px 20px;
  float: left;
}

.right {
  display: flex;
  align-content: center;
  justify-content:right;
}

.right div {
  width: 120px;
  padding: 20px 20px;
  display: flex;
  justify-content: space-around;
}

.right img {
  width: 20px;
  height: 20px;
}

@media screen and (max-width: 600px) {
  .footer {
    width: 100%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background-color: var(--footer-color);
  }
}

</style>
