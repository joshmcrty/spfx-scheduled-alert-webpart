import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";

export interface IPropertyPaneDatePickerProps {
  label: string;
  disabled: boolean;
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  value: Date | null | undefined;
}

export interface IPropertyPaneDatePickerInternalProps
  extends IPropertyPaneDatePickerProps,
    IPropertyPaneCustomFieldProps {}
