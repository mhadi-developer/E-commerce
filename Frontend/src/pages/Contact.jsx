import React from 'react'
import { useForm } from 'react-hook-form' 
import * as z from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod";

const Contact = () => {

const contactSchema = z.object({ 
  name: z.string().max(20,'maximum 20 characters').min(3,'minimum 3 characters'),
  email: z.email("invalid email"),
  message:z.string().max(500,'only 500 characters').min(10,'minimum 10 characters')
});


// eslint-disable-next-line no-unused-vars
const {register, handleSubmit, watch,  formState: { errors, touchedFields }} =useForm({
    resolver: zodResolver(contactSchema),
      mode: "onBlur", 
     
})






 const onSubmit = (data) => console.log(data)

  return (
    <div className='container'> 
        <form className="row g-3 w-50" onSubmit={handleSubmit(onSubmit)} >
                <div className="col-md-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input  type="text" className="form-control" {...register("name",{required:true})}  name='name'/>
                   { touchedFields.name && errors.name &&  <p style={{color:'red'}}>{errors.name?.message}</p>}
                
            </div>
            <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input  type="text" className="form-control" {...register("email",{required:true})}  name='email'/>
                  { touchedFields.email && errors.email &&  <p style={{color:'red'}}>{errors.email?.message}</p>}
              
            </div>
            <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">Message</label>
              <div className="form-floating">
                <textarea className="form-control" placeholder="Leave a comment here" {...register("message",{required:true})} style={{height:'150px'}} id="floatingTextarea" name='message'></textarea>
                <label htmlFor="floatingTextarea">Comments</label>
                    { touchedFields.message && errors.message &&  <p style={{color:'red'}}>{errors.message?.message}</p>}
                </div>
                
            </div>
               

            <div className="col-12">
                <button type="submit" className="btn bg-custom">Send</button>
            </div>
            </form>
    </div>
  )
}

export default Contact