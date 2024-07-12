import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "@mui/material";
import NameModal from "@/components/NameModal";
import { io } from "socket.io-client";
import PlayersLobby from "@/components/PlayersLobby";
import FastestFingerFirst from "@/components/FastestFingerFirst";
import MessageBox from "@/components/MessageBox";
import JoinGameModal from "@/components/JoinGameModal";
import WinnerSelection from "@/components/WinnerSelection";
import MainGame from "@/components/MainGame";

const inter = Inter({ subsets: ["latin"] });
const audioUrl = 'https://cdn.shopify.com/s/files/1/0533/5200/5827/files/kbc-awesome-5410.mp3?v=1720190376';

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [joinedPlayers, setJoinedPlayers] = useState([]);
  const [openLobby, setOpenLobby] = useState(false);
  const [openName, setOpenName] = useState(false);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL);
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });

    socket.on("new-player-list", allPlayers => {
      console.log(allPlayers + " players joined");
      setJoinedPlayers(allPlayers);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.play();

    const timeoutId = setTimeout(() => {
      audio.pause();
    }, 15000); // Play audio for 10 seconds

    return () => {
      audio.pause();
      clearTimeout(timeoutId);
    };
  }, []);

  if (!socket) {
    return null;
  }

  return (
    <main className="background">
      <video id="bg-video" autoPlay loop muted playsInline className="w-full h-full object-cover">
        <source src="https://static.vecteezy.com/system/resources/previews/030/935/152/mp4/futuristic-and-clean-stage-blank-center-background-loop-ai-generated-free-video.mp4" type="video/mp4" />
      </video>
      <audio src={audioUrl} id="backgroundAudio" />
      <JoinGameModal socket={socket} setOpenLobby={setOpenLobby} />
      <WinnerSelection socket={socket} allPlayers={joinedPlayers} />
      <PlayersLobby socket={socket} allPlayers={joinedPlayers} openLobby={openLobby} setOpenLobby={setOpenLobby} />
      <MessageBox socket={socket} allPlayers={joinedPlayers} />
      <FastestFingerFirst socket={socket} allPlayers={joinedPlayers} />
      <MainGame socket={socket} allPlayers={joinedPlayers} />
    </main>
  );
}
