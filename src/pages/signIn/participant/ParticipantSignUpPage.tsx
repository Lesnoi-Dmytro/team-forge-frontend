import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./ParticipantSignUpPage.module.css";
import {
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/auth/AuthService";
import { UserContext } from "../../../states/UserContext";
import type { Domain } from "../../../models/domain/Domain";
import type { Skill } from "../../../models/skills/Skills";
import type { Field } from "../../../models/field/Field";
import { DomainsService } from "../../../services/domains/DomainsService";
import { FieldsService } from "../../../services/fields/FieldsService";
import { SkillsService } from "../../../services/skills/SkillsService";

const ParticipantSignUpPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [domainsList, setDomainsList] = useState<Domain[]>([]);
  const [skillsList, setSkillsList] = useState<Skill[]>([]);
  const [fieldsList, setFieldsList] = useState<Field[]>([]);

  const [country, setCountry] = useState<string>("");
  const [region, setRegion] = useState<string | undefined>();
  const [city, setCity] = useState<string>("");
  const [domainIds, setDomainIds] = useState<number[]>([]);
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const [fieldIds, setFieldIds] = useState<number[]>([]);
  const domains = useMemo(
    () => domainsList.filter((domain) => domainIds.includes(domain.id)),
    [domainsList, domainIds]
  );
  const skills = useMemo(
    () => skillsList.filter((skill) => skillIds.includes(skill.id)),
    [skillsList, skillIds]
  );
  const fields = useMemo(
    () => fieldsList.filter((field) => fieldIds.includes(field.id)),
    [fieldsList, fieldIds]
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await AuthService.completeParticipantSignUp({
        country,
        region,
        city,
        domains: domainIds,
        skills: skillIds,
        fields: fieldIds,
      });
      setUser(user);
      navigate("/events");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const domains = await DomainsService.get();
        const skills = await SkillsService.get();
        const fields = await FieldsService.get();

        setDomainsList(domains);
        setSkillsList(skills);
        setFieldsList(fields);
      } catch (e) {
        console.log(e);
      }
    };

    load();
  }, []);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h3 className={styles.header}>Complete Partisipant Sign Up</h3>
          <FormControl className={styles.input}>
            <TextField
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </FormControl>
          <FormControl className={styles.input}>
            <TextField
              label="Region"
              value={region || ""}
              onChange={(e) => setRegion(e.target.value || undefined)}
            />
          </FormControl>
          <FormControl className={styles.input}>
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </FormControl>
          <FormControl className={styles.input}>
            <InputLabel>Domains</InputLabel>
            <Select
              multiple
              value={domainIds}
              onChange={(e) =>
                setDomainIds(e.target.value as unknown as number[])
              }
              label="Domains"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {domains.map((domain) => (
                    <Chip key={domain.id} label={domain.name} />
                  ))}
                </Box>
              )}
            >
              {domainsList.map((domain) => (
                <MenuItem key={domain.id} value={domain.id}>
                  {domain.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={styles.input}>
            <InputLabel>Skills</InputLabel>
            <Select
              multiple
              value={skillIds}
              onChange={(e) =>
                setSkillIds(e.target.value as unknown as number[])
              }
              label="Skills"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {skills.map((skill) => (
                    <Chip key={skill.id} label={skill.name} />
                  ))}
                </Box>
              )}
            >
              {skillsList.map((skill) => (
                <MenuItem key={skill.id} value={skill.id}>
                  {skill.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={styles.input}>
            <InputLabel>Fields</InputLabel>
            <Select
              multiple
              value={fieldIds}
              onChange={(e) =>
                setFieldIds(e.target.value as unknown as number[])
              }
              label="Fields"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {fields.map((field) => (
                    <Chip key={field.id} label={field.name} />
                  ))}
                </Box>
              )}
            >
              {fieldsList.map((field) => (
                <MenuItem key={field.id} value={field.id}>
                  {field.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Complete Sign Up
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ParticipantSignUpPage;
