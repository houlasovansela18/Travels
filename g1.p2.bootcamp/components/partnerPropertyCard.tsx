import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import DeleteDialog from "./deleteDialog";
import { NextPage } from "next";

interface Props {
	handleRegisterOpenDialog: any;
	property: any;
	handleDeleteProperty: any;
}

const PartnerPropertyCard: NextPage<Props> = ({
	handleRegisterOpenDialog,
	property,
	handleDeleteProperty,
}) => {
	function handleCloseDeleteDialog() {
		setOpenDeleteDialog(false);
	}

	function handleOpenDeleteDialog() {
		setOpenDeleteDialog(true);
	}
	const [openDelelteDialog, setOpenDeleteDialog] = useState(false);
	return (
		<>
			<Grid item xs={6} sm={3}>
				<Card sx={{ maxWidth: 345 }}>
					<CardMedia
						component="img"
						alt="green iguana"
						image={property.image}
						sx={{ objectFit: "cover", height: 250 }}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{property.name}
						</Typography>
						<Typography variant="body2" color="text.primary">
							Read Rate Reports {property.totalRateReport}
						</Typography>
						<Typography variant="body2" color="text.primary">
							Overall Rating {property.totalRate}
							<br />
							<StarIcon sx={{ color: "yellow", marginLeft: 0 }} />
							<StarIcon sx={{ color: "yellow", marginLeft: 0 }} />
							<StarIcon sx={{ color: "yellow", marginLeft: 0 }} />
							<StarIcon sx={{ color: "yellow", marginLeft: 0 }} />
							<StarBorderIcon sx={{ color: "gray", marginLeft: 0 }} />
						</Typography>
					</CardContent>
					<CardActions>
						{/* CRUD Property */}
						<Typography sx={{ margin: 1 }}>
							<DeleteOutlineIcon
								color="error"
								onClick={handleOpenDeleteDialog}
							/>
							<EditIcon onClick={handleRegisterOpenDialog} />
						</Typography>
						<Chip
							color="primary"
							variant="outlined"
							label="Coupon"
							size="small"
						/>
						<Chip
							color="primary"
							variant="outlined"
							label="Boosting"
							size="small"
						/>
					</CardActions>
				</Card>
			</Grid>
			<DeleteDialog
				isOpen={openDelelteDialog}
				handleCloseDeleteDialog={handleCloseDeleteDialog}
				handleDeleteProperty={handleDeleteProperty}
			/>
		</>
	);
};

export default PartnerPropertyCard;
