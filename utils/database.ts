import mongoose from "mongoose";

let isConnected: boolean = false; // track connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('=> Mongodb is already connected');
        return;
    }

    try{
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