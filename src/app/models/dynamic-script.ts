/**
 * Expose a model for dynamic scripts
 * @exports DynamicScript
 * @interface
 */
export interface DynamicScript {
  name: string;
  src: string;
}

/**
 * Exposes a const with all dynamic scripts
 * @exports scriptStore
 * @const
 */
export const scriptStore: DynamicScript[] = [
  { name: 'dynamsoft-initiate', src: 'assets/dynamsoft.webtwain.initiate.js' },
  { name: 'dynamsoft-config', src: 'assets/dynamsoft.webtwain.config.js' },
  { name: 'dynamsoft-web-twain', src: '.assets/dynamsoft.webtwain.install.js' },
  { name: 'dynamsoft-web-twain2', src: '../node_modules/dwt/dist/dynamsoft.webtwain.min.js'}
];
