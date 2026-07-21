// package: christiangeorgelucas.country_tools
// file: messages.proto

import * as jspb from "google-protobuf";

export class Country extends jspb.Message {
  getAlpha2(): string;
  setAlpha2(value: string): void;

  getAlpha3(): string;
  setAlpha3(value: string): void;

  getNumeric(): string;
  setNumeric(value: string): void;

  getName(): string;
  setName(value: string): void;

  getFlagEmoji(): string;
  setFlagEmoji(value: string): void;

  getCapital(): string;
  setCapital(value: string): void;

  getContinentCode(): string;
  setContinentCode(value: string): void;

  getContinentName(): string;
  setContinentName(value: string): void;

  clearCurrencyCodesList(): void;
  getCurrencyCodesList(): Array<string>;
  setCurrencyCodesList(value: Array<string>): void;
  addCurrencyCodes(value: string, index?: number): string;

  clearCallingCodesList(): void;
  getCallingCodesList(): Array<string>;
  setCallingCodesList(value: Array<string>): void;
  addCallingCodes(value: string, index?: number): string;

  getTld(): string;
  setTld(value: string): void;

  getTldFound(): boolean;
  setTldFound(value: boolean): void;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Country.AsObject;
  static toObject(includeInstance: boolean, msg: Country): Country.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Country, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Country;
  static deserializeBinaryFromReader(message: Country, reader: jspb.BinaryReader): Country;
}

export namespace Country {
  export type AsObject = {
    alpha2: string,
    alpha3: string,
    numeric: string,
    name: string,
    flagEmoji: string,
    capital: string,
    continentCode: string,
    continentName: string,
    currencyCodesList: Array<string>,
    callingCodesList: Array<string>,
    tld: string,
    tldFound: boolean,
    found: boolean,
    error: string,
  }
}

export class CodeInput extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CodeInput.AsObject;
  static toObject(includeInstance: boolean, msg: CodeInput): CodeInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CodeInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CodeInput;
  static deserializeBinaryFromReader(message: CodeInput, reader: jspb.BinaryReader): CodeInput;
}

export namespace CodeInput {
  export type AsObject = {
    code: string,
  }
}

export class ConvertCodeInput extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConvertCodeInput.AsObject;
  static toObject(includeInstance: boolean, msg: ConvertCodeInput): ConvertCodeInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConvertCodeInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConvertCodeInput;
  static deserializeBinaryFromReader(message: ConvertCodeInput, reader: jspb.BinaryReader): ConvertCodeInput;
}

export namespace ConvertCodeInput {
  export type AsObject = {
    code: string,
  }
}

export class ConvertCodeOutput extends jspb.Message {
  getAlpha2(): string;
  setAlpha2(value: string): void;

  getAlpha3(): string;
  setAlpha3(value: string): void;

  getNumeric(): string;
  setNumeric(value: string): void;

  getValid(): boolean;
  setValid(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConvertCodeOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ConvertCodeOutput): ConvertCodeOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ConvertCodeOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConvertCodeOutput;
  static deserializeBinaryFromReader(message: ConvertCodeOutput, reader: jspb.BinaryReader): ConvertCodeOutput;
}

export namespace ConvertCodeOutput {
  export type AsObject = {
    alpha2: string,
    alpha3: string,
    numeric: string,
    valid: boolean,
    error: string,
  }
}

export class GetNameInput extends jspb.Message {
  getCode(): string;
  setCode(value: string): void;

  getLang(): string;
  setLang(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNameInput.AsObject;
  static toObject(includeInstance: boolean, msg: GetNameInput): GetNameInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetNameInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNameInput;
  static deserializeBinaryFromReader(message: GetNameInput, reader: jspb.BinaryReader): GetNameInput;
}

export namespace GetNameInput {
  export type AsObject = {
    code: string,
    lang: string,
  }
}

export class NameResult extends jspb.Message {
  getAlpha2(): string;
  setAlpha2(value: string): void;

  getName(): string;
  setName(value: string): void;

  getLangUsed(): string;
  setLangUsed(value: string): void;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NameResult.AsObject;
  static toObject(includeInstance: boolean, msg: NameResult): NameResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NameResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NameResult;
  static deserializeBinaryFromReader(message: NameResult, reader: jspb.BinaryReader): NameResult;
}

export namespace NameResult {
  export type AsObject = {
    alpha2: string,
    name: string,
    langUsed: string,
    found: boolean,
    error: string,
  }
}

export class FindByNameInput extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getLang(): string;
  setLang(value: string): void;

