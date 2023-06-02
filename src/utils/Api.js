const URL_PREFIX = "http://localhost:3003"

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
    },
    // Create Project
    createProject: async (userObj) => {
        try {
            const response = await fetch(`${URL_PREFIX}/projects`, {
                method: 'POST',
                body: JSON.stringify(userObj),
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            
            if (response.ok) {
                return response.json();
            } else {
                // TESTING PURPOSES
                alert('Cannot create project');
            }

        } catch (error) {
            console.log(error);
        }
    },
    verifyToken:(token)=>{
        return fetch(`${URL_PREFIX}/users/auth/verifytoken`,{
            headers:{
                "authorization":`Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("falied signup");
            }
          });
    },
    findProjectsByLang: async (x) => {
        try {
            const response = await fetch(`${URL_PREFIX}/projects/language/${x}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            if (response.ok) {
                return response.json();
            } else {
                alert('Unable to fetch');
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default API