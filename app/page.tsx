"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  const router = useRouter()
  const [currentView, setCurrentView] = useState<"landing" | "chat">("landing")
  const [inputValue, setInputValue] = useState("")
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [projects] = useState<Project[]>([
    { id: "1", name: "Bubble Sort Visualization", lastModified: "2 hours ago" },
    { id: "2", name: "Sine Wave Animation", lastModified: "1 day ago" },
    { id: "3", name: "Matrix Transformation", lastModified: "3 days ago" },
  ])

  const handleGenerateAnimation = async (prompt: string) => {
    if (!prompt.trim()) return
    
    setIsButtonLoading(true)
    
    try {
      // Get the API URL from environment variable or use default
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Send request to API
      const response = await fetch(`${apiUrl}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      })
      
      if (!response.ok) {
        throw new Error("Failed to generate animation")
      }
      
      const data = await response.json()
      
      // Redirect to chat page with parameters
      router.push(`/chat?prompt=${encodeURIComponent(prompt)}&videoUrl=${encodeURIComponent(data.videoUrl)}&sessionId=${encodeURIComponent(data.sessionId)}`)
      
    } catch (error) {
      console.error("Error generating animation:", error)
      alert("Failed to generate animation. Please try again.")
    } finally {
      setIsButtonLoading(false)
    }
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

      <motion.div
        key="landing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
                      handleGenerateAnimation(inputValue)
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
                      onClick={() => handleGenerateAnimation(inputValue)}
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
    </div>
  )
}
