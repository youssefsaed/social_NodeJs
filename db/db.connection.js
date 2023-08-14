import mongoose from "mongoose";

export const dBConnection= ()=>mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log('DB is connection ........'))
.catch((error)=>console.log({DBError:error}))