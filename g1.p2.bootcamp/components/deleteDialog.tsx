import { NextPage } from "next";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	DialogContentText,
} from "@mui/material";

interface Props {
	isOpen: any;
	handleCloseDeleteDialog: any;
	handleDeleteProperty: any;
}
const DeleteDialog: NextPage<Props> = ({
	isOpen,
	handleCloseDeleteDialog,
	handleDeleteProperty,
}) => {
	return (
		<Dialog
			open={isOpen}
			onClose={handleCloseDeleteDialog}
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
				<Button
					onClick={() => {
						handleDeleteProperty();
						handleCloseDeleteDialog();
					}}
				>
					Yes
				</Button>
				<Button onClick={handleCloseDeleteDialog}>No</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
