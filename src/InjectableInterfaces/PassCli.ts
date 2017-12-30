export interface PassCli {
  list(): Promise<string[]>;
  show(path: string): Promise<string[]>;
  getHostAppVersion(): Promise<string>;
}
