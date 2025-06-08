"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Paperclip, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StarBorder } from "@/components/ui/star-border"

interface PromptInputProps {
  onSubmit: (prompt: string) => void
  disabled?: boolean
  placeholder?: string
}

export function PromptInput({ onSubmit, disabled, placeholder = "Describe your animation..." }: PromptInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSubmit(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative">
      <StarBorder 
        as="div" 
        className="block w-full" 
        color="rgb(169 169 169)"
        speed="8s"
      >
        <div className="p-4 backdrop-blur-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-transparent text-white placeholder-gray-500 resize-none outline-none text-sm leading-relaxed min-h-[60px] max-h-[200px]"
            rows={2}
          />

          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-gray-400 h-8">
                <Paperclip className="w-4 h-4 mr-2" />
                Attach
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 h-8">
                <Wand2 className="w-4 h-4 mr-2" />
                Examples
              </Button>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSubmit}
                disabled={!input.trim() || disabled}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 h-8"
              >
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </StarBorder>
    </motion.div>
  )
}
