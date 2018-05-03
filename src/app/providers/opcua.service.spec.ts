import { TestBed, inject } from '@angular/core/testing';

import { OpcuaService } from './opcua.service';

describe('OpcuaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpcuaService]
    });
  });

  it('should be created', inject([OpcuaService], (service: OpcuaService) => {
    expect(service).toBeTruthy();
  }));
});
