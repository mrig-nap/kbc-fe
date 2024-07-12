import { useEffect, useRef, useState } from "react"
import questions from '../../../data/main-questions.json';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/34S4svLpjzX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function MainGame() {
  const [seconds, setSeconds] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [modalBody, setModalBody] = useState("Are you ready ?")
  const audioRef = useRef(null);

  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleButtonClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    play()
  };

  useEffect(() => {
    document.getElementById("main-game-screen").style.display = "none";
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)])
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    } else {
      console.log("error")
    }
  }

  console.log(currentQuestion)

  const handleOptionClick = (option, question) => {
    if(option.split(":")[0] === question.correct_answer){
      document.getElementById("option"+option.split(":")[0]).classList.remove("bg-purple-700")
      document.getElementById("option"+option.split(":")[0]).classList.add("bg-green-500")
    } else {
      document.getElementById("option"+option.split(":")[0]).classList.add("bg-red-500")
      document.getElementById("option"+option.split(":")[0]).classList.remove("bg-purple-700")
      document.getElementById("option"+question.correct_answer).classList.add("bg-green-700")
      setTimeout(() => {
        setModalBody("Apka Safar Yahi Tak Tha! See you next Season.")
        setPopupVisible(true)
      }, 2000);
    }
  }

  return (
    <div id="main-game-screen" className="flex min-h-screen bg-gray-100">
      <div className="w-64 p-4 bg-purple-700 text-white">
        <div className="flex justify-around mb-4">
          <UsersIcon className="w-8 h-8" />
          <PercentIcon className="w-8 h-8" />
          <RefreshCwIcon className="w-8 h-8" />
          <TrophyIcon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>16</span>
            <span>7 Crore</span>
          </div>
          <div className="flex justify-between">
            <span>15</span>
            <span>1 Crore</span>
          </div>
          <div className="flex justify-between">
            <span>14</span>
            <span>50,00,000</span>
          </div>
          <div className="flex justify-between">
            <span>13</span>
            <span>25,00,000</span>
          </div>
          <div className="flex justify-between">
            <span>12</span>
            <span>12,50,000</span>
          </div>
          <div className="flex justify-between">
            <span>11</span>
            <span>6,40,000</span>
          </div>
          <div className="flex justify-between">
            <span>10</span>
            <span>3,20,000</span>
          </div>
          <div className="flex justify-between">
            <span>9</span>
            <span>1,60,000</span>
          </div>
          <div className="flex justify-between">
            <span>8</span>
            <span>80,000</span>
          </div>
          <div className="flex justify-between">
            <span>7</span>
            <span>40,000</span>
          </div>
          <div className="flex justify-between">
            <span>6</span>
            <span>20,000</span>
          </div>
          <div className="flex justify-between">
            <span>5</span>
            <span>10,000</span>
          </div>
          <div className="flex justify-between">
            <span>4</span>
            <span>5,000</span>
          </div>
          <div className="flex justify-between">
            <span>3</span>
            <span>3,000</span>
          </div>
          <div className="flex justify-between">
            <span>2</span>
            <span>2,000</span>
          </div>
          <div className="flex justify-between">
            <span>1</span>
            <span>1,000</span>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">
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
              <button id={"option"+option.split(":")[0]} className="p-4 text-left text-white bg-purple-700 rounded-lg hover:bg-purple-500" onClick={() => handleOptionClick(option, currentQuestion)}>
                <span className="font-bold">{option.split(":")[0]}:</span> {option.split(":")[1]}
              </button>
            ))}
            {/* <button className="p-4 text-left text-white bg-purple-700 rounded-lg hover:bg-purple-500">
              <span className="font-bold">{currentQuestion.options[1].split(":")[0]}:</span> {currentQuestion.options[1].split(":")[1]}
            </button>
            <button className="p-4 text-left text-white bg-purple-700 rounded-lg hover:bg-purple-500">
              <span className="font-bold">{currentQuestion.options[2].split(":")[0]}:</span> {currentQuestion.options[2].split(":")[1]}
            </button>
            <button className="p-4 text-left text-white bg-purple-700 rounded-lg hover:bg-purple-500">
              <span className="font-bold">{currentQuestion.options[3].split(":")[0]}:</span> {currentQuestion.options[3].split(":")[1]}
            </button> */}
          </div>
        </>}
        {/* <div className="flex justify-center gap-4">
          <button className="px-8 py-4 text-white bg-yellow-500 rounded-lg">Lock</button>
          <button className="px-8 py-4 text-white bg-red-500 rounded-lg">Quit</button>
        </div> */}
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