import  mongoose from 'mongoose'
import config from '../../config/config'

export default class Database {
    public static connect(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                // Connect to MongoDB
                const mongoUrl = config.MONGODB_CONNECTION_STRING
                await mongoose.connect(mongoUrl, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    bufferCommands: false, // Disable mongoose buffering
                    bufferMaxEntries: 0 // and MongoDB driver buffering
                })
                if (process.env.NODE_ENV === 'local') mongoose.set('debug', true)
                console.log('Connect to MongoDB Sucessfully.')
                resolve(true)
            } catch (err) {
                console.log(`MongoDB connection error.${err}`)
                reject(err)
            }
        })
    }
}
