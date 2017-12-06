import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RulesComponent } from './rules/rules.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { HeaderComponent } from './header/header.component';

const appRoutes:Routes = [
  { path: '', redirectTo: 'rules', pathMatch: 'full' },
  { path: 'rules', component: RulesComponent},
  { path: 'game-play', component: GamePlayComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    GamePlayComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
