'use client';

import React, { useState } from 'react';

interface ProfileInfo {
  age: number;
  height: string;
  weight: string;
  activityLevel: string;
}

const profileStyles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  heading: {
    marginBottom: '1.5rem',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)'
  },
  card: {
    marginBottom: '2rem',
    backgroundColor: 'var(--card-background)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--gray-200)',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
  },
  profileHeader: {
    display: 'flex',
    gap: '2rem',
    marginBottom: '2rem'
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'var(--gray-200)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    color: 'var(--gray-600)',
    transition: 'background-color var(--transition-normal), color var(--transition-normal)'
  },
  userInfo: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)'
  },
  email: {
    color: 'var(--gray-600)',
    marginBottom: '1rem',
    transition: 'color var(--transition-normal)'
  },
  editButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--gray-100)',
    border: '1px solid var(--gray-300)',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--foreground)',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal), color var(--transition-normal)'
  },
  sectionHeading: {
    fontSize: '1.25rem',
    marginBottom: '1rem',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)'
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)'
  },
  infoValue: {
    color: 'var(--gray-600)',
    transition: 'color var(--transition-normal)'
  },
  settingsButtons: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem'
  },
  settingButton: {
    padding: '0.75rem',
    textAlign: 'left' as const,
    backgroundColor: 'var(--gray-100)',
    border: '1px solid var(--gray-200)',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--foreground)',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal), color var(--transition-normal)'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid var(--gray-300)',
    borderRadius: '4px',
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal), color var(--transition-normal)'
  },
  saveButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem',
    transition: 'background-color var(--transition-fast), transform var(--transition-fast)'
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--gray-100)',
    border: '1px solid var(--gray-300)',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--foreground)',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal), color var(--transition-normal)'
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    animation: 'fadeIn var(--transition-normal) ease'
  },
  modalContent: {
    backgroundColor: 'var(--card-background)',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: 'var(--shadow-lg)',
    animation: 'slideUp var(--transition-normal) ease',
    transition: 'background-color var(--transition-normal)'
  },
  modalHeader: {
    marginBottom: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'var(--foreground)',
    transition: 'color var(--transition-normal)'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: 'var(--gray-600)',
    transition: 'color var(--transition-fast)'
  },
  select: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid var(--gray-300)',
    borderRadius: '4px',
    backgroundColor: 'var(--background)',
    color: 'var(--foreground)',
    transition: 'background-color var(--transition-normal), border-color var(--transition-normal), color var(--transition-normal)'
  }
};

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    age: 30,
    height: '175 cm',
    weight: '70 kg',
    activityLevel: 'Moderate'
  });

  const [userName, setUserName] = useState<string>('User Name');
  const [email, setEmail] = useState<string>('user@example.com');
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(userName);
  const [editedEmail, setEditedEmail] = useState<string>(email);
  const [editedProfileInfo, setEditedProfileInfo] = useState<ProfileInfo>({...profileInfo});
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState<boolean>(false);

  const handleEditProfile = () => {
    setEditedName(userName);
    setEditedEmail(email);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setUserName(editedName);
    setEmail(editedEmail);
    setIsEditingProfile(false);
  };

  const handleEditPersonalInfo = () => {
    setEditedProfileInfo({...profileInfo});
    setIsEditingPersonalInfo(true);
  };

  const handleSavePersonalInfo = () => {
    setProfileInfo(editedProfileInfo);
    setIsEditingPersonalInfo(false);
  };

  const handleSettingClick = (setting: string) => {
    console.log(`${setting} clicked`);
    // Add setting-specific logic here
  };

  const handleChangeProfileInfo = (key: keyof ProfileInfo, value: string | number) => {
    setEditedProfileInfo(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="container" style={profileStyles.container}>
      <h1 style={profileStyles.heading}>Your Profile</h1>
      
      <div className="card" style={profileStyles.card}>
        <div style={profileStyles.profileHeader}>
          <div style={profileStyles.avatar}>
            {userName.charAt(0).toUpperCase()}
          </div>
          
          <div>
            <h2 style={profileStyles.userInfo}>{userName}</h2>
            <p style={profileStyles.email}>{email}</p>
            <button 
              style={profileStyles.editButton}
              onClick={handleEditProfile}
              className="tap-effect"
            >
              Edit Profile
            </button>
          </div>
        </div>
        
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={profileStyles.sectionHeading}>Personal Information</h3>
            <button 
              style={profileStyles.editButton}
              onClick={handleEditPersonalInfo}
              className="tap-effect"
            >
              Edit Info
            </button>
          </div>
          <div style={profileStyles.infoGrid}>
            {Object.entries(profileInfo).map(([key, value]) => (
              <div key={key}>
                <p style={profileStyles.infoLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </p>
                <p style={profileStyles.infoValue}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card" style={profileStyles.card}>
        <h3 style={profileStyles.sectionHeading}>Account Settings</h3>
        <div style={profileStyles.settingsButtons}>
          {['Change Password', 'Notification Settings', 'Privacy Settings'].map(setting => (
            <button 
              key={setting}
              style={profileStyles.settingButton}
              onClick={() => handleSettingClick(setting)}
              className="tap-effect"
            >
              {setting}
            </button>
          ))}
        </div>
      </div>
      
      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div style={profileStyles.modalOverlay}>
          <div style={profileStyles.modalContent}>
            <div style={profileStyles.modalHeader}>
              <h3 style={profileStyles.modalTitle}>Edit Profile</h3>
              <button style={profileStyles.closeButton} onClick={() => setIsEditingProfile(false)}>×</button>
            </div>
            <div style={profileStyles.formGroup}>
              <label style={profileStyles.label}>Name</label>
              <input 
                style={profileStyles.input}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div style={profileStyles.formGroup}>
              <label style={profileStyles.label}>Email</label>
              <input 
                style={profileStyles.input}
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </div>
            <div>
              <button style={profileStyles.saveButton} onClick={handleSaveProfile}>Save</button>
              <button style={profileStyles.cancelButton} onClick={() => setIsEditingProfile(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Personal Info Modal */}
      {isEditingPersonalInfo && (
        <div style={profileStyles.modalOverlay}>
          <div style={profileStyles.modalContent}>
            <div style={profileStyles.modalHeader}>
              <h3 style={profileStyles.modalTitle}>Edit Personal Information</h3>
              <button style={profileStyles.closeButton} onClick={() => setIsEditingPersonalInfo(false)}>×</button>
            </div>
            <div style={profileStyles.formGroup}>
              <label style={profileStyles.label}>Age</label>
              <input 
                style={profileStyles.input}
                type="number"
                value={editedProfileInfo.age}
                onChange={(e) => handleChangeProfileInfo('age', parseInt(e.target.value))}
              />
            </div>
            <div style={profileStyles.formGroup}>
              <label style={profileStyles.label}>Height</label>
              <input 
                style={profileStyles.input}
                value={editedProfileInfo.height}
                onChange={(e) => handleChangeProfileInfo('height', e.target.value)}
              />
            </div>
            <div style={profileStyles.formGroup}>
              <label style={profileStyles.label}>Weight</label>
              <input 
                style={profileStyles.input}
                value={editedProfileInfo.weight}
                onChange={(e) => handleChangeProfileInfo('weight', e.target.value)}
              />
            </div>
            <div style={profileStyles.formGroup}>
              <label style={profileStyles.label}>Activity Level</label>
              <select 
                style={profileStyles.select}
                value={editedProfileInfo.activityLevel}
                onChange={(e) => handleChangeProfileInfo('activityLevel', e.target.value)}
              >
                <option>Sedentary</option>
                <option>Light</option>
                <option>Moderate</option>
                <option>Active</option>
                <option>Very Active</option>
              </select>
            </div>
            <div>
              <button style={profileStyles.saveButton} onClick={handleSavePersonalInfo}>Save</button>
              <button style={profileStyles.cancelButton} onClick={() => setIsEditingPersonalInfo(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 