const fs = require("fs")
const path = require("path")

// Delete .next directory
const nextDir = path.join(__dirname, ".next")
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true })
  console.log("Cleared .next directory")
}

// Update package.json with clean dependencies
const pkgPath = path.join(__dirname, "package.json")
const cleanPkg = require("./package.json.fix")
fs.writeFileSync(pkgPath, JSON.stringify(cleanPkg, null, 2))
console.log("Updated package.json")

// Remove node_modules
const nodeModules = path.join(__dirname, "node_modules")
if (fs.existsSync(nodeModules)) {
  fs.rmSync(nodeModules, { recursive: true })
  console.log("Removed node_modules")
}

