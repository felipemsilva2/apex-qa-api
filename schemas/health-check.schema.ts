export const healthCheckSchema = {
  type: "object",
  properties: {
    status: { type: "string", enum: ["healthy", "degraded"] },
    timestamp: { type: "string", format: "date-time" },
    version: { type: "string" },
    checks: {
      type: "object",
      properties: {
        credentials: {
          type: "object",
          properties: {
            status: { type: "string", enum: ["ok", "fail"] },
            message: { type: "string" }
          },
          required: ["status"]
        },
        database: {
          type: "object",
          properties: {
            status: { type: "string", enum: ["ok", "fail"] },
            reachable: { type: "boolean" },
            message: { type: "string" }
          },
          required: ["status"]
        },
        subscriptions: {
          type: "object",
          properties: {
            status: { type: "string", enum: ["ok", "fail"] },
            activeCount: { type: "integer" },
            message: { type: "string" }
          },
          required: ["status"]
        },
        asaas: {
          type: "object",
          properties: {
            status: { type: "string", enum: ["ok", "warn"] },
            configured: { type: "boolean" },
            webhookConfigured: { type: "boolean" }
          },
          required: ["status"]
        },
        responseTimeMs: { type: "integer" }
      },
      required: ["credentials", "database", "responseTimeMs"]
    }
  },
  required: ["status", "timestamp", "checks", "version"]
};
