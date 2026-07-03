export const ORIGIN = "https://datalumio-test34.web.app";
export const canon = (path) => {
   if (!path) return ORIGIN + "/";
   const clean = path === "/" ? "/" : path.replace(/\/$/, "");
   return `${ORIGIN}${clean}`;
};
