import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserTableRow from './components/UserDisplay';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#777',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

function App() {
  const [users, setUsers] = useState([]);           
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [usernameSearch, setUsernameSearch] = useState('');
  const [emailSearch, setEmailSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        if (response.status === 200) {
          const data = response.data;
          setUsers(data.users);
          const groups = [];
          for (const user of data.users) {
            if (!groups.includes(user.bloodGroup)) {
              groups.push(user.bloodGroup);
            }
          }
          setBloodGroups(groups);
        } else {
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (selectedBloodGroup !== '') {
      filtered = filtered.filter(user =>
        user.bloodGroup.toLowerCase() === selectedBloodGroup.toLowerCase()
      );
    }

    if (usernameSearch !== '') {
      filtered = filtered.filter(
        user =>
          user.firstName.toLowerCase().includes(usernameSearch.toLowerCase()) ||
          user.lastName.toLowerCase().includes(usernameSearch.toLowerCase())
      );
    }

    if (emailSearch !== '') {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(emailSearch.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [selectedBloodGroup, users, usernameSearch, emailSearch]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{marginTop:"5px"}}>
       
        <Stack spacing={2} direction="row" alignItems="center">
          <TextField
            label="Search by Username"
            fullWidth
            value={usernameSearch}
            onChange={e => setUsernameSearch(e.target.value)}
            sx={{ marginRight: '5px' }}
          />
          <TextField
            label="Search by Email"
            fullWidth
            value={emailSearch}
            onChange={e => setEmailSearch(e.target.value)}
            sx={{ marginRight: '5px' }}
          />
          <FormControl fullWidth>
            <InputLabel>Select Blood Group</InputLabel>
            <Select
              value={selectedBloodGroup}
              onChange={e => setSelectedBloodGroup(e.target.value)}
            >
              <MenuItem value="">All Blood Groups</MenuItem>
              {bloodGroups.map((group, index) => (
                <MenuItem key={index} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <TableContainer sx={{ marginTop: '20px', marginLeft: '10px' }}>
          <Table sx={{ border: '1px solid #ccc' }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map(user => (
                  <UserTableRow key={user.id} user={user} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
