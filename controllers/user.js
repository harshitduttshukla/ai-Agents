import bcrypt  from "bcrypt"
import jwt, { decode } from "jsonwebtoken";
import User from "../models/user"
import { inngest } from "../inngest/client";


export const singup = async (req, res) => {
    const {email, password,skills = []} = req.body;
    try {
        const hashed = bcrypt.hash(password,10);
        const user = await User.create({email,password : hashed,skills});


        await inngest.send({
            name : "user/singup",
            data : {
                email,
            }
        });

        const token = jwt.sign(
            {_id: user._id,role : user.role},
            process.env.JWT_SECRET
        );

        res.json({user,token});


    } catch (error) {
        res.status(500).json({error : "Sigup failed", details : error.message});

    }
};

export const login = async (req,res) => {
    const {email, password} =  req.body;


    try {
        const user = User.findOne({email});
        if(!user) {
            return res.status(401).json({error : "User not found"});

        }

        const isMatchpass = await bcrypt.compare(password,user.password);

        if(!isMatchpass){
            return res.status(401).json({error : "Invalid credentils"});
        }

        const token = jwt.sign({_id : user._id,role : user.role});

        res.json({user,token});

        
    } catch (error) {
        res.status(500).json({error : "Login failed", details : error.message})
    }
}

export const logout = async (req,res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) return res.status(401).json({error : "Unauthorzed"});
        jwt.verify(token, process.env.JWT_SECRET,(err,decode) => {
            if(err) return res.status(401).json({error : "Unauthorized"});
        });
        res.json({message : "Logout successfully"});
    } catch (error) {
        res.status(500).json({error : "Login failed", details : erorr.message});
    }
}