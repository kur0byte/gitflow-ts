import { promisify } from 'util';
import { exec, exec as execNonPromise, execSync } from 'child_process';
import { Command } from '@commander-js/extra-typings';

const asyncPromise = promisify(execNonPromise);

export async function asyncExec(command: string) {
  try {
    const result = await asyncPromise(command);
    console.log(result.stdout);
    return result.stdout;
  } catch (error: any) {
    // If error has a `stderr` property, log it for more details
    console.error(`Error executing command: ${error.message}`);
    if ('stderr' in error) {
      console.error(`Stderr output: ${error.stderr}`);
    }
    throw error; // re-throw the error after logging
  }
}

/**
 * Executes a command synchronously
 * @param {string} command The command to execute
 * @param {string} successMsg The message to log if the command is successful
 * @param {string} errorMsg The message to log if the command fails
 * @returns The result of the command
 * @throws If the command fails
 * @example syncExec('echo "Hello, World!"', 'Command executed successfully', 'Command failed');
 */
export function syncExec(command: string, successMsg: string, errorMsg: string): string {
  try {
    const result = execSync(command, { encoding: 'utf8' })
    console.log({successMsg, result});
    return result;
  } catch (error) {
    console.error(errorMsg);
    throw error;
  }
} 