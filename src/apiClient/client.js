import  { Validator } from "jsonschema"

const BASE_URL = "/api";

const schemaValidator = new Validator();

export const createRequest = ({path, schema}) => {
  schemaValidator.addSchema(schema, schema.id);

  return async (init) => {
      const response = await fetch(`${BASE_URL}${path}`, init);
      const result = await response.json();
      schemaValidator.validate(result, schema, {throwError: true});
      return result;
  }
}