export const DeviceWidth = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
};

export const Device = (width = 1536) => {
  return {
    SM: width > 0 && width <= DeviceWidth.SM,
    MD: width > DeviceWidth.SM && width <= DeviceWidth.MD,
    LG: width > DeviceWidth.MD && width <= DeviceWidth.LG,
    XL: width > DeviceWidth.LG && width <= DeviceWidth.XL,
    "2XL": width > DeviceWidth.XL && width <= DeviceWidth["2XL"],
    UNTIL_MD: width <= DeviceWidth.MD,
    UNTIL_LG: width <= DeviceWidth.LG,
    UNTIL_XL: width <= DeviceWidth.XL,
    UNTIL_2XL: width <= DeviceWidth["2XL"],
  };
};
