declare module '*.png' {
  const value: string;
  export default value;
}

//this file is used for importing CSS Modules with typeScript
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
