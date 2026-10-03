import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  input: [`${process.env.VYASA_SRC ?? './vyasa'}/admin/openapi.json`],
});
