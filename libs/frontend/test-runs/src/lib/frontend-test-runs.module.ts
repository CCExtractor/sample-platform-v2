import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTestRunsComponent } from './containers/list-test-runs/list-test-runs.component';
import { RoutingModule } from './routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ListTestRunsComponent],
})
export class FrontendTestRunsModule {}
