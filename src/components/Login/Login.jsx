import React from "react";
import { useForm } from "react-hook-form";
import './Login.css'

function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (

      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)} className="form-vertical">
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="email" {...register("example")} />
        
        {/* include validation with required or other standard HTML validation rules */}
        <input defaultValue="password" {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        
        <input type="submit" />
      </form>
    );
  }

export default Login;