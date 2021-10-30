import * as React from "react";

import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";
import { ICustomDatePickerProps } from "./ICustomDatePickerProps";

export default class CustomDatePicker extends React.Component<
  ICustomDatePickerProps,
  {}
> {
  public render(): JSX.Element {
    return (
      <div>
        <DatePicker
          label={this.props.label}
          ariaLabel={this.props.label}
          disabled={this.props.disabled}
          onSelectDate={this.props.onPropertyChange.bind(this)}
          value={this.props.value}
        />
      </div>
    );
  }
}
