import { getRolesFromCookie } from "@/utils/cookieClient";
import { z } from "zod";

export const formSchemaRegisterUserProfile = z.object({
  name: z.string().min(1, { message: "O campo Nome é obrigatório" }),
  email: z.string().min(1,{ message: "O campo E-mail é obrigatório" }),
  password: z.string().min(1,{ message: "O campo Senha é obrigatório" }),
  active: z.enum(['sim', 'nao']),
  phone: z.string().min(1,{ message: "O campo Whatsapp é obrigatório" }),
  cpf: z.string().min(1,{ message: "O campo Documento é obrigatório" }),
  genre: z.string().min(1,{ message: "O campo Genero é obrigatório" }),
  birthday: z.string().min(1,{ message: "O campo Nascimento é obrigatório" }),
  pix: z.string().min(1,{ message: "O campo Pix é obrigatório" }),
  role: z.string().min(1,{ message: "O campo Permissão é obrigatório" }),
});
