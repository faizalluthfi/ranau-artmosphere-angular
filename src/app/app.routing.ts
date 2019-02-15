import { Routes } from '@angular/router';

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
import { EditCategoryComponent } from './categories-list/edit-category/edit-category.component';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { NewMaterialComponent } from './materials-list/new-material/new-material.component';
import { EditMaterialComponent } from './materials-list/edit-material/edit-material.component';
import { SettingComponent } from './setting/setting.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionComponent } from './transactions-list/transaction/transaction.component';
import { DailyUsesListComponent } from './daily-uses-list/daily-uses-list.component';
import { DailyUseFormComponent } from './daily-uses-list/daily-use-form/daily-use-form.component';
import { BusinessReportComponent } from './business-report/business-report.component';
import { BackupAndRestoreComponent } from './backup-and-restore/backup-and-restore.component';
import { ReportCategoriesComponent } from './report-categories/report-categories.component';
import { ReportCategoryFormComponent } from './report-categories/report-category-form/report-category-form.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'transactions',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login'
        }
    },
    {
        path: 'profile',
        component: EditProfileComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Ubah Profil'
        }
    },
    {
        path: 'backup-and-restore',
        component: BackupAndRestoreComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Cadangan Data'
        }
    },
    {
        path: 'report',
        component: BusinessReportComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Laporan Keuangan'
        }
    },
    {
        path: 'transactions/new',
        component: TransactionComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Transaksi Baru'
        }
    },
    {
        path: 'transactions/:id',
        component: TransactionComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Ubah Transaksi'
        }
    },
    {
        path: 'transactions',
        component: TransactionsListComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Transaksi'
        }
    },
    {
        path: 'daily-expenses',
        component: DailyUsesListComponent,
        children: [
            {
                path: 'new',
                component: DailyUseFormComponent,
                data: {
                    title: 'Pengeluaran Baru'
                }
            },
            {
                path: ':id',
                component: DailyUseFormComponent,
                data: {
                    title: 'Ubah Pengeluaran'
                }
            },
        ],
        canActivate: [AuthGuard],
        data: {
            title: 'Pengeluaran'
        }
    },
    {
        path: 'categories',
        component: CategoriesListComponent,
        children: [
            {
                path: 'new',
                component: NewCategoryComponent,
                data: {
                    title: 'Kategori Baru'
                }
            },
            {
                path: ':id',
                component: EditCategoryComponent,
                data: {
                    title: 'Ubah Kategori'
                }
            }
        ],
        canActivate: [AuthGuard],
        data: {
            title: 'Kategori Layanan'
        }
    },
    {
        path: 'materials',
        component: MaterialsListComponent,
        children: [
            {
                path: 'new',
                component: NewMaterialComponent,
                data: {
                    title: 'Kategori Baru'
                }
            },
            {
                path: ':id',
                component: EditMaterialComponent,
                data: {
                    title: 'Ubah Kategori'
                }
            }
        ],
        canActivate: [AuthGuard],
        data: {
            title: 'Kategori Pengeluaran'
        }
    },
    {
        path: 'report-categories',
        component: ReportCategoriesComponent,
        children: [
            {
                path: 'new',
                component: ReportCategoryFormComponent,
                data: {
                    title: 'Kategori Baru'
                }
            },
            {
                path: ':id',
                component: ReportCategoryFormComponent,
                data: {
                    title: 'Ubah Kategori'
                }
            }
        ],
        canActivate: [AuthGuard],
        data: {
            title: 'Kategori Laporan'
        }
    },
    {
        path: 'users',
        component: UsersComponent,
        children: [
            {
                path: 'new',
                component: UserFormComponent,
                data: {
                    title: 'User Baru'
                }
            },
            {
                path: ':id',
                component: UserFormComponent,
                data: {
                    title: 'Ubah User'
                }
            }
        ],
        canActivate: [AuthGuard],
        data: {
            title: 'User'
        }
    },
    {
        path: 'settings',
        component: SettingComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Pengaturan'
        }
    },
    {
        path: 'quit',
        component: QuitComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    }
]
