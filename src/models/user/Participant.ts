import type { Domain } from "../domain/Domain";
import type { Field } from "../field/Field";
import type { Skill } from "../skills/Skills";
import type { User } from "./User";

export interface Participant {
  id: number;
  userId: number;
  country: string;
  region?: string | null;
  city: string;
  githubUrl?: string | null;
  linkedInUrl?: string | null;
  user?: User;
  userDomains: { domain: Domain }[];
  userSkills: { skill: Skill }[];
  userFields: { field: Field }[];
}
