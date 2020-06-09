import * as React from "react";
import * as ReactDom from "react-dom";

import {
  IPropertyPaneDatePickerInternalProps,
  IPropertyPaneDatePickerProps,
} from "./IPropertyPaneDatePickerProps";
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from "@microsoft/sp-property-pane";

import CustomDatePicker from "./components/CustomDatePicker";
import { ICustomDatePickerProps } from "./components/ICustomDatePickerProps";

export class PropertyPaneDatePicker
  implements IPropertyPaneField<IPropertyPaneDatePickerProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneDatePickerInternalProps;
  private elem: HTMLElement;

  constructor(
    targetProperty: string,
    properties: IPropertyPaneDatePickerProps
  ) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: properties.label,
      label: properties.label,
      onPropertyChange: properties.onPropertyChange,
      value: properties.value,
      disabled: properties.disabled,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
    };
  }

  public render(): void {
    if (!this.elem) {
      return;
    }

    this.onRender(this.elem);
  }

  private onDispose(element: HTMLElement): void {
    ReactDom.unmountComponentAtNode(element);
  }

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {
      this.elem = elem;
    }

    const element: React.ReactElement<ICustomDatePickerProps> = React.createElement(
      CustomDatePicker,
      {
        label: this.properties.label,
        onPropertyChange: this.onChanged.bind(this),
        value: this.properties.value,
        disabled: this.properties.disabled,
        // required to allow the component to be re-rendered by calling this.render() externally
        stateKey: new Date().toString(),
      }
    );
    ReactDom.render(element, elem);
  }

  private onChanged(value: Date | null | undefined): void {
    this.properties.onPropertyChange(this.targetProperty, value);
  }
}
