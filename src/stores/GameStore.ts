import { defineStore } from "pinia";
import { Game } from "../types/game";
import gameData from '../assets/games/games.json';

export const useGameStore = defineStore('game', {
  state: () => ({
    games: <Game[]>[],
    selected: <Game | null>null,
  }),
  getters: {
    getGames(state) {
      return state.games;
    },
    getSelected(state) {
      return state.selected;
    }
  },
  actions: {
    fetchGames() {
      this.games = gameData;
    },
    setSelected(game: Game | null) {
      this.selected = game;
    }
  }
});