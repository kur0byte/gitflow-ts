import fs from 'fs';
import path from 'path';

export function envUpdateHandler(variableName: string, newValue: string): void {
    // Read the .env file
    const envFilePath = path.join(process.cwd(), '.env');
    const envFileContent = fs.readFileSync(envFilePath, 'utf8');

    // Parse the file content into an object
    const envVars = Object.fromEntries(
        envFileContent.split('\n').map(line => line.split('='))
    );

    // Update the object
    envVars[variableName] = newValue;

    // Write the updated object back to the .env file
    const updatedEnvFileContent = Object.entries(envVars)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    fs.writeFileSync(envFilePath, updatedEnvFileContent);
}