const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Function to run shell commands
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" })
    return true
  } catch (error) {
    console.error(`Failed to execute ${command}`, error)
    return false
  }
}

// Function to create directories if they don't exist
const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`Created directory: ${dirPath}`)
  }
}

// Main setup function
const setup = () => {
  console.log("Setting up Martin Shaw Portfolio...")

  // Create content directory and ensure it exists
  ensureDirectoryExists(path.join(process.cwd(), "content"))

  // Install dependencies
  console.log("Installing dependencies...")
  const installDepsSuccess = runCommand("npm install")

  if (!installDepsSuccess) {
    console.error("Failed to install dependencies")
    process.exit(1)
  }

  console.log("\nSetup completed successfully!")
  console.log("\nYou can now run the following commands:")
  console.log("  npm run dev    - Start the development server")
  console.log("  npm run build  - Build the project for production")
  console.log("  npm run start  - Start the production server")
}

// Run the setup
setup()
