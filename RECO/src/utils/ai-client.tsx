import { projectId, publicAnonKey } from './supabase/info';

interface AIResponse {
  success: boolean;
  response: string;
  error?: string;
}

class AIClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-2d02aba3`;
  }

  async generateResponse(message: string, conversationHistory: any[] = []): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          message,
          conversationHistory
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        success: data.success,
        response: data.response
      };

    } catch (error) {
      console.error('AI Client Error:', error);
      return {
        success: false,
        response: "I'm here to support your knee recovery journey. Let's talk about how you're feeling today.",
        error: error.message
      };
    }
  }
}

export { AIClient };
export type { AIResponse };