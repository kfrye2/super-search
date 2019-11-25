require("isomorphic-fetch");
//require("argon2");
//import BPromise from "bluebird";

function getLogin(user_info){
    const header = {'Accept': "application/json",
        "Content-Type": "application/x-www-form-urlencoded"};
    const searchParams = new URLSearchParams(user_info);
    return fetch("http://35.245.126.165/api/login", {
        method: "POST",
        header: header,
        body: searchParams
    }).then(function(resp){
        return resp.json();
    });
}

async function checkLogin(userpw){
    const info = await getLogin(JSON.parse(userpw));
    return { info };
    /*return BPromise.all([getLogin(userpw)]).then(function([profile, repos]){
        return{ profile };
    });*/
}

function createUser(user_info){
    const header = {'Accept': "application/json",
        "Content-Type": "application/x-www-form-urlencoded"};
    const searchParams = new URLSearchParams(user_info);
    return fetch("http://35.245.126.165/api/create", {
        method: "POST",
        header: header,
        body: searchParams
    }).then(function(resp){
        return resp.json();
    });
}

async function newLogin(userpwzip){
    const info = await createUser(JSON.parse(userpwzip));
    return { info };
}

function handleError(error){
    console.warn(error);
    return null;
};

module.exports = {
    loginCheck: async function(param) {
        return checkLogin(param).catch(handleError);
    },
    loginNew: async function(param) {
        return newLogin(param).catch(handleError);
    }
}
