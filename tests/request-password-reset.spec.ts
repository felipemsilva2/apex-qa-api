import request from "supertest";
import Ajv from "ajv";
import { errorResponseSchema } from "../schemas/error-response.schema";

const ajv = new Ajv({ allErrors: true });
const validarContratoErro = ajv.compile(errorResponseSchema);

const urlApi = process.env.API_URL || "http://localhost:54321/functions/v1";
const anonKey = process.env.SUPABASE_ANON_KEY || "";

describe("Testes da API - Solicitar Reset de Senha", () => {

  it("Validar contrato de erro ao solicitar reset sem os dados obrigatórios", async () => {
    const requisicao = request(urlApi).post("/request-password-reset");

    if (anonKey) {
      requisicao
        .set("apikey", anonKey)
        .set("Authorization", `Bearer ${anonKey}`);
    }

    const resposta = await requisicao
      .send({})
      .expect("Content-Type", /json/)
      .expect(400);

    const contratoValido = validarContratoErro(resposta.body);

    expect(contratoValido).toBe(true);
    expect(resposta.body.success).toBe(false);
    expect(resposta.body.error).toContain("Campos obrigatórios ausentes");
  });
});
