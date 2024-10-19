/**
 * @description     navigation component that can be added in a return statement
 *                  to initialize the navigation bar for the application
 *                  `<Navigation />`
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import './MainDashboard.css';

const Navigation = () => {
    const mainItems = [
        { text: 'Dashboard', link: '/MainDashboard' },
        { text: 'Analysis', link: '/Analysis' },
        { text: 'Logging', link: '/Logging' },
        { text: 'Reports', link: '/Reports' },
    ];

    const bottomItems = [
        { text: 'Settings', link: '/Settings' },
        { text: 'Sign Out', link: '/' },
    ];

    return (

        <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' }, }}>
        
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}> 
        
                <List className="top-navigation-list">
                    {mainItems.map(({ text, link }) => (
                        <ListItem button key={text} component={Link} to={link}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                
                <List className="bottom-navigation-list">

                    {bottomItems.map(({ text, link }) => (
                        <ListItem button key={text} component={Link} to={link}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Navigation;