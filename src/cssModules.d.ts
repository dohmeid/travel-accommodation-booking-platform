//this file is used for importing CSS Modules with typeScript
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}