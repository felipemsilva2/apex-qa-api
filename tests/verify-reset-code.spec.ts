import request from "supertest";
import Ajv from "ajv";
import { errorResponseSchema } from "../schemas/error-response.schema";

const ajv = new Ajv({ allErrors: true });
const validarContratoErro = ajv.compile(errorResponseSchema);

const urlApi = process.env.API_URL || "http://localhost:54321/functions/v1";
const anonKey = process.env.SUPABASE_ANON_KEY || "";

describe("Testes da API - Recuperação de Senha", () => {

  it("Validar contrato de resposta de erro ao enviar dados em branco (Linear: APX-104)", async () => {
    const requisicao = request(urlApi).post("/verify-reset-code");

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

    if (!contratoValido) {
      console.log("Erros no contrato de erro da API:", validarContratoErro.errors);
    }

    expect(contratoValido).toBe(true);
    expect(resposta.body.success).toBe(false);
    expect(resposta.body.error).toBe("Campos obrigatorios ausentes");
  });
});
