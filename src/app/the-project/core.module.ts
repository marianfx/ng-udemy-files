import { NgModule } from "@angular/core";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

// services don't need to also be exported
@NgModule({
  providers: [
    RecipesResolverService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
})
export class CoreModule {

}
