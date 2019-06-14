import { FooterPage } from './../../footer/footer.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPage } from './../../header/header.page';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [HeaderPage, FooterPage],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[HeaderPage, FooterPage,  CommonModule]
})
export class SharedModule { }
