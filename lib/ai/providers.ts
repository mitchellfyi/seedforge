import { gateway } from "@ai-sdk/gateway";
import { customProvider } from "ai";
import { isTestEnvironment } from "../constants";
import { DEFAULT_CHAT_MODEL, PROJECT_GENERATION_MODEL } from "./models";

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
  return gateway.languageModel(DEFAULT_CHAT_MODEL);
}

export function getProjectDesignerModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("chat-model");
  }
  return gateway.languageModel(PROJECT_GENERATION_MODEL);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return gateway.languageModel(DEFAULT_CHAT_MODEL);
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }
  return gateway.languageModel(DEFAULT_CHAT_MODEL);
}
