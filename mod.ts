import { CountLinesMainCommand } from "./cli.ts";
import { Line } from "./deps.ts";

const cli = new Line.CLI({
    name: "countLines CLI",
    description: "A CLI that counts the lines of all files in a directory",
    version: "v1.0.0",
    command: CountLinesMainCommand,
});

cli.run();
