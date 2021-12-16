import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = this.$cookies.get('token');
  if (token !== undefined) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
});

/***************** Species ********************/

export async function getSpeciesById(id, lang=this.$root.$i18n.locale) {
  return axios.get(`${process.env.VUE_APP_ROOT_API}/species/${lang}/${id}`);
}

/***************** Adverts ********************/

export async function getAllAdverts(){
  return axios.get(`${process.env.VUE_APP_ROOT_API}/adverts`);
}

export async function getAdvertById(id){
  return axios.get(`${process.env.VUE_APP_ROOT_API}/adverts/${id}`);
}

/***************** Authentification ********************/

export async function login(credentials){
  return axios.post(`${process.env.VUE_APP_ROOT_API}/auth/login`, credentials)
    .then(result => {
      this.token = result.data;

    })
    .catch(error => {
      this.error = error;
    });
}

export async function register(userInformations){
  return axios.post(`${process.env.VUE_APP_ROOT_API}/auth/register`, userInformations);
}
