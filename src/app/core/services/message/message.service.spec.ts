import {
  inject,
  TestBed,
} from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService],
    });
    messageService = TestBed.get(MessageService);
  });

  it('should create', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should add a message on add', () => {
    const fixture = '1';

    messageService.add(fixture);
    expect(messageService.messages[0]).toEqual(fixture);
  });

  it('should remove all on clear', () => {
    messageService.add('1');
    messageService.add('2');
    messageService.clear();

    expect(messageService.messages).toEqual([]);
  });
});
