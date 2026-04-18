import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "api/authApi";
import { useAuth } from "@/hooks/useAuth";
import {createGym} from 'api/gymsApi'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ email, password });
      loginUser(res.data.access_token);
      navigate("/");
    } catch (err: any) {
      const message = err.response?.data?.message || "An unexpected error occurred";
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border"
        />

        <button className="bg-blue-600 text-white p-2">Login</button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
			<button onClick={createGym} className="bg-blue-600 text-white p-2">Create</button>
    </div>
  );
}
