export type AppInfo = {
  name: string;
  path: string;
  type: AppType;
};

export type AppType = "next" | "remix";
