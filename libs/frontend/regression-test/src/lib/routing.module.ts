import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRegressionTestsComponent } from './containers/list-regression-tests/list-regression-tests.component';
import { CreateRegressionTest } from './containers/create-regression-test/create-regression-test.component';

const routes: Routes = [{ path: 'list', component: ListRegressionTestsComponent }, {path: 'create', component: CreateRegressionTest}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}