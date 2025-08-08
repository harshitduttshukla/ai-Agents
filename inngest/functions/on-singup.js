import { NonRetriableError } from "inngest"
import { inngest } from "../client"
import User from "../../models/user"
import { sendMail } from "../../utils/mailer"

export const onUserSignup = inngest.createFunction(
    {id: "on-user-signUp",retries : 2},
    {event : "user/singup"},

    

    async ({event,step}) => {
        try {
            const {email} = event.data
           const user =  await step.run("get-user-email",async() => {
            const userObject = await User.findOne({email})
            if(!userObject){
                throw new NonRetriableError("User no longer exits in our database")
            }
            return userObject
        })

        await step.run("send-welcome-email",async () => {
            const subject = `Welcome to the app`
            const message = `Hi
            \n\n
            Thanks for singing up, We're glad to have you
            onboard!
            `
            await sendMail(user.email,subject,message)

        })   

        return {success : true}

        } catch (error) {
            console.error("Error running step",error.message);
            return {success : false}
            
        }
    }
)