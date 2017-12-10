import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    public snackBar: MatSnackBar) { }

    getInputTimeout: any = 100;
    basicPlayerInfo;

    ngOnInit() {
      this.basicPlayerInfo = {
        totalPlayers: 1,
        player1Name: 'Player 1',
      }
    }

  onSubmit(playerForm) {
    let { totalPlayers, playerName1, playerName2 } = playerForm.value;
    this.basicPlayerInfo.player1Name = playerName1;
    if (playerName2) this.basicPlayerInfo.player2Name = playerName2;
    this.dialogRef.close(this.basicPlayerInfo);
  }

  openSnackBar() {
    this.snackBar.open('Please provide correct number of players', '', { duration: 2000 });
  }

  onTotalPlayerChange(totalPlayerInput) {
    clearTimeout(this.getInputTimeout)
    this.getInputTimeout = setTimeout(()=> {
      let value = +totalPlayerInput.value;
      if (!Number.isInteger(value) || value > 2 || value < 1) {
        return this.openSnackBar();
      }
      this.basicPlayerInfo.totalPlayers = totalPlayerInput.value;
    }, 600)
  }
}
