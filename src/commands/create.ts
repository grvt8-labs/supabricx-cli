import path from "path";
import fs from "fs-extra";
import { execa } from "execa";
import chalk from "chalk";

export async function createApp(name: string, framework: string) {
  const targetDir = path.join(process.cwd(), name);

  console.log(chalk.green(`🚀 Creating new ${framework} project: ${name}`));

  // Copy template
  const templateDir = path.join(__dirname, `../templates/${framework}-ts`);
  await fs.copy(templateDir, targetDir);

  // Install dependencies
  console.log(chalk.yellow("📦 Installing dependencies..."));
  await execa("npm", ["install"], { cwd: targetDir, stdio: "inherit" });

  console.log(chalk.green("✅ Project created successfully!"));
  console.log(`\nNext steps:\n  cd ${name}\n  npm run dev`);
}
