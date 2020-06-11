declare interface IAlertWebPartStrings {
  WebPartDescription: string;
  ItemHeaderDescription: string;
  DesignGroupName: string;
  AlertGroupName: string;
  LinkGroupName: string;
  ColorFieldLabel: string;
  IconFieldLabel: string;
  CustomIconFieldLabel: string;
  CustomIconFieldDescription: string;
  AlertFieldLabel: string;
  DescriptionFieldLabel: string;
  LinkUrlFieldLabel: string;
  LinkTextFieldLabel: string;
  LinkUrlFieldValidationMsg01: string;
  Yellow: string;
  Red: string;
  Blue: string;
  Green: string;
  NewItemButton: string;
  Edit: string;
  Delete: string;
}

declare module "AlertWebPartStrings" {
  const strings: IAlertWebPartStrings;
  export = strings;
}
