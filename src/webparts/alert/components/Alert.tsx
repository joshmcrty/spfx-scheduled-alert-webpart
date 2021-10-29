import * as React from "react";
import * as strings from "AlertWebPartStrings";

import { IIconProps, Icon } from "office-ui-fabric-react/lib/Icon";

import { ActionButton } from "office-ui-fabric-react/lib/Button";
import { Customizer } from "office-ui-fabric-react/lib/Utilities";
import { DisplayMode } from "@microsoft/sp-core-library";
import { IAlertItemProps } from "../AlertWebPart";
import { IAlertProps } from "./IAlertProps";
import { Link } from "office-ui-fabric-react/lib/Link";
import styles from "./Alert.module.scss";

// Polyfill closest method. See https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  // @ts-ignore
  Element.prototype.matches =
    // @ts-ignore
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s: any) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

export default class Alert extends React.Component<IAlertProps, {}> {
  // Calls the editItem function with -1 to add a new item
  private _addBox() {
    this.props.editItem(-1);
  }

  private get _itemsToShow(): IAlertItemProps[] {
    return this.props.items.filter((item) => item.showItem);
  }

  /**
   * Walks up the DOM tree from the web part domElement and hides the `div.ControlZone` web part wrapper that adds padding and margins while in Display mode (otherwise this web part would still take up space on the page even though it is not showing any content).
   * This DOM manipulation is not supported or condoned by Microsoft, but it's the only option available for now. See https://sharepoint.uservoice.com/forums/329220-sharepoint-dev-platform/suggestions/33313174-make-it-possible-to-completely-hide-an-spfx-web-pa
   */
  private _removeWebPartMargins(): void {
    const webPartWrapper = this.props.domElement.closest(
      this.props.domSelector ? this.props.domSelector : ".ControlZone"
    );

    if (!webPartWrapper) {
      console.error(new Error(strings.SelectorErrorMessage));
      return;
    }

    if (this.props.displayMode === DisplayMode.Edit) {
      (webPartWrapper as HTMLElement).style.display = "block";
    } else {
      (webPartWrapper as HTMLElement).style.display = "none";
    }
  }

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
            <Customizer settings={{ theme: this.props.themeVariant }}>
              <ActionButton
                iconProps={{ iconName: "Add" }}
                onClick={this._addBox.bind(this)}
              >
                {strings.NewItemButton}
              </ActionButton>
            </Customizer>
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
                {this.props.displayMode === DisplayMode.Edit && (
                  <div>
                    <ActionButton
                      iconProps={{ iconName: "Edit" }}
                      onClick={this.props.editItem.bind(this, index)}
                      ariaLabel={strings.Edit}
                      title={strings.Edit}
                      className={styles.editButton}
                    />
                    <ActionButton
                      iconProps={{ iconName: "Delete" }}
                      onClick={this.props.deleteItem.bind(this, index)}
                      ariaLabel={strings.Delete}
                      title={strings.Delete}
                      className={styles.editButton}
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    );
  }
}
