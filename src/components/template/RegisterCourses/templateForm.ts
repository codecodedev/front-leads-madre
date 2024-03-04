import { Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Cadastrar Curso",
  textButton: "Cadastrar",
  sections: [
    {
      id: 1,
      title: "Informações do Curso",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "name",
              required: true,
              type: "text",
              label: "Nome",
              messageError: "Deve ter 2 ou mais caracteres",
            },
          ],
        },
        {
          id: 2,
          fields: [
            {
              id: "status",
              required: true,
              type: "select",
              label: "Status",
              options: [
                {
                  value: 1,
                  label: "Ativo",
                },
                {
                  value: 2,
                  label: "Suspenso",
                },
              ],
              messageError: "Deve ter 2 ou mais caracteres",
            },
          ],
        },
      ],
    },
  ],
};
