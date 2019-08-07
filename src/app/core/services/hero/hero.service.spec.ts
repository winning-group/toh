import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  inject,
  TestBed,
} from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpRequest } from '@angular/common/http';

describe('HeroService', () => {
  let heroService: HeroService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService],
    });
    heroService = TestBed.get(HeroService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getHeroes', () => {
    it('should return a list on success', () => {
      const fixture = [
        { id: 11, name: 'a' },
        { id: 12, name: 'b' },
      ];

      const subscription = heroService.getHeroes().subscribe(res => {
        expect(res).toBe(fixture);
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/heroes');
        expect(req.method).toEqual('GET');
        return true;
      });

      request.flush(fixture);
      http.verify();
      subscription.unsubscribe();
    });

    it('should return an error on failure', () => {
      const subscription = heroService.getHeroes().subscribe(res => {
        expect(res).toEqual([]);
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/heroes');
        expect(req.method).toEqual('GET');
        return true;
      });

      request.flush(
        { message: 'error' },
        { status: 500, statusText: 'getHeroes Error' },
      );

      http.verify();
      subscription.unsubscribe();
    });
  });

  describe('#getHero', () => {
    it('should return a hero on success', () => {
      const fixture = {
        id: 11,
        name: 'test',
      };

      const subscription = heroService.getHero(11).subscribe(res => {
        expect(res).toEqual(fixture);
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/heroes/11');
        expect(req.method).toEqual('GET');
        return true;
      });

      request.flush(fixture);
      http.verify();
      subscription.unsubscribe();
    });

    it('should return an error on failure', () => {
      const subscription = heroService.getHero(11).subscribe(res => {
        expect(res).toBeUndefined();
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/heroes/11');
        expect(req.method).toEqual('GET');
        return true;
      });

      request.flush(
        { message: 'error' },
        { status: 404, statusText: 'getHero Error' },
      );
      http.verify();
      subscription.unsubscribe();
    });
  });

  describe('#addHero', () => {
    it('should add a hero on success', () => {
      const fixture = {
        id: 11,
        name: 'test',
      };

      const subscription = heroService.addHero(fixture).subscribe(res => {
        expect(res).toEqual(fixture);
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/heroes');
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

      const subscription = heroService.addHero(fixture).subscribe(res => {
        expect(res).toBeUndefined();
      });

      const request = http.expectOne((req: HttpRequest<any>): boolean => {
        expect(req.url).toEqual('api/heroes');
        expect(req.method).toEqual('POST');
        return true;
      });

      request.flush(
        { message: 'error' },
        { status: 500, statusText: 'addHero Error' },
      );
      http.verify();
      subscription.unsubscribe();
    });
  });

  describe('#deleteHero', () => {
    it('should request delete on success', () => {
      const subscription1 = heroService.getHeroes().subscribe();

      const request1 = http.expectOne(() => true);

      request1.flush([
        { id: 11, name: 'a' },
        { id: 12, name: 'b' },
      ]);

      const subscription2 = heroService.deleteHero(11).subscribe();

      const request2 = http.expectOne((req: HttpRequest<any>) => {
        expect(req.url).toEqual('api/heroes/11');
        expect(req.method).toEqual('DELETE');
        return true;
      });

      request2.flush(null, { status: 200, statusText: 'Success' });

      subscription1.unsubscribe();
      subscription2.unsubscribe();
    });
  });

  describe('#updateHero', () => {
    it('should request update on success', () => {
      const subscription1 = heroService.getHeroes().subscribe();

      const request1 = http.expectOne(() => true);

      request1.flush([
        { id: 11, name: 'a' },
        { id: 12, name: 'b' },
      ]);

      const subscription2 =
        heroService.updateHero({ id: 11, name: 'c' }).subscribe();

      const request2 = http.expectOne((req: HttpRequest<any>) => {
        expect(req.url).toEqual('api/heroes');
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
