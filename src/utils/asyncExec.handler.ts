import { promisify } from 'util';
import { exec } from 'child_process';

// Convert exec into a Promise-based function
const execAsync = promisify(exec);

// Wrap the execAsync function to handle errors
export async function asyncExec(command: string) {
  try {
    const result = await execAsync(command);
    return result;
  } catch (error: any) {
    console.error(`Error executing command: ${error.message}`);
    // If error has a `stderr` property, log it for more details
    if ('stderr' in error) {
      console.error(`Stderr output: ${error.stderr}`);
    }
    throw error; // re-throw the error after logging
  }
}

export default asyncExec;