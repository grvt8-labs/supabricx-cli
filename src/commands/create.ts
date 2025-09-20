import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";
import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = `
# Environment Variables

PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# JWT
JWT_SECRET="supersecretjwt"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GITHUB_CALLBACK_URL="http://localhost:3000/auth/github/callback"
`;

const gitignoreFile = `
# Node
node_modules
dist

# Env
.env
.env.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# IDEs
.vscode
.idea

# OS
.DS_Store
Thumbs.db
`;

export async function createApp(projectName?: string, frameworkArg?: string) {
  // 1️⃣ Prompt for project name if not provided
  if (!projectName) {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your project called?",
        default: "my-app",
      },
    ]);
    projectName = answers.name;
  }

  // 2️⃣ Prompt for framework if not provided
  let framework = frameworkArg;
  if (!framework) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "framework",
        message: "Choose a framework:",
        choices: ["Express", "NestJs (Coming Soon)", "SpringBoot (Coming Soon)"],
        default: "express",
      },
    ]);
    framework = answers.framework;
  }

  // 3️⃣ Start spinner
  const spinner = ora(`Creating ${framework} project...`).start();
  const targetDir = path.resolve(process.cwd(), projectName as string);

  if (fs.existsSync(targetDir)) {
    spinner.fail("Directory already exists!");
    process.exit(1);
  }

  // 4️⃣ Copy template folder
  const templateDir = path.resolve(__dirname, `../../src/templates/${framework}-ts`);
  fs.cpSync(templateDir, targetDir, { recursive: true });

  // 5️⃣ Add .env + .gitignore
  fs.writeFileSync(path.join(targetDir, ".env"), envFile.trim());
  fs.writeFileSync(path.join(targetDir, ".gitignore"), gitignoreFile.trim());

  spinner.succeed(`Project ${projectName} created!`);

  // 6️⃣ Install dependencies
  const installSpinner = ora("Installing dependencies...").start();
  try {
    await execa("npm", ["install"], { cwd: targetDir, stdio: "inherit" });
    installSpinner.succeed("Dependencies installed!");
  } catch (err) {
    installSpinner.fail("Failed to install dependencies.");
    console.error(err);
  }

  console.log(chalk.green(`\n🚀 Done! cd ${projectName} && npm run dev\n`));
}
