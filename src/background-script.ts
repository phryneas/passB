import {executionContext} from 'Constants';
import {container, Interfaces, Symbols} from 'Container';
import {setExecutionContext} from 'Decorators/ExecuteInContext';
import {clearLastError, setVersion} from 'State/HostApp/index';

setExecutionContext(executionContext.background);

const state = container.get<Interfaces.State>(Symbols.State);
state.hydrated.then(() => {
  state.getStore().dispatch(clearLastError(void 0));
  container.get<Interfaces.PassB>(Symbols.PassB).reloadEntries();

  container.get<Interfaces.PassCli>(Symbols.PassCli).getHostAppVersion().then(
    (newVersion: string) => state.getStore().dispatch(setVersion(newVersion)),
  );
});
