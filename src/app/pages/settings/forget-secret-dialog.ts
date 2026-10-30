import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FdButton, FdDialogFrame, FdDialogRef } from '@phamelin/fuda';

@Component({
  selector: 'app-forget-secret-dialog',
  imports: [FdButton, FdDialogFrame],
  templateUrl: './forget-secret-dialog.html',
  encapsulation: ViewEncapsulation.None,
})
export class ForgetSecretDialog {
  protected readonly ref = inject<FdDialogRef<boolean>>(FdDialogRef);
}
