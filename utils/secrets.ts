// Utility to fetch secrets from AWS Secrets Manager at runtime
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

let cachedSecret: string | null = null;

export async function getMongoUri(): Promise<string> {
  // Return cached value if available
  if (cachedSecret) return cachedSecret;

  // Try standard env var first (for local dev with .env files)
  if (process.env.MONGO_URI) {
    cachedSecret = process.env.MONGO_URI;
    return cachedSecret;
  }

  // Fallback: fetch from AWS Secrets Manager
  // The Amplify-deployed Lambda has IAM permissions to read secrets
  const secretName = process.env.SECRET_NAME || 'hackrpi/mongodb';
  const region = process.env.AWS_REGION || 'us-east-1';

  try {
    const client = new SecretsManagerClient({ region });
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await client.send(command);

    if (response.SecretString) {
      // Expect JSON format: {"MONGO_URI": "mongodb+srv://..."}
      try {
        const parsed = JSON.parse(response.SecretString);
        cachedSecret = parsed.MONGO_URI || parsed.mongoUri || parsed.uri;
      } catch {
        // Plain string format
        cachedSecret = response.SecretString;
      }
    }

    if (!cachedSecret) throw new Error('Secret value is empty');
    return cachedSecret;
  } catch (error) {
    console.error('Failed to retrieve MongoDB URI from Secrets Manager:', error);
    throw new Error('Database connection not configured');
  }
}
