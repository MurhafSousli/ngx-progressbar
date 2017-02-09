import { TestBed, inject } from '@angular/core/testing';
import { NgProgressService } from './progress.service';

describe('Service: ProgressService, Angular Tests', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [NgProgressService] });
    });

    it('should inject the service instance...', inject([NgProgressService], (service: NgProgressService) => {
        expect(service).toBeTruthy();
    }));

});
