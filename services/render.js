// services/render.js
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const renderVideo = async (script, id) => {
  const scriptDir = path.join(__dirname, "..", "sessions");
  const outputDir = path.join(__dirname, "..", "public", "videos");

  if (!fs.existsSync(scriptDir)) fs.mkdirSync(scriptDir);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const scriptPath = path.join(scriptDir, `scene_${id}.py`);
  fs.writeFileSync(scriptPath, script, "utf-8");

  const cmd = `python -m manim ${scriptPath} -ql -o scene_${id}.mp4`;

  return new Promise((resolve, reject) => {
    exec(cmd, { timeout: 60000 }, (err, stdout, stderr) => {
      if (err) {
        console.error("Render error:", stderr);
        return reject(stderr);
      }
      console.log("Render output:", stdout);
      const videoName = `scene_${id}.mp4`;
      resolve(`/videos/${videoName}`);
    });
  });
};

module.exports = renderVideo;
