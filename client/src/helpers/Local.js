/**
 * All localStorage implementation is here
 **/


class Local {

    static saveUserInfo(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    static saveUserSkills(data) {
        localStorage.setItem('userSkills', JSON.stringify(data));
    }
    
    static removeUserInfo() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userSkills');
    }
    
    static getToken() {
        return (localStorage.getItem('token') || '');
    }
    
    static getUser() {
        let userjson = localStorage.getItem('user');
        return userjson ? JSON.parse(userjson) : null;
    }

    static getUserSkills() {
        let userjson = localStorage.getItem('userSkills');
        return userjson ? JSON.parse(userjson) : null;
    }

    static getUserId() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.id;
    }

    static getUsername() {
        let userjson = localStorage.getItem('user');
        if (!userjson) {
            return '';
        }

        let user = JSON.parse(userjson);
        return user.username;
    }
}


export default Local;