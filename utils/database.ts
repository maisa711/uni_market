import mongoose from "mongoose";

let isConnected: boolean = false; // track connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    // check if we have connection to our database
    if (isConnected) {
        console.log('=> Mongodb is already connected');
        return;
    }


    try{
        // connect to the database
        await mongoose.connect(`${process.env.MONGODB_URI }`, {
            dbName: 'uni_market',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log('=> database is connected');
    }
    catch(err){
        console.log(err);
    }
}