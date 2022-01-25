<template>
  <div class="animalAdsList">
    <div class="inner">
      <h1>{{$t("recent.title")}}</h1>
      <div class="list">
        <ul>
          <li v-for="advert in this.adverts.slice(0,3)" :key="advert.id" style="list-style-type:none">
            <AdvertPreview :advert="advert"/>
          </li>
        </ul>
      </div>
    </div>
    <ToastError
        v-if="error"
        :text="error"
    />
  </div>
</template>

<script>
import { getRecentAdverts } from "@/logic/apicalls";

import AdvertPreview from "../AdvertPreview";
import ToastError from "@/components/toasts/ToastError";
import {manageErrors} from "@/logic/errors";

export default {
  name: "RecentAnimalsList",
  components: {ToastError, AdvertPreview },
  beforeMount() {
    getRecentAdverts(this.$root.$i18n.locale).then(result => {
      this.adverts = result.data;
    })
    .catch(error => {
      this.error = manageErrors(error);
    });
  },
  data() {
    return {
      adverts: [],
      error: null,
    }
  },
}
</script>

<style scoped>

h1 {
  color: black;
  text-align: center;
}

.animalAdsList {
  background: url("../../assets/images/cat2.jpg");
  background-attachment:fixed;
  background-repeat: no-repeat;
  background-size: cover;
  margin:auto;
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 3em;
  padding-bottom: 3em;
}

.list {
  height: 85%;
  overflow: auto;
}

.inner {
  background: var(--transparent-background-color);
  padding: 20px;
  margin: auto;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: solid;
  border-color: var(--transparent-border-color);
}

</style>
