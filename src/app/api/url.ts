export const URL = ()=> {
    if (process.env.NODE_ENV === 'production') {
        return 'https://rent-appartment-app.herokuapp.com/'
    }
    else if (process.env.NODE_ENV === 'development') {
        // return 'https://rent-appartment-app.herokuapp.com/'
        return 'http://localhost:8080/'
    }
};