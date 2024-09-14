
const serverDomain = `http://localhost:3500`

const summaryAPI = {
    register : {
        url : `${serverDomain}/api/register`,
        method : `post`
    },
    login: {
        url : `${serverDomain}/api/login`,
        method : `post`
    },
    current_user: {
        url : `${serverDomain}/api/user-details`,
        method : `get`
    },
    logout: {
        url : `${serverDomain}/api/logout`,
        method : `get`
    }
}

export default summaryAPI