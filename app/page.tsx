"use client"

import { useState } from 'react'
import { message, type Message } from './actions'

export default function Home() {
  const [inputMessage, setInputMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "You will be helping answer math questions"
    }
  ])

  async function sendMessage() {
    const messageHistory = [
      ...messages,
      {
        role: "user",
        content: inputMessage
      }
    ]
    const response = await message(messageHistory)
    if (response) {
      messageHistory.push(response)
    }
    setMessages(messageHistory)
    setInputMessage("")
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <header className="bg-white p-2">
        <div className="flex items=center justify-center">
          <a href="#" className="m-1.5">
            <span className="sr-only">Thushan's ChatBot</span>
          </a>
          <h1 className="text-black font-bold">ChatBot</h1>
        </div>
      </header>

      <div className="flex flex-col h-full">
        {messages && messages.length > 0 && messages.map(({ role, content }, index) => {
          if (role === "user") {
            return (
              <div key={role + index} className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0">
                    Me
                  </div>
                  <div className="relative ml-3 py-2 px-4 rounded-xl">
                    <div>{content}</div>
                  </div>
                </div>
              </div>
            );
          }

          if (role === "assistant") {
            return (
              <div key={role + index} className="col-start-6 col-end-13 p-3 rounded-lg">
                <div className="flex items-center justify-start flex-row-reverse">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0">
                    AI
                  </div>
                  <div className="relative mr-3 py-2 px-4 rounded-xl">
                    <div>{content}</div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="flex flex-col flex-auto justify-between bg-gray-100 p-6">
        <div className="top-[100vh] flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex w-full border rounded-xl pl-4 h-10"
              />
            </div>
          </div>
          <div className="ml-4">
            <button
              onClick={sendMessage}
              className="flex items-center justify-center rounded-xl px-4 py-2 bg-gray-100 hover:bg-gray-200 flex-shrink-0">
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}