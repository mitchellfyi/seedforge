import { gateway } from "@ai-sdk/gateway";
import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";

export const myProvider = isTestEnvironment
  ? (() => {
      const { artifactModel, chatModel, reasoningModel, titleModel } =
        require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : null;

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  return gateway.languageModel(modelId);
}

export function getCoachingModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("chat-model");
  }
  return gateway.languageModel("anthropic/claude-sonnet-4-6");
}

export function getProjectDesignerModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("chat-model");
  }
  return gateway.languageModel("anthropic/claude-opus-4-6");
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return gateway.languageModel("anthropic/claude-sonnet-4-6");
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }
  return gateway.languageModel("anthropic/claude-sonnet-4-6");
}
