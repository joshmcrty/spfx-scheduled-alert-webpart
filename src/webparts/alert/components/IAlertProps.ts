import { DisplayMode } from "@microsoft/sp-core-library";
import { IAlertItemProps } from "../AlertWebPart";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface IAlertProps {
  items: IAlertItemProps[];
  editItem: (index: number) => void;
  deleteItem: (index: number) => void;
  displayMode: DisplayMode;
  themeVariant: IReadonlyTheme;
  domElement: HTMLElement;
  domSelector: string;
}
