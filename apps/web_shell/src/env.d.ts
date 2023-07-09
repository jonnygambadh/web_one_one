declare module "sidebar/Main" {
  interface MountOptions {
    sdk: {
      sentry: {
        span:any;
        transaction: any
      }
      };
    };

  export declare function mount(
    element: HTMLElement,
    options: MountOptions,
  ): void;
}
