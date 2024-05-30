import { List, ListItem, ListItemText, Button, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const SidebarMenu = ({ activeItem, menuItems, handleAddModule, handleMenuClick, handleDeleteItem }) => {
    return (
        <Box sx={{ width: '200px', borderRight: '1px solid gray', padding: '10px' }}>
            <List>
                {menuItems.map((item, index) => (
                    <Box key={index}>
                        {(item.type === 'module') && (
                            <hr/>
                        )}
                        <ListItem button onClick={() => handleMenuClick(item)}>
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={
                                    item.type === 'module' || item.label === 'Overview'
                                        ? { variant: 'h6', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
                                        : {}
                                }
                            />
                            {activeItem && activeItem.id === item.id && activeItem.label != 'Overview' && (
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the menu click event
                                        handleDeleteItem(item);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </ListItem>
                        {(item.type === 'module') && (
                            <hr />
                        )}
                    </Box>
                ))}
            </List>
            <Button variant="contained" onClick={handleAddModule} fullWidth>
                + Add a module
            </Button>
        </Box>
    );
};

export default SidebarMenu;
