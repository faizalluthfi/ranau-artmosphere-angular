import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './examples/dashboard/dashboard.component';
import { UserComponent }   from './examples/user/user.component';
import { TableComponent }   from './examples/table/table.component';
import { TypographyComponent }   from './examples/typography/typography.component';
import { IconsComponent }   from './examples/icons/icons.component';
import { MapsComponent }   from './examples/maps/maps.component';
import { NotificationsComponent }   from './examples/notifications/notifications.component';
import { UpgradeComponent }   from './examples/upgrade/upgrade.component';
import { QuitComponent } from './shared/quit/quit.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { NewCategoryComponent } from './categories-list/new-category/new-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './categories-list/edit-category/edit-category.component';
import { ServicesInputsComponent } from './services-inputs/services-inputs.component';
import { NewMaterialComponent } from './materials-list/new-material/new-material.component';
import { EditMaterialComponent } from './materials-list/edit-material/edit-material.component';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { SettingComponent } from './setting/setting.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionComponent } from './transactions-list/transaction/transaction.component';
import { PaddingPipe } from './pipes/padding.pipe';
import { TransactionNoteComponent } from './transactions-list/transaction/transaction-note/transaction-note.component';
import { DatePipe, DecimalPipe, registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { DailyUsesListComponent } from './daily-uses-list/daily-uses-list.component';
import { DailyUseFormComponent } from './daily-uses-list/daily-use-form/daily-use-form.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BusinessReportComponent } from './business-report/business-report.component';
import { BackupAndRestoreComponent } from './backup-and-restore/backup-and-restore.component';
import { AgGridModule } from 'ag-grid-angular';
import { NotificationComponent } from './shared/notification/notification.component';
import { ListAutoHeightDirective } from './directives/list-auto-height.directive';
import { FormAutoHeightDirective } from './directives/form-auto-height.directive';
import { TransactionFormAutoHeightDirective } from './directives/transaction-form-auto-height.directive';
import { ReportCategoriesComponent } from './report-categories/report-categories.component';
import { ReportCategoryFormComponent } from './report-categories/report-category-form/report-category-form.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';

registerLocaleData(localeId, 'id');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    QuitComponent,
    CategoriesListComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    ServicesInputsComponent,
    NewMaterialComponent,
    EditMaterialComponent,
    MaterialsListComponent,
    SettingComponent,
    TransactionsListComponent,
    TransactionComponent,
    PaddingPipe,
    TransactionNoteComponent,
    DailyUsesListComponent,
    DailyUseFormComponent,
    BusinessReportComponent,
    BackupAndRestoreComponent,
    NotificationComponent,
    ListAutoHeightDirective,
    FormAutoHeightDirective,
    TransactionFormAutoHeightDirective,
    ReportCategoriesComponent,
    ReportCategoryFormComponent,
    UsersComponent,
    UserFormComponent,
    LoginComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: 'id'
    },
    DatePipe,
    DecimalPipe,
    PaddingPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
