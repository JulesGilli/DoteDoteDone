import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const modules = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule {}
