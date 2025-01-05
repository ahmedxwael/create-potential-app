// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericObject = Record<string, any>;

export type AppInfo = {
  name: string;
  path: string;
  type: AppType;
};

export type AppType = "next" | "remix";
