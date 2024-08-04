'use client'

import { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#121212', // Dark background
  color: '#ffffff', // Light text
}

const textFieldStyle = {
  marginBottom: '20px',
  '& .MuiInputLabel-root': {
    color: '#90caf9', // Label color
  },
  '& .MuiInputBase-input': {
    color: '#ffffff', // Text color
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#90caf9', // Border color
    },
    '&:hover fieldset': {
      borderColor: '#64b5f6', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#64b5f6', // Border color when focused
    },
  },
}

const buttonStyle = {
  backgroundColor: '#90caf9', // Button background
  color: '#000000', // Button text color
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#64b5f6', // Background color on hover
  },
}

const toggleButtonStyle = {
  color: '#90caf9', // Toggle button text color
  marginTop: '20px',
  '&:hover': {
    color: '#64b5f6', // Text color on hover
  },
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isNewUser, setIsNewUser] = useState(false)

  const handleAuth = async () => {
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      window.location.href = '/' // Redirect to home page after login
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Box sx={containerStyle}>
      <Typography variant="h4">
        {isNewUser ? 'Sign Up' : 'Log In'}
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={textFieldStyle}
        variant="outlined"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={textFieldStyle}
        variant="outlined"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" sx={buttonStyle} onClick={handleAuth}>
        {isNewUser ? 'Sign Up' : 'Log In'}
      </Button>
      <Button sx={toggleButtonStyle} onClick={() => setIsNewUser(!isNewUser)}>
        {isNewUser ? 'Already have an account? Log In' : 'New user? Sign Up'}
      </Button>
    </Box>
  )
}
