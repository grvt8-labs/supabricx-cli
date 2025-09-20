#!/usr/bin/env node
import { Command } from "commander";
import { createApp } from "./commands/create.js";

const program = new Command();

program
  .name("create-supabricx")
  .description("Supabricx backend accelerator CLI")
  .version("1.0.0");

program
  .command("create [project-name]")
  .description("Create a new project")
  .option("-f, --framework <framework>", "Framework to use (express, nestjs, springboot)")
  .action((projectName, options) => {
    createApp(projectName, options.framework);
  });

if (!process.argv.slice(2).length) {
  createApp(); // will trigger prompts
} else {
  program.parse(process.argv);
}
