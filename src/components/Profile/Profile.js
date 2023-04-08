import React, { useState } from 'react';
import placeholder from '../../images/user-placeholder.png';
import './Profile.css';
import axios from 'axios';

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

  const handleUsernameSave = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/users/update_username/",
        { username: username },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  }

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
        <label htmlFor="profile-picture">Profile Picture:</label>
        <div className="profile-picture" style={{ backgroundImage: `url(${profilePicture})` }}>
          {profilePicture ? (
            // Show the user's profile picture
            <img src={profilePicture} alt="Profile" />
          ) : (
            // Show the user icon if there is no profile picture
            <img src={placeholder} className="placeholder" />
          )}
          <input type="file" id="profile-picture" accept="image/*" onChange={handleProfilePictureChange} />
          <label htmlFor="profile-picture">
            <span>Choose File</span>
          </label>
        </div>
        <button className="save-button" onClick={handleProfilePictureSave}>Save</button>
      </div>
      <div className='line'></div>


      <form onSubmit={handleUsernameSave} className="profile-section">
        <label htmlFor="username">Username:</label>
        <input type="text" name='username' id="username" value={username} onChange={handleUsernameChange} />
        <button className="save-button">Save</button>
      </form>

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

    </div>
  );
};

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default Profile;
