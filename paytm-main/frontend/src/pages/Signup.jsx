import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/Inputbox";
import { Subheading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom"
export const Signup = () => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async () => {
        setLoading(true);
        setError("")
        console.log("in handle")
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                password,
                firstname,
                lastname
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")

            // Handle success (e.g., redirect or show a success message)
        } catch (err) {
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                {"displ"+password + username}
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Sign up" />
                    <Subheading label="Enter your credentials to access your account" />
                    <Inputbox 
                        onChange={(e) => setfirstname(e.target.value)} 
                        label="First Name" 
                        placeholder="John" 
                    />
                    <Inputbox 
                        onChange={(e) => {
                            console.log(e.target.value);
                            setlastname(e.target.value)
                        }} 
                        label="Last Name" 
                        placeholder="Doe" 
                    />
                    <Inputbox 
                        onChange={(e) => setusername(e.target.value)} 
                        label="Email" 
                        placeholder="example@gmail.com" 
                    />
                    <Inputbox 
                        onChange={(e) => setpassword(e.target.value)} 
                        label="Password" 
                        placeholder="123456" 
                        type="password" // Consider adding type for password input
                    />
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="pt-4">
                        <Button 
                            onClick={handleSubmit} 
                            
                            label={loading ? "Signing up..." : "Sign up"} 
                            disabled={loading} // Disable button during loading
                        />
                    </div>
                    <BottomWarning label="Already have an account?" to="/signin" buttonText="Sign in" />
                </div>
            </div>
        </div>
    );
};
