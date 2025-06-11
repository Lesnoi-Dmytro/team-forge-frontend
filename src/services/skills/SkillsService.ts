import { clientApi } from "../../config/axiosConfig";
import type { Skill } from "../../models/skills/Skills";

export const SkillsService = {
  async get() {
    const response = await clientApi.get<Skill[]>("/skills");
    return response.data;
  },
};
