export interface IInjury {
  _id?: string;
  player: {
    name: string;
    _id: string;
    avatar: string;
    number: string | number;
  };
  minute: number;
  title: string;
  description?: string;
  severity: EInjurySeverity;
}

export enum EInjurySeverity {
  MINOR = "MINOR",
  MODERATE = "MODERATE",
  SEVERE = "SEVERE",
}