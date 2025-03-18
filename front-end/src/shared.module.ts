import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

const modules = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, DragDropModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
