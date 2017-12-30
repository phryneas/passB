import {Button, List, ListItem, ListItemText, Popover} from 'material-ui';
import {Warning} from 'material-ui-icons';
import * as React from 'react';
import {connect} from 'react-redux';
import {lt, valid} from 'semver';
import {latestHostAppVersion} from 'Constants';
import {StoreContents} from 'InjectableInterfaces/State';
import {getVersion} from 'State/HostApp/index';

export interface Props {
  visible: boolean;
  hostAppVersion: string;
}

export interface State {
  open: boolean;
}

export class HostAppVersionInfoComponent extends React.Component<Props, State> {
  public state: State = {
    open: false,
  };

  private button: HTMLButtonElement;

  public render(): JSX.Element[] | false {
    const {visible, hostAppVersion} = this.props;
    const {open} = this.state;

    if (!visible) {
      return false;
    }

    return [(
      <Button
        rootRef={(button: HTMLButtonElement) => this.button = button}
        key="btn"
        color="accent"
        onClick={() => this.setState({open: true})}
      >
        <Warning/>
      </Button>
    ),      (
      <Popover
        key="popover"
        anchorEl={this.button}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={() => this.setState({open: false})}
      >
            <List>
              <ListItem>
                <ListItemText primary={browser.i18n.getMessage('popup_host_app_nag_update', [hostAppVersion, latestHostAppVersion])} />
              </ListItem>
              <ListItem
                button={true}
                className="hostAppInfo"
                onClick={() => browser.tabs.create({url: 'https://passb.github.io/host_application.html'})}
              >
                <ListItemText primary={browser.i18n.getMessage('popup_host_app_error_option_install')}/>
              </ListItem>
            </List>
      </Popover>
    )];
  }
}

export const mapStateToProps = (state: StoreContents): Props => {
  const version = getVersion(state);
  return {
    hostAppVersion: version,
    visible: valid(version) !== null && lt(version, latestHostAppVersion),
  };
};

export const HostAppVersionInfo = connect(mapStateToProps)(HostAppVersionInfoComponent);
