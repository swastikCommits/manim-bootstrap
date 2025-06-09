const axios = require("axios");
require("dotenv").config();

const generateManimCode = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an expert Manim animator and Python developer.

                  Task:
                  Generate an elegant, high-quality Manim animation in Python based on the following concept: "${prompt}"

                  Constraints:
                  - Only output a Python file with one class that extends Scene
                  - Class name must be 'GeneratedScene'
                  - Include required import: 'from manim import *'
                  - Animation must include motion, transformations, color, labels, and timing
                  - Make the animation visually appealing and smooth
                  - Use creative use of shapes, graphs, text, or formulas (as needed)
                  - Do not include comments or explanations — only valid Python code

                  Tips:
                  - Use animations like Create, Transform, Write, FadeIn, FadeOut, MoveTo, ScaleInPlace, Rotate, etc.
                  - Use updaters if needed for dynamic behavior
                  - Arrange layout visually (centered, grouped, aligned)
                  - Avoid any placeholders or “pass” statements

                  Final output: Clean and complete Python code for Manim.`
                                }
                              ]
                            }
                          ]
                        },
                        {
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        }
                      );

    
    let code = response.data.candidates[0].content.parts[0].text;
    
    // Remove markdown code block delimiters if present
    code = code.replace(/```python\n/g, '').replace(/```\n?/g, '').replace(/```/g, '');
    
    // Clean up any extra whitespace
    code = code.trim();
    
    // Check if code has proper class definition, if not wrap it
    if (!code.includes("class") || !code.includes("Scene")) {
      code = `from manim import *\n\nclass GeneratedScene(Scene):\n    def construct(self):\n        ${code}`;
    }

    // Ensure imports are present
    if (!code.includes("from manim import")) {
      code = `from manim import *\n\n${code}`;
    }

    return code;
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    
    // Provide fallback template based on prompt
    return generateFallbackCode(prompt);
  }
};
module.exports = generateManimCode;
