import {shallow} from 'enzyme';
import * as React from 'react';

jest.mock('Constants', () => ({
  latestHostAppVersion: '1.5.1',
}));

import {mapStateToProps, HostAppVersionInfoComponent} from 'Popup/Components/HostAppVersionInfo';
import {reducer, Actions} from 'State/HostApp';

import {} from 'Constants';
import {StoreContents} from 'InjectableInterfaces/State';

describe('HostAppVersionInfo', () => {
  describe('HostAppVersionInfoComponent', () => {
    it('renders empty on visible=false', () => {
      expect(shallow(
        <HostAppVersionInfoComponent visible={false} hostAppVersion={'unknown'}/>,
      )).toMatchSnapshot();
    });

    describe('visible', () => {
      it('renders', () => {
        expect(shallow(
          <HostAppVersionInfoComponent visible={true} hostAppVersion={'1.4.9'}/>,
        )).toMatchSnapshot();
      });
    });
  });
});

describe('mapStateToProps', () => {
  it('installed version: unknown', () => {
    const state = {hostApp: reducer(undefined!, {type: 'other'})};
    expect(mapStateToProps(state as StoreContents)).toMatchSnapshot();
  });

  it('installed version: lower', () => {
    const state = {hostApp: reducer(undefined!, Actions.setVersion('1.5.0'))};
    expect(mapStateToProps(state as StoreContents)).toMatchSnapshot();
  });

  it('installed version: current', () => {
    const state = {hostApp: reducer(undefined!, Actions.setVersion('1.5.1'))};
    expect(mapStateToProps(state as StoreContents)).toMatchSnapshot();
  });

  it('installed version: higher', () => {
    const state = {hostApp: reducer(undefined!, Actions.setVersion('1.5.2'))};
    expect(mapStateToProps(state as StoreContents)).toMatchSnapshot();
  });
});
