import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Drawer from '@mui/material/Drawer';

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

export default function PlayersLobby({ socket, allPlayers, openLobby, setOpenLobby }) {
	const [drawer, setDrawer] = useState(false);
	const [name, setName] = useState("");
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const currentPlayer = allPlayers.find(player => player.socketId === socket.id) || null;
	console.log(currentPlayer)
	const handleReadyClick = (player) => {
		player.ready = !player.ready
		socket.emit("update-player", player)
	}

	const handleGameStartClick = () => {
		socket.emit("start-game", allPlayers.find(player => player.socketId === socket.id));
	}

	socket.on("game-started", () => {
		setOpenLobby(false)
	})

	const toggleDrawer = (newOpen) => () => {
    setDrawer(newOpen);
  };

	const DrawerList = (
		<Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
			<Box sx={{position: "absolute", top: 0,  height: '100%', width: '100%', padding: '36px', borderRight: '1px solid #ccc', bgcolor: '#f0f0f0' }}>
      	<Typography variant="h5">Game Rules</Typography>
				<ul class="list-decimal ml-8 space-y-4">
					<li class="font-bold p-2">
							Important: Do not refresh the page.
					</li>
					<li>
							For starting the game, enter your name and the ID provided by the host.
					</li>
					<li>
							Eligibility: Players must register with their real names.
					</li>
					<li>
							Game Structure: The game consists of multiple-choice questions. Each question will have four options, and only one is correct.
					</li>
					<li>
							Winning and Prizes: Correctly answering all questions will make the player the winner. Prizes will be awarded based on the number of correct answers. The prize structure will be predefined and visible to all players before starting the game.
					</li>
					<li>
							Technical Issues: In case of any technical issues, players should contact the support team immediately. If a player gets disconnected, they can rejoin the game if the issue is resolved within a certain timeframe.
					</li>
			</ul>
    </Box>
		</Box>
	);

	console.log(allPlayers)
	return (
		<div>
			<Drawer open={drawer} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
			<Modal
				open={openLobby}
				// onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>  
				<Box sx={style}>
				<h2 className='text-black text-10xl font-bold pb-5'>Waiting for players to join....</h2>
				<Typography className='pb-5'>
						Room ID: {allPlayers[0]?.roomID || ""}
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
							<Button disabled={true} variant="outlined" style={{marginLeft: "auto"}} onClick={() => handleReadyClick(player)}>{player.ready ? "Ready" : "Not Ready"}</Button>
						</Box>
					))}
					<div className='mt-5'>
						<Button  className='btnColor'  style={!currentPlayer?.host ? {display: "none"} : {width: "100%"}} variant="contained" color="success" onClick={() => handleGameStartClick()}>
							Start the game
						</Button>
						<p className='mt-5 text-center'><a href='#' onClick={() => setDrawer(drawer => !drawer)}>Rules {">>>"}</a></p>
					</div>
					<div className='mt-5 text-sm italic font-sans'>
						<div><span className='font-bold'>Next Round:</span> Fastest Finger First</div>
						<div><span className='font-bold'>Tips:</span> Answer as fast as possible. The first player with most correct answer in least time will be the winner.</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
}