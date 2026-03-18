import { faker } from "@faker-js/faker";
import type { LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

function createFakeLocalizedText(localizedText: Partial<LocalizedText> = {}): Partial<LocalizedText> {
  return {
    en: faker.datatype.boolean() ? faker.word.sample() : undefined,
    de: faker.datatype.boolean() ? faker.word.sample() : undefined,
    es: faker.datatype.boolean() ? faker.word.sample() : undefined,
    fr: faker.datatype.boolean() ? faker.word.sample() : undefined,
    it: faker.datatype.boolean() ? faker.word.sample() : undefined,
    pt: faker.datatype.boolean() ? faker.word.sample() : undefined,
    ...localizedText,
  };
}

function createFakeLocalizedTexts(localizedTexts: Partial<LocalizedTexts> = {}): Partial<LocalizedTexts> {
  return {
    en: faker.datatype.boolean() ? faker.word.words(3).split(" ") : undefined,
    de: faker.datatype.boolean() ? faker.word.words(3).split(" ") : undefined,
    es: faker.datatype.boolean() ? faker.word.words(3).split(" ") : undefined,
    fr: faker.datatype.boolean() ? faker.word.words(3).split(" ") : undefined,
    it: faker.datatype.boolean() ? faker.word.words(3).split(" ") : undefined,
    pt: faker.datatype.boolean() ? faker.word.words(3).split(" ") : undefined,
    ...localizedTexts,
  };
}

export {
  createFakeLocalizedText,
  createFakeLocalizedTexts,
};