// ESTO RECOMIENDA FER HACER UN SNIPPET

import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
}

const envsSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
  })
  // ponemos el unknow en true porque tendremos mas variables, por ejemplo el path de node, usuario, entre otras cosas que se encuentran en el process.env de una aplicación de node.
  .unknown(true);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(
    `Error al validar las variables de entorno: ${error.message}`,
  );
}

export const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
};
