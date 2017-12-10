import {injectable} from 'inversify';
import {RouteProps} from 'react-router';
import {executionContext} from 'Constants';
import {Interfaces, Symbols} from 'Container';
import {lazyInject} from 'Decorators/lazyInject';
import {executeInCorrectContext, AsynchronousCallable} from 'Decorators/ExecuteInContext';
import {OptionsPanelType} from 'InjectableInterfaces/OptionsPanel';
import {createTypedMap} from 'State/Types/TypedMap';
import {Extension} from '.';

interface Options {
}

const COPY_ACTION = 'copy';

@AsynchronousCallable()
@injectable()
export class ClipboardExtension extends Extension<Options> {
  public readonly routes: RouteProps[] = [];
  public readonly actions: string[] = [COPY_ACTION];
  public readonly OptionsPanel?: OptionsPanelType<Options> = void 0;

  @lazyInject(Symbols.PassB)
  private passB: Interfaces.PassB;

  @lazyInject(Symbols.PassCli)
  private passCli: Interfaces.PassCli;

  public constructor() {
    super('Clipboard', createTypedMap({}));
  }

  public async initializeList(): Promise<void> {
    this.setEntries(
      (await this.passCli.list())
        .filter((fullPath: string) => fullPath !== '' && !fullPath.endsWith('/'))
        .map((fullPath: string) => ({fullPath, action: 'copy'})),
    );
  }

  public getLabelForAction(action: string): string | undefined {
    switch (action) {
      case COPY_ACTION:
        return 'extension_clipboard_action_copy';
    }
  }

  public executeAction(action: string, entry: string): void {
    if (action === COPY_ACTION) {
      this.executeCopyAction(entry);
      window.close();
    }
  }
  @executeInCorrectContext(executionContext.background)
  private async executeCopyAction(entry: string): Promise<{}> {
    // call `pass show $entry` on the command line
    const entryContents = await this.passCli.show(entry);
    // extract password from returned contents
    const password = this.passB.getFileFormat().getPassword(entryContents, entry);

    // get the currently opened tab
    const currentTab = (await browser.tabs.query({active: true, currentWindow: true}))[0];
    // stringify the writeToClipBoard function
    const code = `(${writeToClipboard.toString()}).apply(null, JSON.parse(${JSON.stringify(JSON.stringify([password]))}));`;
    // execute it in the currently opened tab
    return browser.tabs.executeScript(currentTab.id, {code});
  }
}

function writeToClipboard(contents: string): void {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.value = contents;
  input.select();
  document.execCommand('copy');
  input.blur();
  document.removeChild(input);
}
