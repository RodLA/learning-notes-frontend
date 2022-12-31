import axios from 'axios';

const state = {
    isLoggedIn: false,    
    userDetail: {}
};

const getters = {
    loggedIn(state){
        return state.isLoggedIn;
    }
}

const mutations = {
    setLoggedIn(state, payload){
        state.isLoggedIn = payload;
    }
};

const actions = {
    loginUser(ctx, payload){
        return new Promise( (resolve, reject)=>{
            console.log(payload);
            axios
                .post('login', payload )
                .then( (response)=>{
                    if (response.data.access_token){
                        localStorage.setItem('token', response.data.access_token);
                        ctx.commit('setLoggedIn', true);
                        resolve(response);
                        // this.$router.push({name: 'dashboard'});
                    }
                    else{
                        reject(response);
                    }
                } )
                .catch( (error)=>{
                    reject(error)
                });
        } );
    },
    logoutUser(ctx){
        return new Promise( (resolve)=>{
            localStorage.removeItem('token');
            ctx.commit('setLoggedIn', false);
            resolve(true);
        } );
    },
    setLoggedInState(ctx){
        return new Promise( (resolve) => {
            if(localStorage.getItem('token')){
                ctx.commit('setLoggedIn',true);
                resolve(true);
            }else{
                ctx.commit('setLoggedIn',false);
                resolve(false);
            }
        } )
    },
    forgotPassword(ctx, payload){
        console.log(payload);
        return new Promise( (resolve, reject)=>{
            axios
                .post('forgot-password', payload )
                .then( (response)=>{
                    resolve(response);
                } )
                .catch( (error)=>{
                    reject(error)
                });
        } ); 
    },
    resetPassword(ctx, payload){
        console.log(payload);
        return new Promise( (resolve, reject)=>{
            axios
                .post('reset-password', payload )
                .then( (response)=>{
                    resolve(response);
                } )
                .catch( (error)=>{
                    reject(error)
                });
        } ); 
    }
};

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};