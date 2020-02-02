import { TestBed } from "@angular/core/testing";
import { BaseAuthService } from "./base-auth-service";

describe("BaseAuthService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: BaseAuthService = TestBed.get(BaseAuthService);
        expect(service).toBeTruthy();
    });
});
