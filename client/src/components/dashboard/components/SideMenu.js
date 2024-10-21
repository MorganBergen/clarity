import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import PocketBase from 'pocketbase';
import MenuButton from './MenuButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const drawerWidth = 300;
const pb = new PocketBase('http://127.0.0.1:8090');

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const { userId } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userRecord = await pb.collection('users').getOne(userId);
          setUserData(userRecord);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  

  return (
    <Drawer
      variant="fixed"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
          <MenuRoundedIcon />
        </MenuButton>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
      </Box>
      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt={userData ? userData.name : 'User'}
          src={userData?.avatar || '/static/images/default-avatar.png'} // Default avatar path
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {userData ? userData.name : 'User Name'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {userData ? userData.email : 'user@example.com'}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
