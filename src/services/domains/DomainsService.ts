import { clientApi } from "../../config/axiosConfig";
import type { Domain } from "../../models/domain/Domain";

export const DomainsService = {
  async get() {
    const response = await clientApi.get<Domain[]>("/domains");
    return response.data;
  },
};
