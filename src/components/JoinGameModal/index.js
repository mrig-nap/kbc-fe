import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import { generateRandomID } from '@/utils/globalFunctions';

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

export default function JoinGameModal({socket, setOpenLobby}) {
	const [roomId, setRoomId] = useState("")
  const [name, setName] = useState("")
  const [name1, setName1] = useState("")
	const [open, setOpen] = useState(true);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleCreateGame = () => {
		const roomID = generateRandomID(6);
    if(name === ""){
			return;
		}
		socket.emit("join-room", name, socket.id, roomID, true)
		handleClose()
		setOpenLobby(true)
	}

  const handleJoinGame = () => {
    if(roomId === "" || name1 === ""){
			return;
		}
    socket.emit("join-room", name1, socket.id, roomId, false)
    handleClose()
    setOpenLobby(true)
  }

	return (
		<div className="">
			<Modal
				open={open}
				// onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
				
				<div className="relative w-full">
					<img
						src="/assets/logo.png"
						alt="Logo"
						width={200}
						height={200}
						className="LogoKBC "
					/>
					 </div>
					 <p className="mt-4 font-bold text-lg   lg:text-2xl align-center">
					 Welcome<br></br> to 
          				</p>
					<h1 className="text-5xl font-bold text-black sm:text-5xl lg:text-3xl align-center headingKBC">Kaun Banega Crorepati</h1>
					<p></p>
          <Box
						sx={{
							width: 500,
							maxWidth: '100%',
						}}
					>
						<TextField placeholder='Enter your name' onChange={(e) => setName(e.target.value)} fullWidth id="fullWidth" />
					</Box>
          <div className='mt-2 text-center mb-4'>
						<Button className='btnColor' variant="contained" onClick={() => handleCreateGame()}>Create Game</Button>
					</div>
          <Divider>OR</Divider>
					<Box
						sx={{
							width: 500,
							maxWidth: '100%',
              marginTop: '20px'
						}}
					>
						<TextField placeholder='Enter your name' onChange={(e) => setName1(e.target.value)} fullWidth id="fullWidth" />
						<div className='mt-3'></div>
						<TextField placeholder='Enter Room ID' onChange={(e) => setRoomId(e.target.value)} fullWidth id="fullWidth" />
					</Box>
					<div className='mt-2 text-center'>
						<Button className='btnColor' variant="contained" onClick={() => handleJoinGame()}>Join Game</Button>
					</div>
				</Box>
			</Modal>
			
		</div>
	);
}