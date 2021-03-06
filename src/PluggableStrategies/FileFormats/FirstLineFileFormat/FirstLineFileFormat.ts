import {injectable} from 'inversify';
import {OptionsPanelType} from 'InjectableInterfaces/OptionsPanel';
import {StrategyName} from 'State/Interfaces';
import {createTypedMap, TypedMap} from 'State/Types/TypedMap';
import {FileFormat} from '../';
import {OptionsPanel} from './OptionsPanel';

export type UsernameStyle = 'None' | 'SecondLine' | 'LastPathPart';

export interface Options {
  usernameStyle: UsernameStyle;
}

@injectable()
export class FirstLineFileFormat extends FileFormat<Options> {
  public readonly OptionsPanel: OptionsPanelType<Options> = OptionsPanel;
  public readonly name: StrategyName = 'FirstLineFileFormat';
  public readonly defaultOptions: TypedMap<Options> =  createTypedMap({
    usernameStyle: 'SecondLine' as UsernameStyle,
  });

  public getPassword(lines: string[], entryName: string): string | undefined {
    return lines[0];
  }

  public getUsername(lines: string[], entryName: string): string | undefined {
    switch (this.options.get('usernameStyle')) {
      case 'SecondLine':
        return lines[1];
      case 'LastPathPart':
        return entryName.split(/[/\\]/).pop();
      default:
        return void 0;
    }
  }
}
