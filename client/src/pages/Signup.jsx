import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if(data.success === false) {
        setError(true);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(false);
    }
  }
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 rounded-lg text-white uppercase p-3 hover:opacity-95 disabled:opacity-80">
          { loading ? 'Loading...' : 'Sign Up' }
        </button>
        <button className="bg-red-700 rounded-lg text-white uppercase p-3 hover:opacity-95 disabled:opacity-80">
          Continue with google
        </button>
      </form>
      <div className="flex gap-2 my-5">
        <p>Have an account? </p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-500 my-5">{error && 'Something went wrong!'}</p>
    </div>
  );
}
