import axios from "axios";
import { useCookies } from "vue3-cookies";
import { manageErrors } from "./errors";

const {cookies} = useCookies();

axios.interceptors.request.use(function (config) {
  const token = cookies.get('token');
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
});

/***************** Species ********************/

export async function getSpeciesById(id, lang = this.$root.$i18n.locale) {
  return axios.get(`${process.env.VUE_APP_ROOT_API}/species/${lang}/${id}`);
}

/***************** Adverts ********************/

export async function getAllAdverts() {
  return axios.get(`${process.env.VUE_APP_ROOT_API}/adverts`);
}

export async function getAdvertById(id) {
  return axios.get(`${process.env.VUE_APP_ROOT_API}/adverts/${id}`);
}

/***************** Authentification ********************/

export async function login(credentials) {
  return axios.post(`${process.env.VUE_APP_ROOT_API}/auth/login`, credentials)
    .then(result => {
      cookies.set('token', result.data);
      return result;
    });
}

export async function register(userInformations) {
  return axios.post(`${process.env.VUE_APP_ROOT_API}/auth/register`, userInformations)
      .then(result => {
        if (result.success) {
          this.$router.push('/login');
        } else {
          return result.message;
        }
      })
      .catch(error => {
        this.error = manageErrors(error.message);
      });
}

/***************** api3.geo.admin.ch ********************/

export async function getSwissAdress(addr) {
  return await axios
      .get(
          `https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=${addr}&type=locations`,
      )
      .then((resp) => {
          return resp.data.results;
      });
}