import { faker } from "@faker-js/faker";
import { LOCALES } from "@goat-it/schemas/shared/locale";
import type { Locale, LocalizedText, LocalizedTexts } from "@goat-it/schemas/shared/locale";

function pickGuaranteedLocale(): Locale {
  return faker.helpers.arrayElement([...LOCALES]);
}

function createFakeLocalizedText(localizedText: Partial<LocalizedText> = {}): Partial<LocalizedText> {
  const guaranteedLocale = pickGuaranteedLocale();

  return {
    en: faker.helpers.maybe(() => faker.word.sample()),
    de: faker.helpers.maybe(() => faker.word.sample()),
    es: faker.helpers.maybe(() => faker.word.sample()),
    fr: faker.helpers.maybe(() => faker.word.sample()),
    it: faker.helpers.maybe(() => faker.word.sample()),
    pt: faker.helpers.maybe(() => faker.word.sample()),
    [guaranteedLocale]: faker.word.sample(),
    ...localizedText,
  };
}

function createFakeLocalizedTexts(localizedTexts: Partial<LocalizedTexts> = {}): Partial<LocalizedTexts> {
  const guaranteedLocale = pickGuaranteedLocale();

  return {
    en: faker.helpers.maybe(() => faker.word.words(3).split(" ")),
    de: faker.helpers.maybe(() => faker.word.words(3).split(" ")),
    es: faker.helpers.maybe(() => faker.word.words(3).split(" ")),
    fr: faker.helpers.maybe(() => faker.word.words(3).split(" ")),
    it: faker.helpers.maybe(() => faker.word.words(3).split(" ")),
    pt: faker.helpers.maybe(() => faker.word.words(3).split(" ")),
    [guaranteedLocale]: faker.word.words(3).split(" "),
    ...localizedTexts,
  };
}

export {
  createFakeLocalizedText,
  createFakeLocalizedTexts,
};