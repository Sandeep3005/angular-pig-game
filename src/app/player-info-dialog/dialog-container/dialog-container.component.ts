import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { PlayerInfoService } from './../../shared/player-info.service';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';


@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css']
})
export class DialogContainerComponent {

  @Output() onDialogClosed = new EventEmitter();
  
  constructor(
    private dialog: MatDialog,
    private playerService: PlayerInfoService
  ) { }

  ngOnInit() {
    setTimeout(() => this.openDialog(), 500);
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogContentComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      let players = [];
      for (let i = 0; i < result.totalPlayers; i++) {
        players.push(result[`player${i+1}Name`])
      }
      console.log(players);
      this.playerService.setPlayers(players);   
      this.onDialogClosed.emit()
    });
  }
}
