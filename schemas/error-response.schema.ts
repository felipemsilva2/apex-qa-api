export const errorResponseSchema = {
  type: "object",
  properties: {
    success: { type: "boolean", enum: [false] },
    error: { type: "string" }
  },
  required: ["success", "error"]
};
