<template>
  <div class="landing2">
    <div class="title">
      <h1> Comment utiliser notre site</h1>
    </div>
    <div class="texts">
      <div>
        <h2>Pour annoncer un animal</h2>
        <div>
          <div>
            <h3>Etape 1</h3>
            <p>Crée un compte</p>
          </div>
          <div>
            <h3>Etape 2</h3>
            <p>Crée une annonce</p>
          </div>
          <div>
            <h3>Étape 3</h3>
            <p>Attends qu'un autre utilisateur te contacte</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Pour adopter un animal</h2>
        <div>
          <div>
            <h3>Etape 1</h3>
            <p>Consulte les annonces</p>
          </div>
          <div>
            <h3>Etape 2</h3>
            <p>Selectionne une annonce qui te plaît</p>
          </div>
          <div>
            <h3>Étape 3</h3>
            <p>Contacte le propriétaire actuel</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  

h2,p {
  color: darkgray;
}


.landing2{
  text-align: center;
  background-color: var(--header-color);
  width: 100%;
  border-color: var(--sub-color);
  padding-bottom: 100px;
}

.title {
    padding: 20px;
}

.texts {
  display: flex;
  justify-content: space-around;
}

.texts > div{
  border-radius: 25px;
  width: 35%;
  border: solid;
  border-color:var(--header-selection-color);
  text-align: center;
}

.texts > div > div {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.texts > div > div div{
  padding: 10px;
  flex: 1;
}
</style>
