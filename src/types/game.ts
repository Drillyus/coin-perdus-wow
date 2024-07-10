export type Game = {
  id:number;
  titre:string;
  enigmes: Enigme[];
}

export type Enigme = {
  id:number;
  indice:string;
}