/**
 * Parses a command with dynamic flags.
 * @param commandBase The base of the command to be executed, e.g., "gh pr create".
 * @param flags An object containing the flags as keys and their values.
 * @returns A string that represents the full command with flags.
 */
export function parseCommand(commandBase: string, flags: { [key: string]: string }): string {
    const flagsString = Object.entries(flags)
        .map(([key, value]) => `--${key} '${value}'`)
        .join(' ');
    return `${commandBase} ${flagsString}`;
}