import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { NgTemplateOutletComponent } from '../ng-template-outlet/ng-template-outlet.component';
import { WeatherCustomActionComponent } from '../ng-template-outlet/weather-custom-action/weather-custom-action.component';
import { LazyDialogService } from 'src/app/core/services/lazy-dialog.service';
import { AkUsersComponent } from 'ak-users';
import { DialogService } from 'src/app/core/services/dialog.service';
import { lastValueFrom } from 'rxjs';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule,MaterialModule,NgTemplateOutletComponent,WeatherCustomActionComponent,AkUsersComponent],
})
export class HomeComponent {
  lazyDialogService = inject(LazyDialogService);
  dialogService = inject(DialogService);
  data = {
    name:'aamir'
  }
  async yesNoDialog() {
   const result = await lastValueFrom(this.dialogService.confirmDialog({
      title: 'Title',
      message: 'Are you sure you want to do this?',
      confirmText: 'Yes',
      cancelText: 'No',
    }));

    console.log(result);
  }

  async confirmCancel() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.position = {
      top:'10%'
    }
    const result = await lastValueFrom(this.dialogService.confirmDialog({
      title: 'Please confirm action',
      message: 'Please confirm whether you want to do this!',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
    },dialogConfig));

    console.log(result)
  }

  async yesNotSure() {
    const result = await lastValueFrom(this.dialogService.confirmDialog({
      title: 'Are you sure?',
      message: 'Are you sure you want to do this?',
      confirmText: 'Yes',
      cancelText: 'Not sure!',
    }));
    console.log(result)
  }

  async openDynamicComponent() {
    const data = await this.lazyDialogService.openDialog('lazy-dialog',this.data);
    console.log(data);
  }
}
