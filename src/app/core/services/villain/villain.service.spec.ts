import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  inject,
  TestBed,
} from '@angular/core/testing';

import { VillainService } from './villain.service';
import { HttpRequest } from '@angular/common/http';

describe('VillainService', () => {
  let villainService: VillainService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VillainService],
    });
    villainService = TestBed.get(VillainService);
    http = TestBed.get(HttpTestingController);
  });

  it('should create', inject([VillainService], (service: VillainService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getVillains', () => {
    it('should return a list on success', () => {
      const fixture = [
        { id: 11, name: 'a' },
        { id: 12, name: 'b' },
      ];

      const subscription = villainService.getVillains().subscribe(res => {
        expect(res).toBe(fixture);
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/villains');
        expect(req.method).toEqual('GET');
        return true;
      });

      request.flush(fixture);
      http.verify();
      subscription.unsubscribe();
    });

    it('should return an error on failure', () => {
      const subscription = villainService.getVillains().subscribe(res => {
        expect(res).toEqual([]);
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/villains');
        expect(req.method).toEqual('GET');
        return true;
      });

      request.flush(
        { message: 'error' },
        { status: 500, statusText: 'getVillains Error' },
      );

      http.verify();
      subscription.unsubscribe();
    });
  });

  describe('#getVillain', () => {
    it('should return a villain on success', () => {
      const fixture = {
        id: 11,
        name: 'test',
      };

      const subscription = villainService.getVillain(11).subscribe(res => {
        expect(res).toEqual(fixture);
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/villains/11');
        expect(req.method).toEqual('GET');
        return true;
      });

      request.flush(fixture);
      http.verify();
      subscription.unsubscribe();
    });

    it('should return an error on failure', () => {
      const subscription = villainService.getVillain(11).subscribe(res => {
        expect(res).toBeUndefined();
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/villains/11');
        expect(req.method).toEqual('GET');
        return true;
      });

      request.flush(
        { message: 'error' },
        { status: 404, statusText: 'getVillain Error' },
      );
      http.verify();
      subscription.unsubscribe();
    });
  });

  describe('#addVillain', () => {
    it('should add a villain on success', () => {
      const fixture = {
        id: 11,
        name: 'test',
      };

      const subscription = villainService.addVillain(fixture).subscribe(res => {
        expect(res).toEqual(fixture);
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/villains');
        expect(req.method).toEqual('POST');
        return true;
      });

      request.flush(fixture);
      http.verify();
      subscription.unsubscribe();
    });

    it('should return an error on failure', () => {
      const fixture = {
        id: 11,
        name: 'test',
      };

      const subscription = villainService.addVillain(fixture).subscribe(res => {
        expect(res).toBeUndefined();
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/villains');
        expect(req.method).toEqual('POST');
        return true;
      });

      request.flush(
        { message: 'error' },
        { status: 500, statusText: 'addVillain Error' },
      );
      http.verify();
      subscription.unsubscribe();
    });
  });

  describe('#deleteVillain', () => {
    it('should request delete on success', () => {
      const subscription1 = villainService.getVillains().subscribe();

      const request1 = http.expectOne(() => true);

      request1.flush([
        { id: 11, name: 'a' },
        { id: 12, name: 'b' },
      ]);

      const subscription2 = villainService.deleteVillain(11).subscribe();

      const request2 = http.expectOne((req: HttpRequest<any>) => {
        expect(req.url).toEqual('api/villains/11');
        expect(req.method).toEqual('DELETE');
        return true;
      });

      request2.flush(null, { status: 200, statusText: 'Success' });

      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });
  });

  describe('#updateVillain', () => {
    it('should request update on success', () => {
      const subscription1 = villainService.getVillains().subscribe();

      const request1 = http.expectOne(() => true);

      request1.flush([
        { id: 11, name: 'a' },
        { id: 12, name: 'b' },
      ]);

      const subscription2 =
        villainService.updateVillain({ id: 11, name: 'c' }).subscribe();

      const request2 = http.expectOne((req: HttpRequest<any>) => {
        expect(req.url).toEqual('api/villains');
        expect(req.method).toEqual('PUT');
        expect(req.body).toEqual({ id: 11, name: 'c' });
        return true;
      });

      request2.flush(null, { status: 200, statusText: 'Success' });

      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });
  });
});
