import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RulesComponent } from './rules/rules.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { HeaderComponent } from './header/header.component';
import { DialogContainerComponent } from './player-info-dialog/dialog-container/dialog-container.component';
import { DialogContentComponent } from './player-info-dialog/dialog-content/dialog-content.component';
import { FormsModule } from '@angular/forms';
import { PlayerInfoService } from './shared/player-info.service';
import { LeaderboardService } from './shared/leaderboard.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ShortNamePipe } from './shared/short-name.pipe';

const appRoutes:Routes = [
  { path: '', redirectTo: 'rules', pathMatch: 'full' },
  { path: 'rules', component: RulesComponent},
  { path: 'game-play', component: GamePlayComponent },
  {path: 'leaderboard', component: LeaderboardComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    GamePlayComponent,
    HeaderComponent,
    DialogContainerComponent,
    DialogContentComponent,
    LeaderboardComponent,
    ShortNamePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents: [
    DialogContentComponent,
    DialogContainerComponent
  ],
  providers: [
    PlayerInfoService,
    LeaderboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
