export interface ICustomDatePickerProps {
  label: string;
  disabled: boolean;
  onPropertyChange: (value: Date | null | undefined) => void;
  value?: Date;
  stateKey: string;
}
