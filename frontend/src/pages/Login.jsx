import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", form);

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Login successful!");

            navigate("/dashboard");

        } catch (err) {
            alert("Invalid credentials");
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button>Login</button>

            </form>

            <p>
                Don't have an account?
                <Link to="/register">
                    {" "}Register
                </Link>
            </p>

        </div>
    );
}

export default Login;