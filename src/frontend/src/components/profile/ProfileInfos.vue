<template>
  <div class="profileInfo">
    <h1>{{ $t('profile.profileInfos') }}</h1>
    <div class="infos">
      <p><i class="icon fas fa-user"></i>  {{ member.firstname }}</p>
      <p><i class="icon fas fa-user"></i>  {{ member.name }}</p>
      <p><i class="icon fas fa-envelope"></i>  {{ member.email }}</p>
      <p><i class="icon fas fa-map-marker-alt"></i>  {{ member.street }}</p>
      <p><i class="icon fas fa-map-marker-alt"></i>  {{ member.NPA }}</p>
      <p><i class="icon fas fa-map-marker-alt"></i>  {{ member.city }}</p>
      <p><i class="icon fas fa-phone"></i>  {{ member.phone }}</p>
      <button @click="$router.push(`/members/${member.email}/modify`)">{{ $t('profile.modifyButton') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileInfos",
  props: {
    member: null
  }
}
</script>

<style scoped>

.profileInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  text-align: center;
  border: solid;
  border-color: var(--transparent-border-color);
}

.infos {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

h1,
button,
p {
  color: black;
}

button {
  display: inline-block;
  padding: 20px;
  margin: 30px 30px 30px 0;
  letter-spacing: .15rem;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  background-color: transparent;
  border-color: var(--header-color);
}

button:hover {
  cursor: pointer;
  background-color: var(--select-color);
}

</style>