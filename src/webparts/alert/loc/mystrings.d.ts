declare interface IAlertWebPartStrings {
  WebPartDescription: string;
  ItemHeaderDescription: string;
  DesignGroupName: string;
  AlertGroupName: string;
  LinkGroupName: string;
  ScheduleGroupName: string;
  ColorFieldLabel: string;
  IconFieldLabel: string;
  CustomIconFieldLabel: string;
  CustomIconFieldDescription: string;
  AlertFieldLabel: string;
  DescriptionFieldLabel: string;
  LinkUrlFieldLabel: string;
  LinkTextFieldLabel: string;
  LinkUrlFieldValidationMsg01: string;
  ScheduledFieldLabel: string;
  StartDateFieldLabel: string;
  EndDateFieldLabel: string;
  Yellow: string;
  Red: string;
  Blue: string;
  Green: string;
  Warning: string;
  Error: string;
  Info: string;
  Completed: string;
  Other: string;
  NewItemButton: string;
  Edit: string;
  Delete: string;
}

declare module "AlertWebPartStrings" {
  const strings: IAlertWebPartStrings;
  export = strings;
}
