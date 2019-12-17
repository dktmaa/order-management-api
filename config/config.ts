const dotenv = require('dotenv')
dotenv.config()

const _PORT = process.env.PORT || 4002

const _MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/subject-areas'
const _RESTAURENT_SEARCH_API = process.env.RESTAURENT_SEARCH_API || 'http://localhost:3001/api/v1'

export default {
    PORT: _PORT,
    MONGODB_CONNECTION_STRING: _MONGODB_CONNECTION_STRING,
    RESTAURENT_SEARCH_API: _RESTAURENT_SEARCH_API
}