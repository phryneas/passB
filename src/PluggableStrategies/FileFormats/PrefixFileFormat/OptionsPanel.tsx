import {Checkbox, FormControl, FormControlLabel, TextField} from 'material-ui';
import * as React from 'react';
import {OptionPanelProps} from 'Options/OptionsReceiver';
import {Options} from './PrefixFileFormat';

export function OptionsPanel({options, updateOptions}: OptionPanelProps<Options>): JSX.Element {
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={options.passwordFirstLine}
            onChange={(event: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
              updateOptions({
                ...options,
                passwordFirstLine: isChecked,
              });
            }}
          />
        }
        label="Password is in first line (without prefix)"
      />
      <TextField
        id="passwordPrefix"
        label="PasswordPrefix"
        value={options.passwordPrefix}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          updateOptions({
            ...options,
            passwordPrefix: event.target.value,
          });
        }}
        disabled={options.passwordFirstLine}
      />
      <TextField
        id="passwordPrefix"
        label="PasswordPrefix"
        value={options.usernamePrefix}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          updateOptions({
            ...options,
            usernamePrefix: event.target.value,
          });
        }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={options.trimWhitespace}
            onChange={(event: React.ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
              updateOptions({
                ...options,
                trimWhitespace: isChecked,
              });
            }}
          />
        }
        label="Trim whitespace"
      />
    </FormControl>
  );
}