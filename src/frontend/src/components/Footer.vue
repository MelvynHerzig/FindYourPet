<template>
  <div class="footer">
    <div class="left">
      <p>Contact : contact@findyourpet.ch</p>
    </div>
    <div class="middle">
      <h2>@COPYRIGHT</h2>
    </div>
    <div class="right">
      <div>
        <img src="../assets/images/insta.png" alt="instagram">
        <img src="../assets/images/twitter.png" alt="twitter">
        <img src="../assets/images/fb.png" alt="facebook">
        <img src="../assets/images/tumblr.png" alt="tumblr">
      </div>
    </div>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1,
h2,
h3,
h4,
h5,
h6,
p,
li,
button{
  color: var(--header-selection-color);
}
.footer {
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    background-color:  	var(--footer-color);
}

.footer > div {
  flex: 1;
  text-align: center;
}

.left p{
  padding: 10px 20px;
  float: left;
}

.right {
  display: flex;
  align-content: center;
  justify-content:right;
}

.right div{
  width: 120px;
  padding: 20px 20px;
  display: flex;
  justify-content: space-around;
}

.right img{
  width: 20px;
  height: 20px;
}

</style>
