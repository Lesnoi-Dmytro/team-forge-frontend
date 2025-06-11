import styles from "./RegisterEventPage.module.css";
import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Field } from "../../../models/field/Field";
import { FieldsService } from "../../../services/fields/FieldsService";
import { EventsService } from "../../../services/events/EventsService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";

const RegisterEventPage = () => {
  const navigate = useNavigate();

  const [fieldsList, setFieldsList] = useState<Field[]>([]);

  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [region, setRegion] = useState<string | undefined>();
  const [city, setCity] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endRegistrationDate, setEndRegistrationDate] = useState<Date>(
    new Date()
  );
  const [minTeamSize, setMinTeamSize] = useState<number>(2);
  const [maxTeamSize, setMaxTeamSize] = useState<number>(5);
  const [maxParticipants, setMaxParticipants] = useState<number | undefined>();
  const [prize, setPrize] = useState<number | undefined>();
  const [online, setOnline] = useState<boolean>(true);

  const [fieldIds, setFieldIds] = useState<number[]>([]);
  const fields = useMemo(
    () => fieldsList.filter((field) => fieldIds.includes(field.id)),
    [fieldsList, fieldIds]
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await EventsService.register({
        name,
        link,
        country,
        region,
        city,
        startDate,
        endDate,
        endRegistrationDate,
        minTeamSize,
        maxTeamSize,
        maxParticipants,
        online,
        prize,
        eventFields: fieldIds,
      });
      navigate("/events");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const fields = await FieldsService.get();

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
          <h3 className={styles.header}>Register Event</h3>
          <FormControl className={styles.input}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>

          <div className={styles.twoColumns}>
            <FormControl className={styles.input}>
              <TextField
                label="Link"
                type="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </FormControl>
            <FormControl className={styles.input}>
              <TextField
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </FormControl>
          </div>

          <div className={styles.twoColumns}>
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
          </div>

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

          <div className={styles.twoColumns}>
            <FormControl className={styles.input}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(e) =>
                  setStartDate(new Date(e?.getTime() || new Date()))
                }
              />
            </FormControl>
            <FormControl className={styles.input}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(e) =>
                  setEndDate(new Date(e?.getTime() || new Date()))
                }
              />
            </FormControl>
          </div>

          <div className={styles.twoColumns}>
            <FormControl className={styles.input}>
              <TextField
                label="Min Team Size"
                value={minTeamSize}
                onChange={(e) => setMinTeamSize(Number(e.target.value))}
                type="number"
                required
              />
            </FormControl>
            <FormControl className={styles.input}>
              <TextField
                label="Max Team Size"
                value={maxTeamSize}
                onChange={(e) => setMaxTeamSize(Number(e.target.value))}
                type="number"
                required
              />
            </FormControl>
          </div>

          <div className={styles.twoColumns}>
            <FormControl className={styles.input}>
              <TextField
                label="Max Partisipants"
                value={maxParticipants}
                onChange={(e) =>
                  setMaxParticipants(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                type="number"
              />
            </FormControl>
            <FormControl className={styles.input}>
              <TextField
                label="Prize"
                value={prize}
                onChange={(e) =>
                  setPrize(e.target.value ? Number(e.target.value) : undefined)
                }
                type="number"
              />
            </FormControl>
          </div>

          <div className={styles.twoColumns}>
            <FormControl className={styles.input}>
              <DatePicker
                label="End Registration Date"
                value={endRegistrationDate}
                onChange={(e) =>
                  setEndRegistrationDate(new Date(e?.getTime() || new Date()))
                }
              />
            </FormControl>
            <FormControlLabel
              label="Online"
              control={
                <Checkbox
                  value={online}
                  onChange={(e) => setOnline(Boolean(e.target.value))}
                />
              }
            />
          </div>

          <Button type="submit" variant="contained">
            Register Event
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterEventPage;
