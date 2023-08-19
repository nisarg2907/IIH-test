import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

function UserTableRow({ user }) {
  return (
    <TableRow>
      <TableCell>
        <Typography variant="body1">
          {user.firstName} {user.lastName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="textSecondary">
          {user.email}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export default UserTableRow;
