import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRegressionTestsComponent } from './containers/list-regression-tests/list-regression-tests.component';
import { RoutingModule } from './routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CreateRegressionTest } from './containers/create-regression-test/create-regression-test.component';
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
    ReactiveFormsModule
  ],
  declarations: [
    ListRegressionTestsComponent,
    ListRegressionTestsComponent,
    CreateRegressionTest,
  ],
  exports: [],
})
export class FrontendRegressionTestModule {}
