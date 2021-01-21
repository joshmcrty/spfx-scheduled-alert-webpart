define([], function () {
  return {
    WebPartDescription:
      "Edit the overall web part properties here. Each alert has an edit icon to change its individual properties, including scheduling. Use the New alert button to add additional alerts.",
    DomSelectorFieldLabel: "Web part parent element DOM selector",
    DomSelectorFieldDescription: "Enter a valid DOMString selector (e.g. .ControlZone) to remove margins and padding from the container element of the entire web part. This ensures no whitespace is left on the page if there are no visible alerts.",
    ItemHeaderDescription: "Edit the properties for alert",
    DesignGroupName: "Design",
    IconFieldLabel: "Icon",
    CustomIconFieldLabel: "Custom icon name",
    CustomIconFieldDescription:
      "See list of icons at https://aka.ms/fluentui-icons. Some icons may not be available yet.",
    ColorFieldLabel: "Type",
    AlertGroupName: "Message",
    AlertFieldLabel: "Title",
    DescriptionFieldLabel: "Message",
    LinkGroupName: "Link",
    LinkUrlFieldLabel: "URL",
    LinkTextFieldLabel: "Link Text",
    LinkUrlFieldValidationMsg01:
      "The URL must start with “/”, “http://” or “https://”.",
    ScheduleGroupName: "Schedule",
    ScheduledFieldLabel: "Schedule alert",
    StartDateFieldLabel: "Start date",
    EndDateFieldLabel: "End date",
    Yellow: "Warning",
    Red: "Error",
    Blue: "Info",
    Green: "Success",
    Warning: "Warning",
    Error: "Error",
    Info: "Info",
    Completed: "Completed",
    Other: "Other (enter icon name)",
    NewItemButton: "New alert",
    Edit: "Edit",
    Delete: "Delete",
    RequiredFieldValidationMessage: "This field is required.",
    SelectorErrorMessage: "No web part parent element was selected. Please verify that a valid selector was used."
  };
});
