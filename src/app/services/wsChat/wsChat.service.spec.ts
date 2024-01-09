import { TestBed } from '@angular/core/testing';

import { WsChat } from './wsChat.service'

describe('WsService', () => {
  let service: WsChat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsChat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
