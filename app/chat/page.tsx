"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChatBubble } from "@/components/chat-bubble"
import { TypingIndicator } from "@/components/typing-indicator"
import { PromptInput } from "@/components/prompt-input"
import { AnimatedBackground } from "@/components/animated-background"
import { MessageSquare, Settings, User, Play, History, Plus } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
  videoUrl?: string
  isGenerating?: boolean
}

interface Project {
  id: string
  name: string
  lastModified: string
  preview?: string
}

export default function ChatInterface() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const [projects] = useState<Project[]>([
    { id: "1", name: "Bubble Sort Visualization", lastModified: "2 hours ago" },
    { id: "2", name: "Sine Wave Animation", lastModified: "1 day ago" },
    { id: "3", name: "Matrix Transformation", lastModified: "3 days ago" },
  ])

  // Initialize from URL params when page loads
  useEffect(() => {
    const initialPrompt = searchParams.get("prompt")
    const initialVideoUrl = searchParams.get("videoUrl")
    const initialSessionId = searchParams.get("sessionId")
    
    if (initialPrompt && initialVideoUrl) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: initialPrompt,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I'll create a beautiful animation for "${initialPrompt}". Here's your generated Manim video:`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        videoUrl: initialVideoUrl,
      }
      
      setMessages([userMessage, assistantMessage])
      
      if (initialSessionId) {
        setSessionId(initialSessionId)
      }
    }
  }, [searchParams])

  const handleSendMessage = async (prompt: string) => {
    if (!prompt.trim()) return
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    
    setMessages((prev) => [...prev, userMessage])
    setIsGenerating(true)
    
    try {
      // Get the API URL from environment variable or use default
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Send request to API
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          sessionId, // Pass the session ID if it exists
        }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to generate animation")
      }
      
      const data = await response.json()
      
      // Update session ID if needed
      if (data.sessionId) {
        setSessionId(data.sessionId)
      }
      
      // Add assistant message with video
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.message || `Updated animation based on: "${prompt}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        videoUrl: data.videoUrl,
      }
      
      setMessages((prev) => [...prev, assistantMessage])
      
    } catch (error) {
      console.error("Error generating animation:", error)
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Sorry, there was an error generating your animation. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      
      setMessages((prev) => [...prev, errorMessage])
      
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <AnimatedBackground />
      
      <div className="min-h-screen flex relative z-10">
        {/* Sidebar */}
        <div className="w-80 bg-gray-900/50 border-r border-gray-800 flex flex-col backdrop-blur-sm">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-bold">Manim Studio</div>
              <Button variant="ghost" size="icon" className="text-gray-400">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-gray-300 hover:bg-white text-gray-900"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Animation
            </Button>
          </div>

          {/* Projects List */}
          <div className="flex-1 p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <History className="w-4 h-4" />
              Recent Projects
            </h3>
            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-4 h-4 text-blue-400" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{project.name}</div>
                      <div className="text-xs text-gray-500">{project.lastModified}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Animation Creator</div>
                <div className="text-xs text-gray-500">creator@manim.studio</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-800 bg-gray-900/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold">Animation Studio</h2>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  type={message.type}
                  content={message.content}
                  videoUrl={message.videoUrl}
                  isGenerating={message.isGenerating}
                  timestamp={message.timestamp}
                />
              ))}

              {isGenerating && <TypingIndicator />}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-6 border-t border-gray-800 bg-gray-900/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <PromptInput
                onSubmit={handleSendMessage}
                disabled={isGenerating}
                placeholder="Refine your animation or ask for modifications..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 