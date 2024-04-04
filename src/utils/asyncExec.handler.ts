import { promisify } from 'util';
import { exec as execNonPromise } from 'child_process';

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

export default asyncExec;