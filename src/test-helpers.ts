import { ElementRef } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
export module TestHelpers {

    export const windowUrl = 'http://localhost/index.html'; // fake  url

    /**
     * Utility method to create test components with any html
     */
    export const createGenericTestComponent =
        <T>(html: string, detectChanges: boolean, type: { new (...sArgs: any[]): T }): ComponentFixture<T> => {
            TestBed.overrideComponent(type, { set: { template: html } });
            const fixture = TestBed.createComponent(type);
            if (detectChanges) {
                fixture.detectChanges();
            }
            return fixture as ComponentFixture<T>;
        };

    /**
     * Utility method to create mock JSON responses
     */
    export const mockJsonResponse = (mockBackend: MockBackend, data: any) => {

        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(data)
            })));
        });
    };

    /**
     * Utility method to create mock Text responses
     */
    export const mockTextResponse = (mockBackend: MockBackend, data: any) => {

        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: data
            })));
        });
    };

    /**
     * Utility method to create mock Error responses
     */
    export const mockErrorResponse = (mockBackend: MockBackend, err?: Error) => {

        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockError(err);
        });
    };


    /**
     * Mock ElementRef for injection in tests
     */
    export class MockElementRef extends ElementRef { }

    /**
     * Mock WindowService  for injection in tests
     */
    export class MockWindowService {

        mockNativeWindow = {
            location: { href: windowUrl },
            open: jasmine.createSpy('open').and.callFake((url?: string, target?: string, features?: string, replace?: boolean): any => {
                return {
                    closed: true // window is closed
                };
            }),
            setInterval: jasmine.createSpy('setInterval').and.callFake((handler: (...args: any[]) => void, timeout: number) => {
                handler();
                return 1; // fake handle
            }),
            clearInterval: jasmine.createSpy('clearInterval').and.callFake((handle: number): void => { })
        };

        get nativeWindow() {
            return this.mockNativeWindow;
        }

    }
}
