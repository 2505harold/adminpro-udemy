export class Usuario {
  // public nombre: string

  // constructor(nombre: string) {

  // }

  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public _id?: string
  ) {}
}
