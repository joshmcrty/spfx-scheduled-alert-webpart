import { DisplayMode } from "@microsoft/sp-core-library";
import { IAlertItemProps } from "../AlertWebPart";

export interface IAlertProps {
  items: IAlertItemProps[];
  editItem: (index: number) => void;
  deleteItem: (index: number) => void;
  displayMode: DisplayMode;
  domElement: HTMLElement;
}
