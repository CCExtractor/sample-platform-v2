import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'frontend-create-test-entry',
  templateUrl: './create-test-entry.component.html',
  styleUrls: ['./create-test-entry.component.scss'],
})
export class CreateTestEntryComponent implements OnInit {
  myForm = new FormGroup({
    command: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    category: new FormControl('', [Validators.required]),
    sample: new FormControl('', [Validators.required]),
  });

  public selectedValue: string;
  //TODO: it should not be hardcoded!
  public categories = [
    { value: 'broken', viewValue: 'Broken' },
    { value: 'cea-708', viewValue: 'CEA-708' },
    { value: 'dvb', viewValue: 'DVB' },
    { value: 'dvd', viewValue: 'DVR-MS' },
    { value: 'general', viewValue: 'General' },
    { value: 'hauppage', viewValue: 'Hauppage' },
    { value: 'mp4', viewValue: 'MP4' },
    { value: 'nocc', viewValue: 'NoCC' },
    { value: 'options', viewValue: 'Options' },
    { value: 'teletext', viewValue: 'Teletext' },
    { value: 'wtv', viewValue: 'WTV' },
    { value: 'xds', viewValue: 'XDS' },
  ];

  public options: string[] = [];
  public filteredOptions: Observable<string[]>;

  private selectedFiles: File[] = [];
  private formD: FormData;

  constructor(private service: UploadService) {}

  ngOnInit() {
    this.service.getSamples().subscribe((samples: any[]) => {
      this.options = samples.map((sample) => sample.filename);
      this.filteredOptions = this.myForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return this._filter(value);
        })
      );
    });

  
  }

  private _filter(value: unknown): string[] {
    const filterValue = (value as string).toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  openInput() {
    document.getElementById('uploadFile').click();
  }

  fileAdded(event) {
    if (event.target.files.length) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedFiles.push(<File>event.target.files[i]);
      }
    }
  }

  private upload() {
    this.formD = new FormData();
    this.formD.append('command', this.myForm.value.command);
    this.formD.append('sample', this.myForm.value.sample);
    this.formD.append('category', this.selectedValue);

    if (this.selectedFiles.length) {
      for (let i = 0; i < this.selectedFiles.length; i++)
        this.formD.append(
          'files[]',
          this.selectedFiles[i],
          this.selectedFiles[i].name
        );
    }
  }

  get f() {
    return this.myForm.controls;
  }

  submitToService() {
    this.upload();
    this.service.upload(this.formD);
  }
}
