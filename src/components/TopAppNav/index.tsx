import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import BookingsIcon from "@mui/icons-material/EventAvailableOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ServicesIcon from "@mui/icons-material/SummarizeOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "contexts/AuthContext";
import { Avatar } from "@mui/material";
const md5 = require("md5");

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: "-58px",
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function TopAppNav({ children }: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    logout,
    email,
    name: { first, last },
  } = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginLeft: open ? "" : "58px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" noWrap component="div">
                App Name
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="body2" noWrap component="div">
              Welcome back, {first || email}!
            </Typography>
            <Avatar
              src={`https://www.gravatar.com/avatar/${md5(email || "")}`}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: "58px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "58px",
            boxSizing: "border-box",
            minHeight: "100%",
            background: "#f1f1f1",
          },
          minHeight: "100%",
        }}
        variant="persistent"
        anchor="left"
        open={!open}
      >
        <DrawerHeader sx={{ justifyContent: "space-between", display: "flex" }}>
          <IconButton sx={{ flex: 1 }} onClick={handleDrawerOpen}>
            {open ? <ChevronRightIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {[
            {
              route: "",
              Icon: HomeIcon,
            },
            {
              route: "bookings",
              Icon: BookingsIcon,
            },
            {
              route: "services",
              Icon: ServicesIcon,
            },
          ].map(({ route, Icon }) => (
            <ListItem
              sx={{
                paddingBottom: 1,
              }}
              key={route}
              disablePadding
            >
              <ListItemButton disableGutters onClick={() => navigate(route)}>
                <ListItemIcon>
                  <Icon
                    sx={{
                      height: "28px",
                      width: "28px",
                      alignSelf: "center",
                      margin: "0 auto",
                    }}
                  />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            minHeight: "100%",
          },
          minHeight: "100%",
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ justifyContent: "space-between", display: "flex" }}>
          <Typography
            sx={{
              paddingLeft: 2,
              textOverflow: "ellipsis",
              flexBasis: "200px",
              overflow: "hidden",
            }}
            variant="body1"
          >
            {first} {last}
          </Typography>
          <IconButton sx={{ flex: 1 }} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              label: "Home",
              route: "",
              Icon: HomeIcon,
            },
            {
              label: "Bookings",
              route: "bookings",
              Icon: BookingsIcon,
            },
            {
              label: "Services",
              route: "services",
              Icon: ServicesIcon,
            },

            {
              label: "Settings",
              route: "settings",
              Icon: SettingsIcon,
            },
          ].map(({ label, route, Icon }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton onClick={() => navigate(route)}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}

export default TopAppNav;
