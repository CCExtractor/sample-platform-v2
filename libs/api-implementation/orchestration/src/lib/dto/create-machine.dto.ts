import { IsEnum } from 'class-validator';

export enum Type {
  PullRequest = 'PullRequest',
  Commit = 'Commit',
}

export class CreateMachineDTO {
  name: string;

  @IsEnum(Type)
  type: Type;
}
