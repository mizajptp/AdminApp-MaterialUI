import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import React from 'react'

export default function ErrorDialog({errorMessage, onClose}:any) {
    
  return (
    <Dialog open={!!errorMessage} onClose={onClose}>
        <DialogContent>
          <Typography color='error' fontWeight="600">{errorMessage}</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
            <Button variant='outlined' size='small' color='primary' onClick={onClose}>Ok</Button>
        </DialogActions>
    </Dialog>
  )
}
