import { CosmosClient } from "@azure/cosmos";

import type { ContactInquiryDocument } from "./contact-inquiry";

class CosmosDBClient {
  private static instance: CosmosClient;

  private constructor() {}

  public static getInstance(config?: { endpoint?: string; key?: string }): CosmosClient {
    if (!CosmosDBClient.instance) {
      const endpoint = config?.endpoint || process.env.COSMOS_DB_ENDPOINT || "";
      const key = config?.key || process.env.COSMOS_DB_KEY || "";

      if (!endpoint || !key) {
        throw new Error("COSMOS_DB_ENDPOINT and COSMOS_DB_KEY must be configured.");
      }

      CosmosDBClient.instance = new CosmosClient({
        endpoint,
        key,
      });
    }

    return CosmosDBClient.instance;
  }
}

type CosmosRuntimeConfig = {
  allowMockCosmosDb?: boolean;
  cosmosDbContainerId?: string;
  cosmosDbDatabaseId?: string;
  cosmosDbEndpoint?: string;
  cosmosDbKey?: string;
};

export async function saveContactInquiryDocument(
  config: CosmosRuntimeConfig,
  document: ContactInquiryDocument,
) {
  const databaseId = config.cosmosDbDatabaseId;
  const containerId = config.cosmosDbContainerId;
  const endpoint = config.cosmosDbEndpoint || process.env.COSMOS_DB_ENDPOINT || "";
  const key = config.cosmosDbKey || process.env.COSMOS_DB_KEY || "";

  if (!databaseId || !containerId || !endpoint || !key) {
    if (import.meta.dev || config.allowMockCosmosDb) {
      console.info("[cosmos-db:mock] Missing Cosmos DB configuration", document);
      return { mocked: true };
    }

    throw new Error(
      "Configure COSMOS_DB_ENDPOINT, COSMOS_DB_KEY, COSMOS_DB_DATABASE_ID, and COSMOS_DB_CONTAINER_ID.",
    );
  }

  const client = CosmosDBClient.getInstance({ endpoint, key });
  const container = client.database(databaseId).container(containerId);

  await container.items.upsert(document);

  return { mocked: false };
}

export default CosmosDBClient;
