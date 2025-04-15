import { v4 as uuid } from "uuid";

export default function getUuid(): string {
  const value: string | null = localStorage.getItem("uuid");
  if (value == null) {
    const newId: string = uuid();
    localStorage.setItem("uuid", newId);
    return newId;
  } else {
    return value;
  }
}
