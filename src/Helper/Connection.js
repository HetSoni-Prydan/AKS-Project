
const mongoose = require('mongoose');
const uri = process.env.URI;
// const name = process.env.DB_NAME;

const db = mongoose.connection;

mongoose.connect(uri ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
        console.log("Connect To MongoDB");
    }).catch((err) => {
        console.log(err);
    });

db.on("open" , ()=> {
    console.log("DataBase Is ON");
});

db.on("close", ()=> {
    console.log("Database Is Close");
});

process.on('SIGINT' , async ()=> {
    await db.close()
    process.exit(0);
})