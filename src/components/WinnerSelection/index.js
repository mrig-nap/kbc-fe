import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function WinnerSelection({ socket, allPlayers }) {
  const [open, setOpen] = useState(false);

	const handleClick = (player) => {
		socket.emit("declare-fff-winner", player)
		setOpen(false)
	}

	const currentPlayer = allPlayers.find(player => player.socketId === socket.id) || null;
	console.log(currentPlayer)

	socket.on("toggle-winner", () => {
    console.log("toggle-winner")
		setOpen(true)
	})
	
  if(!currentPlayer?.host){
    return null;
  }

	return (
		<div>
			<Modal
				open={open}
				// onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography className='pb-5'>
						Room ID: {allPlayers[0]?.roomID || ""}
					</Typography>
					<Typography className='pb-5' id="modal-modal-title" variant="h6" component="h2">
						Select Winner Below
					</Typography>
					{allPlayers.length > 0 && allPlayers.map((player, index) => (
						<Box
							key={index}
							sx={{
								width: 500,
								maxWidth: '100%',
								display: 'flex',
								justifyContent: 'start',
								alignItems: "center",
								marginBottom: "10px"
							}}
						>
							<div className='w-2 h-2 rounded-full bg-green-500 mr-2'></div>
							<div>{player.name}</div>
							<Button variant="outlined" style={{marginLeft: "auto"}} onClick={() => handleClick(player)}>Declare Winner</Button>
						</Box>
					))}
				</Box>
			</Modal>
		</div>
	);
}