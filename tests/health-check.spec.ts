import request from "supertest";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { healthCheckSchema } from "../schemas/health-check.schema";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validarContrato = ajv.compile(healthCheckSchema);

const urlApi = process.env.API_URL || "http://localhost:54321/functions/v1";
const anonKey = process.env.SUPABASE_ANON_KEY || "";

describe("Testes da API - Monitoramento", () => {
  
  it("Validar o contrato do endpoint de Health Check (Linear: APX-103)", async () => {
    const requisicao = request(urlApi).get("/health-check");

    if (anonKey) {
      requisicao
        .set("apikey", anonKey)
        .set("Authorization", `Bearer ${anonKey}`);
    }

    const resposta = await requisicao
      .expect("Content-Type", /json/)
      .expect(200);

    const contratoValido = validarContrato(resposta.body);

    if (!contratoValido) {
      console.log("Erros no contrato da API:", validarContrato.errors);
    }

    expect(contratoValido).toBe(true);
    expect(resposta.body.status).toBe("healthy");
  });
});
