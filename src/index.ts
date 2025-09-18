#!/usr/bin/env node
import { Command } from "commander";
import { createApp } from "./commands/create";

const program = new Command();

program
  .name("supabricx")
  .description("Supabricx backend accelerator CLI")
  .version("0.1.0");

program
  .command("create <project-name>")
  .description("Create a new backend project")
  .option("-f, --framework <framework>", "Choose framework: express | nest | fastify", "express")
  .action((name, options) => {
    createApp(name, options.framework);
  });

program.parse(process.argv);
