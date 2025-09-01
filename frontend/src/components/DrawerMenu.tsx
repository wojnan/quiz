import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';

export default function DrawerMenu() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [quizOpen, setQuizOpen] = React.useState(false);
  const [inboxOpen, setInboxOpen] = React.useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpen(newOpen);
  };

  const toggleQuiz = () => setQuizOpen(!quizOpen);
  const toggleInbox = () => setInboxOpen(!inboxOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    setDrawerOpen(false);
    navigate("/login");
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItemButton onClick={toggleQuiz}>
          <ListItemText primary="Quiz" />
          {quizOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={quizOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['Hostuj', 'Dołącz'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>

      <List>
        {['Portfel', 'Historia', 'Konto', 'Pomoc'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Wyloguj → Logout */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Wyloguj" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItemButton onClick={toggleInbox}>
          <ListItemText primary="Inbox" />
          {inboxOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={inboxOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>

      <Divider />
    </Box>
  );

  return (
    <div>
      {!drawerOpen && (
        <Button
          onClick={toggleDrawer(true)}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1200,
          }}
          variant="contained"
        >
          Menu
        </Button>
      )}

      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
