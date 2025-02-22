import { useEffect, useRef, useState } from "react"
import questions from '../../../data/main-questions.json';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/34S4svLpjzX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

export default function MainGame({socket, allPlayers}) {
  const [seconds, setSeconds] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [modalBody, setModalBody] = useState("Are you ready ?")
  const audioRef = useRef(null);
  const [questionCount, setQuestionCount] = useState(1);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [gameOver, setGameOver] = useState(false)

  const stages = [
    { id: 15, amount: "5 Crore" },
    { id: 14, amount: "1 Crore" },
    { id: 13, amount: "50,00,000" },
    { id: 12, amount: "25,00,000" },
    { id: 11, amount: "12,50,000" },
    { id: 10, amount: "6,40,000" },
    { id: 9, amount: "3,20,000" },
    { id: 8, amount: "1,60,000" },
    { id: 7, amount: "80,000" },
    { id: 6, amount: "40,000" },
    { id: 5, amount: "20,000" },
    { id: 4, amount: "10,000" },
    { id: 3, amount: "5,000" },
    { id: 2, amount: "2,000" },
    { id: 1, amount: "1,000" }
];
  const handleButtonClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    play()
  };

  socket.on("next-round-started", () => {
    console.log("next round started")
    startGame()
  })

  const startGame = () => {
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)])
    setSeconds(60)
  }

  const nextQuestion = () => {
    setQuestionCount(prevCount => prevCount + 1)
    startGame()
  }

  useEffect(() => {
    // Exit early when timer reaches 0
    if(gameOver) return;
    if (seconds === 0){
      nextQuestion()
      return;
    }

    // Decrease seconds by 1 after 1 second
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    // Clean up the interval on component unmount or when seconds reach 0
    return () => clearInterval(timer);
  }, [seconds]); // Re-run the effect when seconds state changes

  useEffect(() => {
    document.getElementById("game-screen").style.display = "none";
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)])
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    } else {
      console.log("error")
    }
  }

  const resetOptions = (i) => {
    document.getElementById("options"+i).classList.remove("bg-red-500")
    document.getElementById("options"+i).classList.remove("bg-green-500")
    document.getElementById("options"+i).classList.add("bg-purple-700")
    document.getElementById("options"+i).classList.add("hover:bg-purple-500")
  }

  const handleOptionClick = (option, question) => {
    if(option.split(":")[0] === question.correct_answer){
      document.getElementById("options"+option.split(":")[0]).classList.remove("hover:bg-purple-500")
      document.getElementById("options"+option.split(":")[0]).classList.remove("bg-purple-700")
      document.getElementById("options"+option.split(":")[0]).classList.add("bg-green-700")
      document.getElementById("options"+option.split(":")[0]).classList.add("test1")
      // socket.emit("fff-response", currentPlayer, responseTime, true, questionCount)
    } else {
      document.getElementById("options"+option.split(":")[0]).classList.remove("hover:bg-purple-500")
      document.getElementById("options"+option.split(":")[0]).classList.add("bg-red-500")
      document.getElementById("options"+option.split(":")[0]).classList.remove("bg-purple-700")
      document.getElementById("options"+question.answer.split(":")[0]).classList.add("bg-green-700")
      document.getElementById("options"+option.split(":")[0]).classList.add("test2")
      setSeconds(0)
      setGameOver(true)
      setModalBody("Game Over. Your bank will be credited with the winning amount.")
      setPopupVisible(true)
    }
    setTimeout(() => {
      if(gameOver === true){
        return;
      }
      resetOptions(option.split(":")[0])
      if(questionCount === 10){
        setModalBody("Round Over! Check Leaderboard for your score.")
        setPopupVisible(true);
        setSeconds(0)
      } else {
        nextQuestion()
      }
    }, 2000)
  }

  return (
    <div id="game-screen2" className="flex min-h-screen bg-gray-100 hidden">
      <div className="w-64 p-4 bg-purple-700 text-white">
        {/* <div className="flex justify-around mb-4">
          <UsersIcon className="w-8 h-8" />
          <PercentIcon className="w-8 h-8" />
          <RefreshCwIcon className="w-8 h-8" />
          <TrophyIcon className="w-8 h-8" />
        </div> */}
        <div className="space-y-2">
          {stages.map(stage => (
            <div key={stage.id} className={`flex justify-between px-2 ${stage.id === questionCount ? " border-2" : ""}`}>
              <span>{stage.id}</span>
              <span>{stage.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-4">
      <div className='flex justify-center mb-4 text-2xl'>Question: {questionCount} / 10</div>
        <div className="flex justify-center mb-4">
          <div className="relative flex items-center justify-center w-16 h-16 bg-purple-700 rounded-full">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-red-400" />
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 to-green-400" />
            <span className="text-2xl font-bold text-white">{seconds}</span>
          </div>
        </div>
        
        <audio
          style={{display: "none"}}
          ref={audioRef}
          controls
          src="/audio/kbc_intro_audio.mp3">
              Your browser does not support the
              <code>audio</code> element.
      </audio>
        {currentQuestion !== null && <>
          <div className="p-4 mb-4 text-center text-white bg-purple-700 rounded-lg">
            {currentQuestion.question}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {currentQuestion.options.map(option => (
              <button id={"options"+option.split(":")[0]} className="p-4 text-left text-white bg-purple-700 rounded-lg hover:bg-purple-500" onClick={() => handleOptionClick(option, currentQuestion)}>
                <span className="font-bold">{option.split(":")[0]}:</span> {option.split(":")[1]}
              </button>
            ))}
          </div>
        </>}
      </div>
      {isPopupVisible && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{modalBody}</h2>
        
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleClosePopup()}
        >
          Start
        </button>
      </div>
    </div>}
    </div>
  )
}

function PercentIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}


function RefreshCwIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}


function TrophyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}