  getFuzzy(): boolean;
  setFuzzy(value: boolean): void;

  getLimit(): number;
  setLimit(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FindByNameInput.AsObject;
  static toObject(includeInstance: boolean, msg: FindByNameInput): FindByNameInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FindByNameInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FindByNameInput;
  static deserializeBinaryFromReader(message: FindByNameInput, reader: jspb.BinaryReader): FindByNameInput;
}

export namespace FindByNameInput {
  export type AsObject = {
    name: string,
    lang: string,
    fuzzy: boolean,
    limit: number,
  }
}

export class NameMatch extends jspb.Message {
  getAlpha2(): string;
  setAlpha2(value: string): void;

  getAlpha3(): string;
  setAlpha3(value: string): void;

  getNumeric(): string;
  setNumeric(value: string): void;

  getName(): string;
  setName(value: string): void;

  getScore(): number;
  setScore(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NameMatch.AsObject;
  static toObject(includeInstance: boolean, msg: NameMatch): NameMatch.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NameMatch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NameMatch;
  static deserializeBinaryFromReader(message: NameMatch, reader: jspb.BinaryReader): NameMatch;
}

export namespace NameMatch {
  export type AsObject = {
    alpha2: string,
    alpha3: string,
    numeric: string,
    name: string,
    score: number,
  }
}

export class FindByNameOutput extends jspb.Message {
  clearMatchesList(): void;
  getMatchesList(): Array<NameMatch>;
  setMatchesList(value: Array<NameMatch>): void;
  addMatches(value?: NameMatch, index?: number): NameMatch;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FindByNameOutput.AsObject;
  static toObject(includeInstance: boolean, msg: FindByNameOutput): FindByNameOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FindByNameOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FindByNameOutput;
  static deserializeBinaryFromReader(message: FindByNameOutput, reader: jspb.BinaryReader): FindByNameOutput;
}

export namespace FindByNameOutput {
  export type AsObject = {
    matchesList: Array<NameMatch.AsObject>,
  }
}

export class ValidateCodeOutput extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getFormatDetected(): string;
  setFormatDetected(value: string): void;

  getNormalizedAlpha2(): string;
  setNormalizedAlpha2(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateCodeOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateCodeOutput): ValidateCodeOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateCodeOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateCodeOutput;
  static deserializeBinaryFromReader(message: ValidateCodeOutput, reader: jspb.BinaryReader): ValidateCodeOutput;
}

export namespace ValidateCodeOutput {
  export type AsObject = {
    valid: boolean,
    formatDetected: string,
    normalizedAlpha2: string,
    error: string,
  }
}

export class ListCountriesInput extends jspb.Message {
  getContinentCode(): string;
  setContinentCode(value: string): void;

  getLang(): string;
  setLang(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCountriesInput.AsObject;
  static toObject(includeInstance: boolean, msg: ListCountriesInput): ListCountriesInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListCountriesInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCountriesInput;
  static deserializeBinaryFromReader(message: ListCountriesInput, reader: jspb.BinaryReader): ListCountriesInput;
}

export namespace ListCountriesInput {
  export type AsObject = {
    continentCode: string,
    lang: string,
  }
}

export class CountrySummary extends jspb.Message {
  getAlpha2(): string;
  setAlpha2(value: string): void;

  getAlpha3(): string;
  setAlpha3(value: string): void;

