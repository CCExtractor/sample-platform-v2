import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTestEntryComponent } from './components/create-test-entry/create-test-entry.component';
import { UploadService } from './services/upload.service';

const routes: Routes = [
  { path: 'create-test-entry', component: CreateTestEntryComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class RoutingModule {}
