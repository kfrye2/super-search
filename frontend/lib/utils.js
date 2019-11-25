require("isomorphic-fetch");
import BPromise from "bluebird";

async function getUserItems(searchParam){
    return fetch(`http://35.245.126.165/api/usersearch?param=${searchParam.search}&username=${searchParam.un}`).then(function(resp) {
        return resp.json();
    })
};

function getUserData(param) {
    return BPromise.all([getUserItems(param)]).then(function([items, repos]){
        return{ items };
    });
};

async function getItems(searchParam){
    return fetch(`http://35.245.126.165/api/search?param=${searchParam.search}`).then(function(resp) {
        return resp.json();
    })
};

function getData(param) {
    return BPromise.all([getItems(param)]).then(function([items, repos]){
        return{ items };
    });
};

function handleError(error){
    console.warn(error);
    return null;
};

module.exports = {
    getUserInfo: async function(param) {
        return getUserData(param).catch(handleError);
    },
    getInfo: async function(param) {
        return getData(param).catch(handleError);
    }
}
