import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PeopleIcon from "@mui/icons-material/People";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HelpIcon from "@mui/icons-material/Help";

import FactCheckIcon from "@mui/icons-material/FactCheck";
import MailIcon from "@mui/icons-material/Mail";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FaCentercode } from "react-icons/fa";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";

const drawerWidth = 240;

function createData(
	id: number,
	name: string,
	email: string,
	phone: string,
	moreInfor: number,
	CRUD: number,
	isApprove: boolean
) {
	return { id, name, email, phone, moreInfor, CRUD, isApprove };
}
const myData = [
	createData(1, "Sok Sreyroth", "my1@gmail.com", "093964216", 24, 4.0, true),
	createData(2, "Houla Sela", "my2@gmail.com", "093964316", 37, 4.3, true),
	createData(3, "Srean Ponleu", "my3@gmail.com", "093964216", 24, 6.0, false),
	createData(4, "Yi Sowattra", "my4@gmail.com", "093964616", 67, 4.3, false),
	createData(
		5,
		"Venmey Narethmarch",
		"my5@gmail.com",
		"093964216",
		49,
		3.9,
		true
	),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

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
	const [openDialog, setOpenDialog] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	// Handle Dialog
	const handleClickOpenDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const Img = styled("img")({
		margin: "auto",
		display: "block",
		maxWidth: "100%",
		maxHeight: "100%",
	});

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
						<Link href={"/dashboard"}>
							<ListItemButton>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary={"Employee"} />
							</ListItemButton>
						</Link>
					</ListItem>
					<ListItem key={"customer-partner"} disablePadding>
						<Link
							href={{
								pathname: "/customer-partner",
								query: { open: open },
							}}
						>
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
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 700 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell align="right">Email</StyledTableCell>
								<StyledTableCell align="right">Phone</StyledTableCell>
								<StyledTableCell align="right">More Info</StyledTableCell>
								<StyledTableCell align="right">CRUD</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{myData.map((row) => (
								<StyledTableRow key={row.id}>
									<StyledTableCell component="th" scope="row">
										{row.name}
									</StyledTableCell>
									<StyledTableCell align="right">{row.email}</StyledTableCell>
									<StyledTableCell align="right">{row.phone}</StyledTableCell>
									<StyledTableCell align="right">
										{row.moreInfor}
									</StyledTableCell>
									<StyledTableCell align="right">
										<Button
											variant="outlined"
											color={row.isApprove ? "success" : "error"}
										>
											{" "}
											Details
										</Button>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<div>
					<Button
						variant="outlined"
						color="success"
						sx={{ marginTop: 5 }}
						onClick={handleClickOpenDialog}
					>
						Register Employee
					</Button>
					<Dialog
						open={openDialog}
						onClose={handleCloseDialog}
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
									<Grid item xs={12} sm={6}>
										<TextField
											required
											id="dob"
											name="dob"
											label="Date of Birth"
											fullWidth
											autoComplete="dob"
											variant="standard"
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											id="address"
											name="address"
											label="Address "
											fullWidth
											autoComplete="shipping address-line2"
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
										>
											<PhotoCamera />
										</IconButton>
									</Grid>
								</Grid>
							</DialogContentText>
						</DialogContent>
						<DialogActions sx={{ margin: 2 }}>
							<Button onClick={handleCloseDialog} sx={{}} variant="outlined">
								Register
							</Button>
							<Button onClick={handleCloseDialog} variant="outlined">
								Cancel
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</Main>
		</Box>
	);
}
