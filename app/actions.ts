"use server"

import { WatsonXAI } from "@ibm-cloud/watsonx-ai";

export type Message = {
    role: string
    content?: string
}

process.env.IBM_CREDENTIALS_FILE = process.cwd() + "/.env";

export async function message(messages: Message[]) {
    const watsonxAIService = WatsonXAI.newInstance({
        version: "2024-05-31",
        serviceUrl: "https://us-south.ml.cloud.ibm.com",
    });

    const modelParameters = {
        maxTokens: 500,
    };

    const chatResponse = await watsonxAIService.textChat({
        modelId: "mistralai/mistral-large",
        projectId: process.env.WATSONX_AI_PROJECT_ID,
        messages,
        ...modelParameters,
    });

    return chatResponse.result.choices?.[0].message;

}