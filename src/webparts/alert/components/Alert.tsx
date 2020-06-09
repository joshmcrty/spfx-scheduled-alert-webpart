import * as React from "react";
import * as strings from "AlertWebPartStrings";

import { IIconProps, Icon } from "office-ui-fabric-react/lib/Icon";

import { ActionButton } from "office-ui-fabric-react/lib/Button";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IAlertItemProps } from "../AlertWebPart";
import { IAlertProps } from "./IAlertProps";
import { Link } from "office-ui-fabric-react/lib/Link";
import styles from "./Alert.module.scss";

export default class Alert extends React.Component<IAlertProps, {}> {
  // Calls the editItem function with -1 to add a new item
  private _addBox() {
    this.props.editItem(-1);
  }

  private get _itemsToShow(): IAlertItemProps[] {
    return this.props.items.filter((item) => item.showItem);
  }

  private _removeWebPartMargins() {}

  public componentDidUpdate(): void {
    if (this._itemsToShow.length === 0) {
      this._removeWebPartMargins();
    }
  }

  public componentDidMount(): void {
    if (this._itemsToShow.length === 0) {
      this._removeWebPartMargins();
    }
  }

  public render(): React.ReactElement<IAlertProps> {
    return (
      <div className={styles.alert}>
        {this.props.displayMode === DisplayMode.Edit && (
          <div>
            <ActionButton
              iconProps={{ iconName: "Add" }}
              onClick={this._addBox.bind(this)}
            >
              {strings.NewItemButton}
            </ActionButton>
          </div>
        )}
        {this.props.items.length > 0 &&
          this.props.items.map((item, index) => {
            const iconProps: IIconProps = {
                iconName: item.icon === "Other" ? item.customIcon : item.icon,
              },
              bgClassName = styles[item.style],
              itemStyles: React.CSSProperties = {
                opacity: item.showItem ? 1 : 0.5,
              };

            if (this.props.displayMode === DisplayMode.Read && !item.showItem) {
              return;
            }

            return (
              <div
                className={`${styles.alertItem} ${bgClassName}`}
                style={itemStyles}
                key={item.id}
              >
                <Icon
                  className={styles.icon}
                  {...iconProps}
                  ariaLabel={iconProps.iconName}
                />
                <div className={styles.content}>
                  <strong>{item.alert}</strong> {item.description}{" "}
                  {item.linkUrl && item.linkText && (
                    <Link href={item.linkUrl}>{item.linkText}</Link>
                  )}
                </div>
                <ActionButton
                  iconProps={{ iconName: "Edit" }}
                  onClick={this.props.editItem.bind(this, index)}
                  ariaLabel="Edit"
                  title="Edit"
                  className={styles.editButton}
                />
              </div>
            );
          })}
      </div>
    );
  }
}
