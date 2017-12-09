import { Player } from "./player.modal";


export class PlayerInfoService {
  players: Array<Player>

  setPlayers(player) {
    this.players = player;
  }

  getPlayers() {
    return this.players.slice();
  }
}