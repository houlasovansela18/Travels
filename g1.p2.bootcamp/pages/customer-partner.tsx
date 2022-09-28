import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PeopleIcon from "@mui/icons-material/People";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import PartnerPropertyCard from "../components/partnerPropertyCard";

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
		marginLeft: 0,
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

const iconsButtonMenu = [
	<PeopleIcon key={`PeopleIcon`} />,
	<DeleteOutlineIcon key={`DeleteOutlineIcon`} />,
	<HelpIcon key={`HelpIcon`} />,
];

export default function PersistentDrawerLeft() {
	const router = useRouter();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
	const [openConfirmDeleteDialog, setOpenDeleteDialog] = useState(false);

	const [properties, setProperties] = useState([
		{
			image:
				"https://cdn.ceoworld.biz/wp-content/uploads/2021/05/Soneva-Fushi.jpg",
			name: "Sika Beach",
			totalRateReport: 15,
			totalRate: 4.5,
			id: 1,
		},
		{
			image:
				"https://pix10.agoda.net/hotelImages/291/2919195/2919195_17111313080059220964.jpg?ca=6&ce=1&s=1024x768",
			name: "Kuru Resort",
			totalRateReport: 17,
			totalRate: 3.3,
			id: 2,
		},
		{
			image:
				"https://cf.bstatic.com/xdata/images/hotel/max1024x768/153181070.jpg?k=79961b555c8175ba90a4b85d586da8e48e02a59bc809ae6a2dbfc4730aa9df12&o=&hp=1",
			name: "Mali Resort",
			totalRateReport: 15,
			totalRate: 4.5,
			id: 3,
		},
		{
			image:
				"https://pix10.agoda.net/hotelImages/705395/-1/4ae82c9a656bedbba35b659d5e58c18e.jpg?ca=6&ce=1&s=1024x768",
			name: "Kompot Resort",
			totalRateReport: 15,
			totalRate: 4.5,
			id: 4,
		},
		{
			image:
				"https://images.realestate.com.kh/__sized__/listings/2021-08/187605-187605_96246061_AtORRL0-thumbnail-400x300-70.jpeg",
			name: "Rell Resort",
			totalRateReport: 15,
			totalRate: 4.5,
			id: 5,
		},
	]);

	function handleDeleteProperty(id: number) {
		setProperties(properties.filter((property) => property.id != id));
	}

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	// Handle Register Dialog
	const handleRegisterOpenDialog = () => {
		setOpenRegisterDialog(true);
	};

	const handleRegisterCloseDialog = () => {
		setOpenRegisterDialog(false);
	};

	const Img = styled("img")({
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%",
	});

	// Handle confirm delete dialog
	const handleDeleteOpenDialog = () => {
		setOpenDeleteDialog(true);
	};

	const handleDeleteCloseDialog = () => {
		setOpenDeleteDialog(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar sx={{ backgroundColor: "#1B8F81" }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="div"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<Typography variant="h5" noWrap component="div">
							Admin
						</Typography>
						<Typography variant="h5" noWrap component="div">
							Profile
						</Typography>
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>

				<Divider />
				<List>
					<ListItem key={"Employee"} disablePadding>
						<Link href={{ pathname: "/dashboard", query: { open: open } }}>
							<ListItemButton>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>

								<ListItemText primary={"Employee"} />
							</ListItemButton>
						</Link>
					</ListItem>
					<ListItem key={"customer-partner"} disablePadding>
						<Link href={"/customer-partner"}>
							<ListItemButton>
								<ListItemIcon>
									<FactCheckIcon />
								</ListItemIcon>

								<ListItemText primary={"Customer Partner"} />
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
				<Divider />
				<List>
					{["Listing", "Trash", "Help"].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>{iconsButtonMenu[index]}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>

			<Main open={open}>
				<DrawerHeader />

				{/* Register new property */}
				<Button
					variant="outlined"
					color="success"
					sx={{ marginTop: 1, marginBottom: 5 }}
					onClick={handleRegisterOpenDialog}
				>
					Add New Property
				</Button>
				<Button
					variant="outlined"
					color="success"
					sx={{ marginTop: 1, marginBottom: 5, marginLeft: 1 }}
					onClick={handleRegisterOpenDialog}
				>
					Create New Branch
				</Button>

				{/* Dialog trigger when click button */}
				<Dialog
					open={openRegisterDialog}
					onClose={handleRegisterCloseDialog}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle
						sx={{ color: "#1B8F81", fontWeight: "bold" }}
						id="alert-dialog-title"
					>
						{"Register Employee"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="firstName"
										name="firstName"
										label="First name"
										fullWidth
										autoComplete="given-name"
										variant="standard"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="lastName"
										name="lastName"
										label="Last name"
										fullWidth
										autoComplete="family-name"
										variant="standard"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										required
										id="phone"
										name="Phone"
										label="Phone"
										fullWidth
										variant="standard"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id="email"
										name="email"
										label="Email"
										fullWidth
										variant="standard"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										required
										id="role"
										name="Role"
										label="Role"
										fullWidth
										autoComplete="Manager"
										variant="standard"
									/>
								</Grid>
								<Grid item xs={6}>
									<Button variant="contained" component="label">
										Profile
										<input hidden accept="image/*" multiple type="file" />
									</Button>
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="label"
									></IconButton>
								</Grid>
							</Grid>
						</DialogContentText>
					</DialogContent>
					<DialogActions sx={{ margin: 2 }}>
						<Button
							onClick={handleRegisterCloseDialog}
							sx={{}}
							variant="outlined"
						>
							Register
						</Button>
						<Button onClick={handleRegisterCloseDialog} variant="outlined">
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				<Divider />

				{/* Display Property Card */}
				<Grid container spacing={3} sx={{ marginTop: 1 }}>
					{properties.map((property) => {
						return (
							<PartnerPropertyCard
								handleRegisterOpenDialog={handleRegisterOpenDialog}
								property={property}
								handleDeleteProperty={() => handleDeleteProperty(property.id)}
								key={property.id}
							/>
						);
					})}
				</Grid>

				{/* Dialog for alert confirm delete */}
				{/* <Dialog
          open={openConfirmDeleteDialog}
          onClose={handleDeleteCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Delete Property"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this property ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCloseDialog}>Yes</Button>
            <Button onClick={handleDeleteCloseDialog}>No</Button>
          </DialogActions>
        </Dialog> */}
			</Main>
		</Box>
	);
}
