import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppModule as AppTheBasicsModule } from './the-basics/app.module';
import { AppModule as AppComponentsDatabindingModule } from './components-databinding/app.module';
import { AppModule as AppDirectivesModule } from './directives/app.module';
import { AppModule as AppServicesModule } from './services/app.module';
import { AppModule as AppRoutingModule } from './routing/app.module';
import { AppModule as AppObservablesModule } from './observables/app.module';
import { AppModule as AppFormsTemplateDrivenModule } from './forms-template-driven/app.module';
import { AppModule as AppFormsReactiveModule } from './forms-reactive/app.module';
import { AppModule as AppPipesModule } from './pipes/app.module';
import { AppModule as AppHttpModule } from './http/app.module';
import { AppModule as AppAnimationsModule } from './animations/app.module';
import { AppModule as AppUnitTestsModule } from './unit-tests/app.module';
import { AppModule as AppAssignment1Module } from './assignment-1/app.module';
import { AppModule as AppAssignment2Module } from './assignment-2/app.module';
import { AppModule as AppAssignment3Module } from './assignment-3/app.module';
import { AppModule as AppAssignment4Module } from './assignment-4/app.module';
import { AppModule as AppAssignment5Module } from './assignment-5/app.module';
import { AppModule as AppAssignment6Module } from './assignment-6/app.module';
import { AppModule as AppAssignment7Module } from './assignment-7/app.module';
import { AppModule as AppAssignment8Module } from './assignment-8/app.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppTheBasicsModule,
    AppComponentsDatabindingModule,
    AppDirectivesModule,
    AppServicesModule,
    AppRoutingModule,
    AppObservablesModule,
    AppFormsTemplateDrivenModule,
    AppFormsReactiveModule,
    AppPipesModule,
    AppHttpModule,
    AppAnimationsModule,
    AppUnitTestsModule,
    AppAssignment1Module,
    AppAssignment2Module,
    AppAssignment3Module,
    AppAssignment4Module,
    AppAssignment5Module,
    AppAssignment6Module,
    AppAssignment7Module,
    AppAssignment8Module
  ],
  exports: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
