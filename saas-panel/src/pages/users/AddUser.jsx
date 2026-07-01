import React, { useState } from 'react';
import HeadingHeader from '../../components/common/HeadingHeader';
import Card from '../../components/common/Card';
import BorderedFieldset from '../../components/common/BorderedFieldset';
import SlidingLabelInput from '../../components/common/SlidingLabelInput';
import ProfileImageUpload from '../../components/common/ProfileImageUpload';
import SlidingLabelSelect from '../../components/common/SlidingSelect';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import SlidingLabelTextarea from '../../components/common/SlidingLabelTextarea';
import SlidingLabelCheckbox from '../../components/common/SlidingLabelCheckbox';

const AddUser = () => {
    const [UserData, setUserData] = useState({
          fullName: "",
          userName: "",
          email: "",
          mobileNumber: "",
            profileImage: null,
          role: "", 
            rolePermission: "",
          isActive: true,
            notes: "",
            setPassword: "",
            confirmPassword: "",
            requirePasswordChange: false,
            loginCredentialsEmail: false,   

         
        });
      
        const handleChange = (field, value) => {
          setUserData((prev) => ({ ...prev, [field]: value }));
        };
      
    return(
      <>
       <HeadingHeader
              title='Add User'
              items={[
                  { label: 'Dashboard', path: '/' },
                  { label: 'User', path: '/users/manage' },
                  { label: 'Add User', path: '/users/add' },
                
              ]}
              />
       
                     <div className='flex flex-col md:flex-row gap-4'>
                   <ProfileImageUpload
              type="file"
              label="Profile Image"
              placeholder="Enter Profile Image  "
              className=' w-full  '
              value={UserData.profileImage}
              onChange={(e) => handleChange("profileImage", e.target.value)}
            />      
          <Card>
          
                {/* Section 1: Basic User Details */}
                <BorderedFieldset  legend="Basic User Details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SlidingLabelInput
                      type="text"
                      label="Full Name"
                      placeholder="John Doe"
                      value={UserData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                    />
          
                    <SlidingLabelInput
                      type="text"
                      label="Username"
                      placeholder="john_doe"
                    value={UserData.userName}
                      onChange={(e) => handleChange("userName", e.target.value)}
                    />
          
                     <SlidingLabelInput
                      type="email"
                      label="Email"
                      placeholder="johndoe123@gmail.com"
                    value={UserData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
          
                     <SlidingLabelInput
                      type="number"
                      label="Mobile Number"
                      placeholder="+91 9876543210"
                    value={UserData.mobileNumber}
                      onChange={(e) => handleChange("mobileNumber", e.target.value)}
                    />
                  </div>
          
                 
                </BorderedFieldset>
          
                {/* Section 2: Role and Access */}
                <BorderedFieldset legend="Role and Access">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <SlidingLabelSelect
                              label="Role "
                              value={UserData.role}
                              onChange={(e) => handleChange("role", e.target.value)}
                            >
                              <option value="">Select</option>
                              <option>Super Admin</option>
                               <option>Technical Admin</option>
                              <option>Support Agent </option>
                                <option>Sales</option>
                             
                            </SlidingLabelSelect>
              
              
                   
          <SlidingLabelInput
              type="text"
              label="Role Permission "
              placeholder="Super Admin/Technical Admin/Support Agent/Sales "
              value={UserData.rolePermission}
              onChange={(e) => handleChange("rolePermission", e.target.value)}
            />  
               <ToggleSwitch
                label="Status"
            checked={UserData.isActive}
              onChange={(val) => handleChange("isActive", val)}
              />
                  </div>
                  <div className='mt-4'>
                    <SlidingLabelTextarea
              type="textarea"
              label="Notes"
              placeholder="notes for this user"
              className='w-full mt-4'
              value={UserData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            /> 
              </div>
                </BorderedFieldset>
                {/* Section 3: Login Credentials */}
                <BorderedFieldset legend="Login Credentials">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <SlidingLabelInput
              type="password"
              label="Set Password "
              placeholder="Enter new password  "
              value={UserData.setPassword}
              onChange={(e) => handleChange("setPassword", e.target.value)}
            />  
                  
           <SlidingLabelInput
              type="confirm password"
              label="Confirm Password"
              placeholder="Confirm Password "
              value={UserData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />  
            <SlidingLabelCheckbox

  label="Require Password Change on First Login"
  name="requirePasswordChange"
  checked={UserData.requirePasswordChange}
  onChange={(e) => handleChange("requirePasswordChange", e.target.checked)}
/>

              <SlidingLabelCheckbox
  label="Send Login Credentials via Email"
  name="loginCredentialsEmail"
  checked={UserData.loginCredentialsEmail}
  onChange={(e) => handleChange("loginCredentialsEmail", e.target.checked)}
//   error={error}
/>  
                  </div>
                </BorderedFieldset>
          
                
                {/* Submit Button */}
                <div className="mt-8 text-right">
                  <button
                    onClick={() => console.log(UserData)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save User
                  </button>
                </div>
        
                </Card>
  
   </div>
            
      


      </>
    )
}

export default AddUser; 


