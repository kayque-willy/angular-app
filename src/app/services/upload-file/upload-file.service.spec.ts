import { TestBed } from '@angular/core/testing';

import { UploadFileService } from './upload-file.service';

describe('UploadFile.Service', () => {
  let service: UploadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
