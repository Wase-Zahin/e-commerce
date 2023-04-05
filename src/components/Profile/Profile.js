import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleUsernameSave = () => {
    // handle save username logic
  };

  const handlePasswordSave = () => {
    // handle save password logic
  };

  const handleProfilePictureSave = () => {
    // handle save profile picture logic
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <div className="profile-section">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        <button className="save-button" onClick={handleUsernameSave}>Save</button>
      </div>

      <div className='line'></div>
      
      <div className="profile-section">
        <label htmlFor="current-password">Current Password:</label>
        <input type="password" id="current-password" value={currentPassword} onChange={handleCurrentPasswordChange} />
      </div>
      <div className="profile-section">
        <label htmlFor="new-password">New Password:</label>
        <input type="password" id="new-password" value={newPassword} onChange={handleNewPasswordChange} />
      </div>
      <div className="profile-section">
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        <button className="save-button" onClick={handlePasswordSave}>Save</button>
      </div>

      <div className='line'></div>

      <div className="profile-section">
        <label htmlFor="profile-picture">Profile Picture:</label>
        <div className="profile-picture" style={{ backgroundImage: `url(${profilePicture})` }}>
          <input type="file" id="profile-picture" accept="image/*" onChange={handleProfilePictureChange} />
          <label htmlFor="profile-picture">
            <span>Choose File</span>
          </label>
        </div>
        <button className="save-button" onClick={handleProfilePictureSave}>Save</button>
      </div>
    </div>
  );
};

export default Profile;
