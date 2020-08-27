import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTestEntryComponent } from './components/create-test-entry/create-test-entry.component';
import { UploadService } from './services/upload.service';
import { UploadPageComponent } from './containers/upload-page/upload-page.component';

const routes: Routes = [
  { path: 'create', component: UploadPageComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class RoutingModule {}
