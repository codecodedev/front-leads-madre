import { ListActionsProps, InfoList, Templateform } from "@/types/general";

export const templateform: Templateform = {
  title: "Usuário",
  textButton: "Editar",
  sections: [
    {
      id: 1,
      title: "Dados Pessoais",
      boxs: [
        {
          id: 1,
          fields: [
            {
              id: "name",
              required: true,
              type: "text",
              label: "Nome",
              messageError: "Must be 2 or more characters long",
            },
            {
              id: "last_name",
              required: true,
              type: "text",
              label: "Sobrenome",
              messageError: "Must be 2 or more characters long",
            },
          ],
        },
        {
          id: 2,
          fields: [
            {
              id: "image",
              required: true,
              type: "file",
              label: "Foto: (600 x 600)",
              classInput: "pl-2",
            },
          ],
        },
        {
          id: 3,
          fields: [
            {
              id: "whatsapp",
              required: true,
              type: "text",
              label: "Whatsapp",
            },
            {
              id: "document",
              required: true,
              type: "text",
              label: "Documento",
            },
          ],
        },
        {
          id: 4,
          fields: [
            {
              id: "datebirth",
              required: true,
              type: "text",
              label: "Nascimento",
            },
            {
              id: "genero",
              required: true,
              type: "select",
              label: "Genero",
              options: [
                {
                  label: "genero 1",
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          id: 5,
          fields: [
            {
              id: "email",
              required: true,
              type: "text",
              label: "E-mail",
            },
          ],
        },
        {
          id: 6,
          fields: [
            {
              id: "nivel",
              required: true,
              type: "select",
              label: "Nivel",
              options: [
                {
                  label: "nivel 1",
                  value: 1,
                },
              ],
            },
            {
              id: "status",
              required: true,
              type: "select",
              label: "Status",
              options: [
                {
                  label: "status 1",
                  value: 1,
                },
              ],
            },
            {
              id: "created_at",
              required: true,
              type: "date",
              label: "Data",
            },
          ],
        },
      ],
    },
  ],
};
