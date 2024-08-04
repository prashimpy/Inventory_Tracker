'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { firestore, auth, storage } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { v4 as uuidv4 } from 'uuid'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const categories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Other']

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [supplier, setSupplier] = useState('')
  const [image, setImage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [user, setUser] = useState(null)
  const router = useRouter()

  const itemsPerPage = 10

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        updateInventory()
      } else {
        router.push('/login')
      }
    })
    return () => unsubscribe()
  }, [router])

  const updateInventory = async () => {
    try {
      const snapshot = query(collection(firestore, 'inventory'))
      const docs = await getDocs(snapshot)
      const inventoryList = []
      docs.forEach((doc) => {
        inventoryList.push({ id: doc.id, ...doc.data() })
      })
      setInventory(inventoryList)
    } catch (error) {
      console.error('Error fetching inventory:', error)
    }
  }

  const addItem = async () => {
    try {
      let imageUrl = null
      if (image) {
        const imageRef = ref(storage, `images/${uuidv4()}_${image.name}`)
        await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
      }

      const docRef = doc(collection(firestore, 'inventory'), itemName)
      await setDoc(docRef, {
        quantity: 1,
        category,
        description,
        price,
        supplier,
        imageUrl
      })
      await updateInventory()
      setItemName('')
      setCategory('')
      setDescription('')
      setPrice('')
      setSupplier('')
      setImage(null)
      handleClose()
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const removeItem = async (id) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        if (quantity === 1) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef, { quantity: quantity - 1 }, { merge: true })
        }
      }
      await updateInventory()
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const filteredInventory = inventory.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  )
  const paginatedInventory = filteredInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const nextPage = () => setCurrentPage((prev) => prev + 1)
  const prevPage = () => setCurrentPage((prev) => prev - 1)

  const handleQuantityChange = async (id, action) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        const newQuantity = action === 'increase' ? quantity + 1 : Math.max(quantity - 1, 0)
        if (newQuantity === 0) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef, { quantity: newQuantity }, { merge: true })
        }
        await updateInventory()
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      sx={{ p: 2 }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'column'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item Name"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id="outlined-description"
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="outlined-price"
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              id="outlined-supplier"
              label="Supplier"
              variant="outlined"
              fullWidth
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
            <Button
              variant="contained"
              onClick={addItem}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <TextField
        id="search-bar"
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ maxWidth: '600px' }}
      />
      <Button onClick={handleOpen} variant="contained">
        Add Item
      </Button>
      <Box
        width="100%"
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
      >
        {paginatedInventory.map(({ id, name, quantity, category, description, price, supplier, imageUrl }) => (
          <Box
            key={id}
            display={'flex'}
            flexDirection={'column'}
            width={'22%'}
            minWidth={'250px'}
            p={2}
            borderRadius={1}
            border={'1px solid #d1d1d1'}
            mb={2}
            boxShadow={3}
            sx={{ maxWidth: '250px' }}
          >
            {imageUrl && <img src={imageUrl} alt={name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />}
            <Stack direction={'column'} spacing={1} mt={1}>
              <Typography variant="h6">{name} ({quantity})</Typography>
              <Typography variant="body2">Category: {category}</Typography>
              <Typography variant="body2">Description: {description}</Typography>
              <Typography variant="body2">Price: ${price}</Typography>
              <Typography variant="body2">Supplier: {supplier}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} mt={2} alignItems="center">
              <IconButton onClick={() => handleQuantityChange(id, 'decrease')} color="error">
                <RemoveCircleIcon />
              </IconButton>
              <IconButton onClick={() => handleQuantityChange(id, 'increase')} color="primary">
                <AddCircleIcon />
              </IconButton>
            </Stack>
          </Box>
        ))}
      </Box>
      <Stack direction="row" spacing={2} mt={2}>
        <Button disabled={currentPage === 1} onClick={prevPage}>
          Previous
        </Button>
        <Typography>
          Page {currentPage}
        </Typography>
        <Button disabled={paginatedInventory.length < itemsPerPage} onClick={nextPage}>
          Next
        </Button>
      </Stack>
    </Box>
  )
}
