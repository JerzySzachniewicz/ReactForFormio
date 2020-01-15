export default class AuthService {

    constructor(domain) {
        this.domain = domain || 'http://localhost:8090';
    }

    login = (name, password) => {
        return this.fetch(`/login`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                password
            })
        }).then(res => {
            this.setToken(res.headers.get("Authorization"));
            return Promise.resolve(res);
        })
    };

    loggedIn = () => {
        return !!this.getToken();
    };

    setToken = (token) => {
        localStorage.setItem('token', token)
    };

    getToken = () => {
        return localStorage.getItem('token')
    };

    logout = () => {
        localStorage.removeItem('token');
    };

    fetch = (url, options) => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        if (this.loggedIn()) {
            headers['Authorization'] = this.getToken();
        }
        url = this.domain + url;
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => {
                const contentLength = response.headers.get("Content-Length");
                return (contentLength !== "0") ? response.json() : response;
            })
    };

    _checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}