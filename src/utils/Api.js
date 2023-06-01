const URL_PREFIX = "http://localhost:3001"

const API = {
    signin:(userObj)=>{
        return fetch(`${URL_PREFIX}/users/login`,{
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type":"application/json"

            }
        }).then(res=>res.json())
    },
    signup:(userObj)=>{
        return fetch(`${URL_PREFIX}/users/`,{
            method: 'POST',
            body: JSON.stringify(userObj),
            headers: {
                "Content-Type":"application/json"

            }
        }).then(res=>res.json())
    },
    // TODO: GET BY ID FOR PROFILE / USER
    getProfile: async (userObj) => {
        try {
            const dbProfileData = await fetch(`${URL_PREFIX}/profiles/:`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            return dbProfileData.json();
        } catch (error) {
            console.log(error);
        }
    }
}
export default API