  getNumeric(): string;
  setNumeric(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountrySummary.AsObject;
  static toObject(includeInstance: boolean, msg: CountrySummary): CountrySummary.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountrySummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountrySummary;
  static deserializeBinaryFromReader(message: CountrySummary, reader: jspb.BinaryReader): CountrySummary;
}

export namespace CountrySummary {
  export type AsObject = {
    alpha2: string,
    alpha3: string,
    numeric: string,
    name: string,
  }
}

export class ListCountriesOutput extends jspb.Message {
  clearCountriesList(): void;
  getCountriesList(): Array<CountrySummary>;
  setCountriesList(value: Array<CountrySummary>): void;
  addCountries(value?: CountrySummary, index?: number): CountrySummary;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCountriesOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ListCountriesOutput): ListCountriesOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListCountriesOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCountriesOutput;
  static deserializeBinaryFromReader(message: ListCountriesOutput, reader: jspb.BinaryReader): ListCountriesOutput;
}

export namespace ListCountriesOutput {
  export type AsObject = {
    countriesList: Array<CountrySummary.AsObject>,
    count: number,
  }
}

export class CallingCodeOutput extends jspb.Message {
  clearCallingCodesList(): void;
  getCallingCodesList(): Array<string>;
  setCallingCodesList(value: Array<string>): void;
  addCallingCodes(value: string, index?: number): string;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallingCodeOutput.AsObject;
  static toObject(includeInstance: boolean, msg: CallingCodeOutput): CallingCodeOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CallingCodeOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallingCodeOutput;
  static deserializeBinaryFromReader(message: CallingCodeOutput, reader: jspb.BinaryReader): CallingCodeOutput;
}

export namespace CallingCodeOutput {
  export type AsObject = {
    callingCodesList: Array<string>,
    found: boolean,
    error: string,
  }
}

export class TLDOutput extends jspb.Message {
  getTld(): string;
  setTld(value: string): void;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TLDOutput.AsObject;
  static toObject(includeInstance: boolean, msg: TLDOutput): TLDOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TLDOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TLDOutput;
  static deserializeBinaryFromReader(message: TLDOutput, reader: jspb.BinaryReader): TLDOutput;
}

export namespace TLDOutput {
  export type AsObject = {
    tld: string,
    found: boolean,
    error: string,
  }
}

export class FlagEmojiOutput extends jspb.Message {
  getEmoji(): string;
  setEmoji(value: string): void;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlagEmojiOutput.AsObject;
  static toObject(includeInstance: boolean, msg: FlagEmojiOutput): FlagEmojiOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FlagEmojiOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlagEmojiOutput;
  static deserializeBinaryFromReader(message: FlagEmojiOutput, reader: jspb.BinaryReader): FlagEmojiOutput;
}

export namespace FlagEmojiOutput {
  export type AsObject = {
    emoji: string,
    found: boolean,
    error: string,
  }
}

export class DetectFlagInput extends jspb.Message {
  getEmoji(): string;
  setEmoji(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DetectFlagInput.AsObject;
  static toObject(includeInstance: boolean, msg: DetectFlagInput): DetectFlagInput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DetectFlagInput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DetectFlagInput;
  static deserializeBinaryFromReader(message: DetectFlagInput, reader: jspb.BinaryReader): DetectFlagInput;
}

export namespace DetectFlagInput {
  export type AsObject = {
    emoji: string,
  }
}

export class DetectFlagOutput extends jspb.Message {
  getAlpha2(): string;
  setAlpha2(value: string): void;

  getAlpha3(): string;
  setAlpha3(value: string): void;

  getName(): string;
  setName(value: string): void;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DetectFlagOutput.AsObject;
  static toObject(includeInstance: boolean, msg: DetectFlagOutput): DetectFlagOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DetectFlagOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DetectFlagOutput;
  static deserializeBinaryFromReader(message: DetectFlagOutput, reader: jspb.BinaryReader): DetectFlagOutput;
}

export namespace DetectFlagOutput {
  export type AsObject = {
    alpha2: string,
    alpha3: string,
    name: string,
    found: boolean,
    error: string,
  }
}

export class RegionOutput extends jspb.Message {
  getContinentCode(): string;
  setContinentCode(value: string): void;

  getContinentName(): string;
  setContinentName(value: string): void;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegionOutput.AsObject;
  static toObject(includeInstance: boolean, msg: RegionOutput): RegionOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegionOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegionOutput;
  static deserializeBinaryFromReader(message: RegionOutput, reader: jspb.BinaryReader): RegionOutput;
}

export namespace RegionOutput {
  export type AsObject = {
    continentCode: string,
    continentName: string,
    found: boolean,
    error: string,
  }
}

export class CurrencyOutput extends jspb.Message {
  clearCurrencyCodesList(): void;
  getCurrencyCodesList(): Array<string>;
  setCurrencyCodesList(value: Array<string>): void;
  addCurrencyCodes(value: string, index?: number): string;

  getFound(): boolean;
  setFound(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CurrencyOutput.AsObject;
  static toObject(includeInstance: boolean, msg: CurrencyOutput): CurrencyOutput.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CurrencyOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CurrencyOutput;
  static deserializeBinaryFromReader(message: CurrencyOutput, reader: jspb.BinaryReader): CurrencyOutput;
}

export namespace CurrencyOutput {
  export type AsObject = {
    currencyCodesList: Array<string>,
    found: boolean,
    error: string,
  }
}

