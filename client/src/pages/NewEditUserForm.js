import React from 'react'

export default function NewEditUserForm() {
    // const handleSubmit = (user) => {
    //     addUserToDatabase(user);
    //     console.log('this is working')
    //   }
      
      return (
        <div className="wrapper">
          <h3>Personal Information</h3>
          <form>
          <fieldset>
             <label>
               <p>First Name</p>
               <input name="first name" />
             </label>
             <label>
               <p>Last Name</p>
               <input name="last name" />
             </label>
             <label>
               <p>Bio</p>
               <textarea name="bio" />
             </label>
             <label>
               <p>Social Media</p>
               <input name="social media" />
             </label>
           </fieldset>
           <button type="submit">Submit</button>
          </form>
        </div>
      )
}