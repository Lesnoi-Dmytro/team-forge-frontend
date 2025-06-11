import { clientApi } from "../../config/axiosConfig";
import type { Field } from "../../models/field/Field";

export const FieldsService = {
  async get() {
    const response = await clientApi.get<Field[]>("/fields");
    return response.data;
  },
};
