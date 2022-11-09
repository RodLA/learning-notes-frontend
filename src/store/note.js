import axios from 'axios';

const actions = {
    getNotesOfUser(){
        return new Promise( (resolve, reject)=>{
            axios
                .get('note/all')
                .then( (response)=>{
                    resolve(response);
                } )
                .catch( (error)=>{
                    reject(error);
                } );
        } );
    },
};

export default{
    namespaced: true,
    actions
};