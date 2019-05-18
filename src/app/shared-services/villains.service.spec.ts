import { TestBed, getTestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VillainsService } from './villains.service';
import { VILLAINS } from '../mock-heroes';
import { Villain } from '../models/villains';


describe('VillainsService', () => {
    let injector: TestBed;
    let service: VillainsService;
    let httpMock: HttpTestingController;
    let villainsList: Villain[] = VILLAINS;
    const dummyVillain = {
        id:99,
        name:"TestVillain"
    }

    beforeAll(() => {
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [VillainsService]
        });
        injector = getTestBed();
        service = injector.get(VillainsService);
        httpMock = injector.get(HttpTestingController);
    });

    describe('#SaveVillain', async () => {
        it('should return a 200', () => {

            service.addVillain(dummyVillain).subscribe(res => {
                expect(res.name).toBe('TestVillain');
            });

            const req = httpMock.expectOne('api/villains');
            expect(req.request.method).toBe('POST');
            req.flush(dummyVillain, { status: 200, statusText: 'Success' });
        });
    });

    describe('#getVillains', async () => {
        it('should return a 200', () => {

            service.getVillains().subscribe(res => {
                expect(res).toBe(villainsList);
            });

            const req = httpMock.expectOne('api/villains');
            expect(req.request.method).toBe('GET');
            req.flush(villainsList, { status: 200, statusText: 'Success' });
        });
    });

    describe('#deleteVillains', async () => {
        it('should return a 200', () => {

            service.deleteVillain(21).subscribe();

            const req = httpMock.expectOne('api/villains/21');
            expect(req.request.method).toBe('DELETE');
            
            req.flush({ status: 200, statusText: 'Success' });
        });
    });

    describe('#getVillain99', async () => {
        it('should return a 200', () => {

            service.getVillain(99).subscribe((res) => {
                expect(res).toBe(dummyVillain);
            });

            const req = httpMock.expectOne('api/villains/99');
            expect(req.request.method).toBe('GET');
            
            req.flush(dummyVillain,{ status: 200, statusText: 'Success' });
        });
    });

    afterEach(() => {
        httpMock.verify();
    });
});