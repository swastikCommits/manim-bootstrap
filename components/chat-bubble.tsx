"use client"

import { motion } from "framer-motion"
import { User, Bot, Play, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatBubbleProps {
  type: "user" | "assistant"
  content: string
  videoUrl?: string
  isGenerating?: boolean
  timestamp: string
}

export function ChatBubble({ type, content, videoUrl, isGenerating, timestamp }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex gap-4 mb-6 ${type === "user" ? "justify-end" : "justify-start"}`}
    >
      {type === "assistant" && (
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
          <Bot className="w-4 h-4" />
        </div>
      )}

      <div className={`max-w-[70%] ${type === "user" ? "order-2" : ""}`}>
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className={`rounded-2xl p-4 ${
            type === "user" ? "bg-blue-600 text-white ml-auto" : "bg-gray-900/50 border border-gray-800"
          }`}
        >
          <p className="text-sm leading-relaxed">{content}</p>
          <div className="text-xs opacity-70 mt-2">{timestamp}</div>
        </motion.div>

        {/* Video Preview for Assistant Messages */}
        {type === "assistant" && (videoUrl || isGenerating) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ delay: 0.3 }}
            className="mt-4 bg-gray-900/30 rounded-xl border border-gray-800 overflow-hidden"
          >
            {isGenerating ? (
              <div className="p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-gray-400 text-sm">Generating your animation...</p>
              </div>
            ) : videoUrl ? (
              <div className="relative">
                <video
                  src={videoUrl}
                  controls
                  className="w-full h-64 object-cover"
                  poster="/placeholder.svg?height=256&width=400"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="p-4 flex justify-between items-center bg-gray-900/50">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="text-gray-400">
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="ghost" className="text-gray-400">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <Button size="sm" variant="ghost" className="text-gray-400">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </div>

      {type === "user" && (
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
          <User className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  )
}
