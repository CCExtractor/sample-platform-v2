import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegressionTestComponent } from './containers/create-regression-test/create-regression-test.component';

const routes: Routes = [{ path: '', component: CreateRegressionTestComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}