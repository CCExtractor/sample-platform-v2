import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRegressionTestComponent } from './containers/create-regression-test/create-regression-test.component';
import { RoutingModule } from './routing.module'
import { MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [CommonModule, RoutingModule,  MatTableModule],
  declarations: [CreateRegressionTestComponent],
  exports: [MatTableModule]
})
export class FrontendRegressionTestModule {}
