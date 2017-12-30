import {createSelector} from 'reselect';
import {actionCreatorFactory} from 'typescript-fsa';
import {reducerWithInitialState} from 'typescript-fsa-reducers';
import {StoreContents} from 'InjectableInterfaces/State';
import {getHostApState} from 'State/Selectors';

// interfaces
export interface Error {
  message: string;
  type: ErrorType;
}

export interface HostAppState {
  version: string;
  lastError?: Error;
}

export enum ErrorType {
  PASS_EXECUTION_ERROR = 'PASS_EXECUTION_ERROR',
  HOST_APP_ERROR = 'HOST_APP_ERROR',
}

// actions
const actionCreator = actionCreatorFactory('HOST_APP');
export const setVersion = actionCreator<string>('SET_VERSION');
export const setLastError = actionCreator<Error>('SET_LAST_ERROR');
export const clearLastError = actionCreator<void>('CLEAR_LAST_ERROR');

export const Actions = {
  setVersion,
  setLastError,
  clearLastError,
};

// reducer
export const initialState = {
  version: 'unknown',
};
export const reducer = reducerWithInitialState(initialState)
  .case(setVersion, (state: HostAppState, version: string): HostAppState => ({...state, version}))
  .case(setLastError, (state: HostAppState, lastError: Error): HostAppState => ({...state, lastError}))
  .case(clearLastError, ({lastError, ...stateRest}: HostAppState): HostAppState => stateRest)
  .build();

// selectors
export const getLastError: (state: StoreContents) => Error | undefined =
  createSelector(getHostApState, (state: HostAppState) => state.lastError);

export const getVersion: (state: StoreContents) => string =
  createSelector(getHostApState, (state: HostAppState) => state.version);
