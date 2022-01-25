<template>
  <div class="main-div">
    <Header />
    <router-view class="content"/>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>

* {box-shadow: border-box;}

h1,
h2,
h3,
h4,
h5,
h6,
p,
li,
button {
  font-family:Georgia, 'Times New Roman', Times, serif;
  color: white;
}

h1,
h2,
h3,
h4,
h5,
h6,
button{
  letter-spacing: .15rem;
}

:root{
  --header-color: #4e598c;
  --header-selection-color: #5a648f;  
  --footer-color: #373d5e;
  --bg-color: #ffffff;
  --select-color: #4e598c25;
  --transparent-background-color: rgba(255, 255, 255, 0.85);
  --transparent-border-color: #5a648f25
}

/*hide scrollbar*/
body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

body::-webkit-scrollbar {/*Chrome*/
  display: none;
}
.main-div {
  height: parent;
}
html {
  height: 100%;
}

body {
  min-height: 100%;
  width: 100%;
  margin: 0;
  margin-top: 94px;
  background-color: var(--bg-color);
  background-size: 100%;
  background-repeat:repeat-x;
  background-attachment:fixed;
  background-position: left top;
}


</style>