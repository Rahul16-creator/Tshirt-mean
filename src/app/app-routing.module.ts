import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CoreComponent } from './core/core.component';
import { AuthGuard } from './auth/auth.guard'
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuard } from './auth/admin.auth.guard'
import { CreateProductComponent } from './shop/create-product/create-product.component';
import { MergeProductsComponent } from './shop/merge-products/merge-products.component';
import { CreateCategoryComponent } from './shop/create-category/create-category.component';
import { MergeCategoryComponent } from './shop/merge-category/merge-category.component';
import { UpdateProductComponent } from './shop/update-product/update-product.component';
import { UpdateCategoryComponent } from './shop/update-category/update-category.component';
import { ImguploadComponent } from './shop/imgupload/imgupload.component';
import { CartComponent } from './core/cart/cart.component';
import { SettingsComponent } from './user/settings/settings.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { PurchaseHistoryComponent } from './user/purchase-history/purchase-history.component'
import { ProfileComponent } from './user/profile/profile.component'
 
const routes: Routes = [
   {path:"",component:CoreComponent},
   {path:'signin',component:SigninComponent},
   {path:'signup',component:SignupComponent},
   {path:'user',component:UserComponent,canActivate:[AuthGuard]},
   {path:'admin',component:AdminComponent,canActivate:[AuthGuard,AdminAuthGuard]},
   {path:'create-product',component:CreateProductComponent,canActivate:[AuthGuard,AdminAuthGuard]},
   {path:'manage-product',component:MergeProductsComponent,canActivate:[AuthGuard,AdminAuthGuard]},
   {path:'create-category',component:CreateCategoryComponent,canActivate:[AuthGuard,AdminAuthGuard]},
   {path:'manage-category',component:MergeCategoryComponent,canActivate:[AuthGuard,AdminAuthGuard]},
   {path:'update-product',component:UpdateProductComponent,canActivate:[AuthGuard,AdminAuthGuard]},
   {path:'update-category',component:UpdateCategoryComponent,canActivate:[AuthGuard,AdminAuthGuard]},
   {path:'upload-image/:id',component:ImguploadComponent,canActivate:[AuthGuard,AdminAuthGuard]},
   {path:'cart/:id',component:CartComponent,canActivate:[AuthGuard]},
   {path:'settings',component:SettingsComponent},
   {path:'order-details',component:CheckoutComponent,canActivate:[AuthGuard]},
   {path:'purchase-history',component:PurchaseHistoryComponent,canActivate:[AuthGuard]},
   {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard,AdminAuthGuard]
})
export class AppRoutingModule { }
