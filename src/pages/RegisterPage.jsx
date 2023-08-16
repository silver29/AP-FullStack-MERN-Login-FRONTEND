import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
//import { registerRequest } from '../api/auth';

function RegisterPage() {
    const { register, handleSubmit, formState:{errors} } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    //const { signup, user } = useAuth();
    //console.log(user)
    /*No crea estados*/ 
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated) navigate("/tasks");
    },[isAuthenticated]);

    const onSubmit = handleSubmit( async (values) => {
        console.log(values);
        // enviar los valores de username, email, password
       /*  const res = await registerRequest(values)
        console.log(res) */
        signup(values)
    });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-800 max-w-md p-10 rounded-md w-full">
            {
                registerErrors.map((error,i) => (
                    <div className="bg-red-500 p-2 text-white" key={i}>
                        {error}
                    </div>
                ))
            }

            <h1 className='text-3xl font-bold my-2'>Register</h1>
            <form onSubmit={onSubmit}>
                <div className='mb-5'>
                    <input type="text" {...register("username", {required:true})} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder='Username'
                    />
                    { 
                        errors.username && (
                            <p className="text-red-500">Username is required</p>
                    )}
                </div>
                <div className='mb-5'>
                    <input type="email" {...register("email", {required:true})} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder='Email'
                    />
                    {errors.email && (<p className="text-red-500">Email is required</p>)}
                </div>
                <div className='mb-5'>
                    <input type="password" {...register("password", {required:true})} 
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder='Password'
                    />
                    {errors.password && (<p className="text-red-500">Password is required</p>)}
                </div>
                <div>
                    <button type="submit"
                        className='bg-sky-500 text-white px-4 py-2 rounded-md my-2'
                    >
                        Register
                    </button>
                </div>
            </form>
            <p className='flex gap-x-2 justify-between'>
                Already have an account?{" "} 
                <Link to="/login" className='text-sky-500'>Login</Link>
            </p>
        </div>
    </div>
  )
}

export default RegisterPage