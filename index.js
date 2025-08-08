import express from "express"
import mongoos from "mongoose"
import cors from "cors"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

mongoos
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected ");
        app.listen(PORT,() => console.log(`Server at Runing PORT ${PORT}`))
        
    })
    .catch((err) => console.error("MongoDB error : ",err))

