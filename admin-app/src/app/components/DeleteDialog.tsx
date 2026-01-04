import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import React from 'react'

export default function DeleteDialog({open, onClose, onConfirm}:any) {
  return (
   <Dialog open={open} onClose={onClose}>
        <DialogContent>
            <Typography color='primary' fontWeight="600">Are you sure you want to delete?</Typography>
        </DialogContent>
        <DialogActions>
            <Button color='secondary' onClick={onClose}>Cancel</Button>
            <Button color='error' onClick={onConfirm}>Delete</Button>
        </DialogActions>
   </Dialog>
  )
}
