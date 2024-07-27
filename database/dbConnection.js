import moongose from 'mongoose'


export const dbConnection = ()=>{
    moongose.connect(process.env.DB_URL)
    .then(()=>console.log("DB IS Connected"))
    .catch(()=>console.log("failed to connect to db"))
}