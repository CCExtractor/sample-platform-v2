import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTestRunsComponent } from './containers/list-test-runs/list-test-runs.component';

const routes: Routes = [{ path: 'list', component: ListTestRunsComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
