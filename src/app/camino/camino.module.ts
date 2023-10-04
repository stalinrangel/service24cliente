import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CaminoComponent } from './camino.component'; 

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'https://service24es.com:3001', options: {} };
//const config: SocketIoConfig = { url: 'http://18.218.250.127:3001', options: {} };
//const config: SocketIoConfig = { url: 'http://service24.app/SocketServer/', options: {} };

const routes: Routes = [
  {
    path: '',
    component: CaminoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SocketIoModule.forRoot(config)
  ],
  declarations: [CaminoComponent],
  exports: [CaminoComponent],
})
export class CaminoComponentModule {}