import * as React from "react";
import * as ReactDom from "react-dom";
import * as strings from "AlertWebPartStrings";

import { Guid, Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { get, update } from "@microsoft/sp-lodash-subset";

import Alert from "./components/Alert";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IAlertProps } from "./components/IAlertProps";
import { PropertyPaneDatePicker } from "../../controls/PropertyPaneDatePicker/PropertyPaneDatePicker";

export interface IAlertWebPartProps {
  items: IAlertItemProps[];
}

export interface IAlertItemProps {
  id: string;
  icon: string;
  customIcon: string;
  alert: string;
  description: string;
  linkText: string;
  linkUrl: string;
  style: string;
  startDate: number;
  endDate: number;
  showItem: boolean;
}

export default class AlertWebPart extends BaseClientSideWebPart<
  IAlertWebPartProps
> {
  // Index of current item being edited.
  private _activeIndex: number = -1;

  // Function to update array of items
  private _editItem(index: number): void {
    // Add a new linkItem
    if (index === -1) {
      let newItems = this.properties.items.slice();
      let guid = Guid.newGuid();
      newItems.unshift({
        id: guid.toString(),
        icon: "warning",
        customIcon: null,
        alert: "Enter a title",
        description: "Enter a message",
        linkText: null,
        linkUrl: null,
        style: "warning",
        startDate: new Date().getTime(),
        endDate: new Date().getTime(),
        showItem: null,
      });
      this.properties.items = newItems;
      index = 0;

      // Update the web part UI with the new item
      this.render();
    }

    // Set the activeIndex to the item that should be edited
    this._activeIndex = index;

    // Trigger getPropertyPaneConfiguration, where isRenderedByWebPart will return true
    this.context.propertyPane.open();
  }

  // Returns a copy of the property bag `items` with the `showItem` property updated based on the `startDate` and `endDate` properties.
  private get _itemsWithShowUpdated(): IAlertItemProps[] {
    if (!this.properties.items) {
      return [];
    }

    const now = new Date().getTime();

    return this.properties.items.slice().map((item) => {
      // Set endDate to the end of that day (i.e. 23:59:59)
      const newEndDate = new Date(item.endDate);
      newEndDate.setHours(23, 59, 59, 999);
      item.endDate = newEndDate.getTime();

      // Compare start/end dates and show item if it falls within the date range
      item.showItem = item.startDate <= now && now <= item.endDate;
      return item;
    });
  }

  public render(): void {
    // Ensure `items` is an array and not undefined, and prepopulate dates with today if empty (i.e. when first adding web part to the page)
    if (!this.properties.items) {
      this.properties.items = [];
    }
    this.properties.items.forEach((item) => {
      if (!item.startDate) {
        item.startDate = new Date().getTime();
      }
      if (!item.endDate) {
        item.endDate = new Date().getTime();
      }
    });

    const element: React.ReactElement<IAlertProps> = React.createElement(
      Alert,
      {
        items: this._itemsWithShowUpdated,
        editItem: this._editItem.bind(this),
        displayMode: this.displayMode,
        domElement: this.domElement,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  private _onScheduleDateChanged(propertyPath: string, newValue: Date) {
    const oldValue: any = get(this.properties, propertyPath);
    update(this.properties, propertyPath, (): any => {
      return newValue.getTime();
    });
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if (this.context.propertyPane.isRenderedByWebPart()) {
      return this.getItemPropertyPaneConfiguration();
    } else {
      return this.getWebPartPropertyPaneConfiguration();
    }
  }

  private getWebPartPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description:
              "There are no global properties to edit for this web part. Each alert has an edit icon to change its individual properties.",
          },
          groups: [
            {
              groupFields: [],
            },
          ],
        },
      ],
    };
  }

  private getItemPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: `Edit the properties for alert ${
              this._activeIndex + 1
            }.`,
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.DesignGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneChoiceGroup(`items[${this._activeIndex}].style`, {
                  label: strings.ColorFieldLabel,
                  options: [
                    {
                      key: "warning",
                      text: strings.Yellow,
                    },
                    {
                      key: "error",
                      text: strings.Red,
                    },
                    {
                      key: "info",
                      text: strings.Blue,
                    },
                    {
                      key: "success",
                      text: strings.Green,
                    },
                  ],
                }),
                PropertyPaneChoiceGroup(`items[${this._activeIndex}].icon`, {
                  label: strings.IconFieldLabel,
                  options: [
                    {
                      key: "Warning",
                      text: "Warning",
                    },
                    {
                      key: "Error",
                      text: "Error",
                    },
                    {
                      key: "Info",
                      text: "Info",
                    },
                    {
                      key: "Completed",
                      text: "Completed",
                    },
                    {
                      key: "Other",
                      text: "Other (enter icon name)",
                    },
                  ],
                }),
                PropertyPaneTextField(
                  `items[${this._activeIndex}].customIcon`,
                  {
                    label: strings.CustomIconFieldLabel,
                    description: strings.CustomIconFieldDescription,
                    placeholder: "WarningSolid",
                    disabled:
                      this.properties.items[this._activeIndex].icon !== "Other",
                  }
                ),
              ],
            },
            {
              groupName: strings.AlertGroupName,
              groupFields: [
                PropertyPaneTextField(`items[${this._activeIndex}].alert`, {
                  label: strings.AlertFieldLabel,
                }),
                PropertyPaneTextField(
                  `items[${this._activeIndex}].description`,
                  {
                    label: strings.DescriptionFieldLabel,
                  }
                ),
              ],
            },
            {
              groupName: strings.LinkGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField(`items[${this._activeIndex}].linkUrl`, {
                  label: strings.LinkUrlFieldLabel,
                  placeholder: "https://contoso.com",
                  onGetErrorMessage: this._validateUrl.bind(this),
                }),
                PropertyPaneTextField(`items[${this._activeIndex}].linkText`, {
                  label: strings.LinkTextFieldLabel,
                }),
              ],
            },
            {
              groupName: "Schedule",
              groupFields: [
                new PropertyPaneDatePicker(
                  `items[${this._activeIndex}].startDate`,
                  {
                    label: "Start date",
                    onPropertyChange: this._onScheduleDateChanged.bind(this),
                    disabled: false,
                    value: new Date(
                      this.properties.items[this._activeIndex].startDate
                    ),
                  }
                ),
                new PropertyPaneDatePicker(
                  `items[${this._activeIndex}].endDate`,
                  {
                    label: "End date",
                    onPropertyChange: this._onScheduleDateChanged.bind(this),
                    disabled: false,
                    value: new Date(
                      this.properties.items[this._activeIndex].endDate
                    ),
                  }
                ),
              ],
            },
          ],
        },
      ],
    };
  }

  private _validateUrl(value: string): string {
    // Url must be blank, relative to domain, or a valid absolute URL; see https://gist.github.com/dperini/729294
    if (value.charAt(0) === "/") {
      return "";
    }

    const expression = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const regex = new RegExp(expression);
    if (value !== "" && !value.match(regex)) {
      return strings.LinkUrlFieldValidationMsg01;
    }
    return "";
  }
}
