import { useState } from 'react'

export default function EditProfile({
  setPage,
  profile,
  setProfile,
}) {
  const inputStyle = {
    width: '100%',
    padding: '14px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '15px',
    marginTop: '6px',
    boxSizing: 'border-box',
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F5ECD7',
        padding: '120px 40px',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 8px 30px rgba(0,0,0,.08)',
        }}
      >
        <h1
          style={{
            color: '#3D0000',
            marginBottom: '10px',
          }}
        >
          Edit Profile
        </h1>

        <p
          style={{
            color: '#666',
            marginBottom: '35px',
          }}
        >
          Update your personal information.
        </p>

        {/* Profile */}
        <div
          style={{
            textAlign: 'center',
            background: '#FAFAFA',
            padding: '30px',
            borderRadius: '16px',
            marginBottom: '35px',
          }}
        >
          <div
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: '#8B1A1A',
              color: '#fff',
              fontSize: '34px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
            }}
          >
            {profile?.name?.charAt(0)}
          </div>

          <h3>{profile?.name}</h3>
          <p>{profile?.email}</p>

          <button
            style={{
              padding: '10px 18px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            Change Photo
          </button>
        </div>

        {/* Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}
        >
          <div>
            <label>Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone: e.target.value,
                })
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location: e.target.value,
                })
              }
              style={inputStyle}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: '35px',
            padding: '20px',
            background: '#FAFAFA',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ color: '#3D0000' }}>
            Account Information
          </h3>

          <p>
            <strong>Status:</strong> Active
          </p>

          <p>
            <strong>Member Since:</strong> Jan 2026
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '30px',
          }}
        >
          <button
            onClick={() => setPage('portal')}
            style={{
              padding: '12px 18px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>

          <button
            onClick={() => {
              alert('Profile Updated Successfully')
              setPage('portal')
            }}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              border: 'none',
              background: '#8B1A1A',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}