export type Game = {
  id:number;
  titre:string;
  enigmes: Enigme[];
}

export type Enigme = {
  photo:string;
  indice:string;
};