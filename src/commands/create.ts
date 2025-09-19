import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";
import ora from "ora";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function createApp(projectName: string, framework: string) {
  const spinner = ora(`Creating ${framework} project...`).start();

  const targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    spinner.fail("Directory already exists!");
    process.exit(1);
  }

  // copy template folder
  // const templateDir = path.resolve(__dirname, `../../templates/${framework}-ts`);
  const templateDir = path.resolve(__dirname, `../templates/${framework}-ts`);
  fs.cpSync(templateDir, targetDir, { recursive: true });

  spinner.succeed(`Project ${projectName} created!`);

  // Install dependencies
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


// import path from "path";
// import fs from "fs-extra";
// import { execa } from "execa";
// import chalk from "chalk";

// export async function createApp(name: string, framework: string) {
//   const targetDir = path.join(process.cwd(), name);

//   console.log(chalk.green(`🚀 Creating new ${framework} project: ${name}`));

//   // Copy template
//   const templateDir = path.join(__dirname, `../templates/${framework}-ts`);
//   await fs.copy(templateDir, targetDir);

//   // Install dependencies
//   console.log(chalk.yellow("📦 Installing dependencies..."));
//   await execa("npm", ["install"], { cwd: targetDir, stdio: "inherit" });

//   console.log(chalk.green("✅ Project created successfully!"));
//   console.log(`\nNext steps:\n  cd ${name}\n  npm run dev`);
// }
