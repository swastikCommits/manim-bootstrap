"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChatBubble } from "@/components/chat-bubble"
import { TypingIndicator } from "@/components/typing-indicator"
import { PromptInput } from "@/components/prompt-input"
import { AnimatedBackground } from "@/components/animated-background"
import { StarBorder } from "@/components/ui/star-border"
import {
  Calculator,
  TrendingUp,
  Upload,
  FileText,
  Zap,
  Plus,
  MessageSquare,
  Settings,
  User,
  Play,
  History,
} from "lucide-react"
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

export default function ManimInterface() {
  const [currentView, setCurrentView] = useState<"landing" | "chat">("landing")
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [projects] = useState<Project[]>([
    { id: "1", name: "Bubble Sort Visualization", lastModified: "2 hours ago" },
    { id: "2", name: "Sine Wave Animation", lastModified: "1 day ago" },
    { id: "3", name: "Matrix Transformation", lastModified: "3 days ago" },
  ])

  const handleStartChat = (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([userMessage])
    setCurrentView("chat")
    setIsGenerating(true)
    setIsButtonLoading(false)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I'll create a beautiful animation for "${prompt}". Here's your generated Manim video:`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        videoUrl: "/placeholder.svg?height=300&width=500", // This would be the actual video URL
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsGenerating(false)
    }, 3000)
  }

  const handleFollowUp = (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsGenerating(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I've updated the animation based on your feedback: "${prompt}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        videoUrl: "/placeholder.svg?height=300&width=500",
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsGenerating(false)
    }, 2000)
  }

  const quickActions = [
    { icon: Calculator, label: "Visualize Algorithm", color: "bg-gray-800/30 text-gray-300 border-gray-700/40" },
    { icon: TrendingUp, label: "Math Equations", color: "bg-gray-800/30 text-gray-300 border-gray-700/40" },
    { icon: Upload, label: "Data Visualization", color: "bg-gray-800/30 text-gray-300 border-gray-700/40" },
    { icon: FileText, label: "Physics Simulation", color: "bg-gray-800/30 text-gray-300 border-gray-700/40" },
    { icon: Zap, label: "Custom Animation", color: "bg-gray-800/30 text-gray-300 border-gray-700/40" },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {currentView === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col relative z-10"
          >
            {/* Header */}
            <motion.header
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center p-6"
            >
              <div className="text-2xl font-bold">Manim Studio</div>
              <div className="flex gap-3">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-700/50">
                  Sign In
                </Button>
                <Button className="bg-gray-300 hover:bg-white text-gray-900">Sign Up</Button>
              </div>
            </motion.header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-20">
              {/* Beta Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <Badge className="bg-gray-500/10 text-gray-300 border-gray-500/20 hover:bg-blue-900/40 hover:text-white hover:border-blue-500/40 px-4 py-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  New: AI-Powered Manim Generation
                </Badge>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              >
                Got an idea? Type it — I'll animate it.
              </motion.h1>

              {/* Input Area */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-4xl mb-8"
              >
                <StarBorder 
                  as="div" 
                  className="block w-full" 
                  color="rgb(169 169 169)"
                  speed="8s"
                >
                  <div className="p-6 pb-2 backdrop-blur-sm">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Describe the animation you want to create (e.g., 'Visualize bubble sort', 'Plot sine wave')..."
                      className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-lg leading-relaxed min-h-[80px]"
                      rows={1}
                      style={{overflow: 'hidden'}}
                      onInput={e => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = target.scrollHeight + 'px';
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                          handleStartChat(inputValue)
                        }
                      }}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700/50">
                          Manim v0.19 ↓
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        
                        <Button
                          onClick={() => {
                            setIsButtonLoading(true);
                            handleStartChat(inputValue);
                          }}
                          disabled={!inputValue.trim() || isButtonLoading}
                          className="bg-gray-300 hover:bg-white text-gray-900 disabled:opacity-50 disabled:bg-gray-500/50 disabled:text-gray-300"
                        >
                          {isButtonLoading ? (
                            <div className="flex items-center">
                              <Spinner size="sm" color="slate" />
                              <span className="ml-2">Generating...</span>
                            </div>
                          ) : (
                            "Generate Animation"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </StarBorder>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInputValue(action.label.toLowerCase())
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border backdrop-blur-sm transition-all ${action.color} hover:bg-gray-700/50 hover:text-white hover:border-gray-500/70`}
                  >
                    <action.icon className="w-4 h-4" />
                    <span className="text-sm">{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex relative z-10"
          >
            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="w-80 bg-gray-900/50 border-r border-gray-800 flex flex-col backdrop-blur-sm"
            >
              {/* Sidebar Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-bold">Manim Studio</div>
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => setCurrentView("landing")}
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
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 text-blue-400" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{project.name}</div>
                          <div className="text-xs text-gray-500">{project.lastModified}</div>
                        </div>
                      </div>
                    </motion.div>
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
            </motion.div>

            {/* Chat Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex-1 flex flex-col"
            >
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
                    onSubmit={handleFollowUp}
                    disabled={isGenerating}
                    placeholder="Refine your animation or ask for modifications..."
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
