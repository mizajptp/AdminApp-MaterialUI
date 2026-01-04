import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from 'react'
import { StyledTableCell } from './StyledTableCell';

export default function CategoryTable({
    categories,
    onEdit,
    onDelete
} : any) {
  return (
    <Box display="flex" justifyContent="center">
        <Table sx={{ mt: 4, maxWidth: 500 }} size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell width="85">ID</StyledTableCell>
              <StyledTableCell width="100">Image</StyledTableCell>
              <StyledTableCell width="150">Name</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((c : any) => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>
                  <img
                    src={c.image}
                    alt={c.name}
                    width={50}
                    height={50}
                    style={{ borderRadius: 4 }}
                  />
                </TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="space-around">
                    <Button
                      size="small"
                      onClick={() => {
                        onEdit(c);
                      }}
                      startIcon={<EditIcon />}
                    ></Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(c.id)}
                    ></Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

  )
}
