import { Line } from "./deps.ts";

export class CountLinesMainCommand extends Line.MainCommand {
    public signature = "countLines [dir]";

    public arguments = {
        dir: "The directory to count the lines in",
    };

    public options = {
        "--i-sub, --ignore-sub-dir": "Ignore sub directories",
        "--i-pattern [value], --ignore-pattern [value]":
            "Pattern for directories / files to ignore",
        "--i-empty, --ignore-empty-lines": "Ignore empty lines",
    };

    public async handle(): Promise<void> {
        const areSubDirsIgnored = Boolean(this.option("--ignore-sub-dir")),
            ignorePattern = this.option("--ignore-pattern"),
            areEmptyLinesIgnored = Boolean(this.option("--ignore-empty-lines"));

        const directory = this.argument("dir");

        if (!directory) {
            throw new Error("A directory must be specified!");
        }

        console.log(
            "Number of lines: ",
            await this.countLinesInDirectory(
                directory,
                areSubDirsIgnored,
                areEmptyLinesIgnored,
                ignorePattern ? RegExp(String(ignorePattern)) : undefined,
            ),
        );
    }

    protected countLinesOfFile(file: string, ignoreEmptyLines = false): number {
        const lines = file.split(/\r?\n|\r/g);

        return (
            ignoreEmptyLines
                ? lines.filter((line) => line.trim() !== "")
                : lines
        ).length;
    }

    protected async countLinesInDirectory(
        path: string | URL,
        ignoreSubDirs = false,
        ignoreEmptyLines = false,
        ignorePattern?: RegExp,
    ): Promise<number> {
        let number = 0;

        const decoder = new TextDecoder("utf-8");

        for await (const entry of Deno.readDir(path)) {
            if (
                !ignorePattern ||
                !(ignorePattern && entry.name.match(ignorePattern))
            ) {
                if (entry.isFile) {
                    const file = await Deno.readFile(`${path}/${entry.name}`);

                    number += this.countLinesOfFile(
                        decoder.decode(file),
                        ignoreEmptyLines,
                    );
                } else if (entry.isDirectory && !ignoreSubDirs) {
                    number += await this.countLinesInDirectory(
                        `${path}/${entry.name}`,
                        ignoreSubDirs,
                        ignoreEmptyLines,
                        ignorePattern,
                    );
                }
            }
        }

        return number;
    }
}
