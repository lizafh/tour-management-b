import {Server} from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server : Server;


const startServer = async () =>{
try {
  
    await mongoose.connect(envVars.DB_URL)
console.log("Connected to DB");

server = app.listen(envVars.PORT, ()=>{
    console.log(`Server is listening to port ${envVars.PORT}`);
});

} catch (error) {
   console.log(error) 
}
}

startServer()


process.on("SIGTERM", ()=>{
  console.log("SIGTERM signal received... server shutting down..")  

  if(server){
    server.close(()=>{
process.exit(1)
    });
    
  }
process.exit(1)
})

process.on("unhandledRejection", (err)=>{
  console.log("Unhandled Rejection detected... server shutting down..", err)  

  if(server){
    server.close(()=>{
process.exit(1)
    });
    
  }
process.exit(1)
})

process.on("uncaughtException", (err)=>{
  console.log("Uncaught Exception detected... server shutting down..", err)  

  if(server){
    server.close(()=>{
process.exit(1)
    });
    
  }
process.exit(1)
})



// unhandle rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// uncaught exception error
// throw new Error("I forgot to handle local error")

