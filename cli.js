#!/usr/bin/env node
const { execSync } = require("child_process")
const fs = require("fs-extra")
const colors = require("colors")

console.log("Installing dependencies...")

try {
  execSync("npm install commander fs-extra chalk")
  console.log(colors.green("Dependencies installed successfully!"))

  // Define the files to be created with their respective content
  const sourceFolderPath = "./templates/auth"
  const targetFolderPath = "./temp"

  fs.copySync(sourceFolderPath, targetFolderPath)
  console.log("All files copied successfully!")
} catch (err) {
  console.error("Error installing dependencies:", err)
}
