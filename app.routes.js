// Auth 
const blog = require('./routes/Blog/blog.router')


// NO Auth


function createRoutesNoAuth(app) {
    app.use('/api', blog)
}


module.exports = {
    createRoutesNoAuth: createRoutesNoAuth
}