// app/layout.js
'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Sign Out Error', error)
    }
  }

  return (
    <html lang="en">
      <body>
        <Box>
          <AppBar position="static" color="primary">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Inventory Management
              </Typography>
              <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={handleDrawerToggle}
              onKeyDown={handleDrawerToggle}
            >
              <List>
                <ListItem button onClick={() => router.push('/')}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => router.push('/profile')}>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => router.push('/settings')}>
                  <ListItemText primary="Settings" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ p: 3 }}>
            {children}
          </Box>
        </Box>
      </body>
    </html>
  )
}
