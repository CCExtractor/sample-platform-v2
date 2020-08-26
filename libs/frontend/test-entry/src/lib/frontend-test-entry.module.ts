import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPageComponent } from './containers/upload-page/upload-page.component';
import { CreateTestEntryComponent } from './components/create-test-entry/create-test-entry.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';
import { UploadService } from './services/upload.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete'

@NgModule({
  imports: [
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    MaterialFileInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [UploadPageComponent, CreateTestEntryComponent],

  providers: [UploadService],
})
export class FrontendTestEntryModule {}
