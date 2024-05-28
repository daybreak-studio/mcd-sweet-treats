import {
  InputLanguageKey,
  OutputLanguageKey,
  inputLanguageMap,
  outputLanguageMap,
} from "./Languages";
import { v4 as uuidv4 } from "uuid";

export interface UploadRecord {
  name: string;
  email: string;
  inputLanguage: InputLanguageKey;
  outputLanguage: OutputLanguageKey;
}

export interface IdentifiableUploadRecord extends UploadRecord {
  uuid: string;
}

export function createIdentifiableUploadRecord(record: UploadRecord) {
  const uuid = uuidv4();
  return { uuid: uuid, ...record };
}

export function validateUploadRecord(record: any): UploadRecord {
  const { name, email, inputLanguage, outputLanguage } = record;

  if (!name) {
    throw "Name cannot null";
  }
  if (!email) {
    throw "Email cannot be null";
  }
  if (!inputLanguage) {
    throw "Input language cannot be null";
  }
  if (!outputLanguage) {
    throw "Output language cannot be null";
  }
  if (typeof name !== "string") {
    throw "'name' must be a string";
  }

  if (typeof email !== "string") {
    throw "'email' must be a string";
  }

  if (!outputLanguageMap[outputLanguage as OutputLanguageKey]) {
    throw `Output language "${outputLanguage}" not supported.`;
  }

  if (!inputLanguageMap[inputLanguage as InputLanguageKey]) {
    throw `Output language "${inputLanguage}" not supported.`;
  }

  return record as UploadRecord;
}
