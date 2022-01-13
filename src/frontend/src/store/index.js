import { createStore } from 'vuex'
import {memberIsConnected} from "@/logic/apicalls";

const store = createStore({
    state: {
        connected: memberIsConnected(),
    },
    mutations: {
        connect(state) {
            state.connected = true;
        },
        disconnect(state) {
            state.connected = false;
        },
    },
    getters: {
        isConnected: state => {
            return state.connected;
        }
    }
});

export default store;