import React, { useState } from 'react'

export default function NewEditUserForm() {
    // const handleSubmit = (user) => {
    //     addUserToDatabase(user);
    //     console.log('this is working')
    //   }
      
      return (
        <div className="container">
          <h2>Personal Information</h2>
          <form>
            <div className="form-group">
             <label>First Name</label>
               <input
               type="text"
               className="form-control"
               name="first_name"
               />
             </div>
             <div className="form-group">
              <label>Last Name</label>
              <input
              type="text"
              className="form-control"
              name="last_name"
              />
             </div>
             <div className="form-group">
              <label>Bio</label>
              <input
              type="text"
              className="form-control"
              name="bio" 
              />
             </div>
             <div className="form-group">
             <label>Social Media</label>
               <input
               type="text"
               className="form-control"
               name="social media"
               />
             </div>
           <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      )
}