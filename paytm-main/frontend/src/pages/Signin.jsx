import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"

export const Signin=()=>{
    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}></Heading>
                    <Subheading label={"Enter your credentials to access your account"}></Subheading>
                    <Inputbox label={"Email"} placeholder={"example@gmail.com"}></Inputbox>
                    <Inputbox label={"Password"} placeholder={"123456"}></Inputbox>
                    <div className="pt-4">
                        <Button label={"Sign in"} />
                    </div>
                    <BottomWarning label={"dont have an account?"} to={"/signup"} buttonText={"Sign up"}></BottomWarning>
                    </div>
            </div>
       </div>
    )
}