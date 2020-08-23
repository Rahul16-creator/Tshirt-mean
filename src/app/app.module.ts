import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { CoreComponent } from './core/core.component';
import { UserComponent } from './user/user.component';
import { NavComponent } from './nav/nav.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor} from './auth/auth-interceptor';
import { AdminLeftComponent } from './admin/admin-left/admin-left.component';
import { AdminRightComponent } from './admin/admin-right/admin-right.component';
import { ShopComponent } from './shop/shop.component';
import { CreateProductComponent } from './shop/create-product/create-product.component';
import { MergeProductsComponent } from './shop/merge-products/merge-products.component';
import { CreateCategoryComponent } from './shop/create-category/create-category.component';
import { MergeCategoryComponent } from './shop/merge-category/merge-category.component';
import { UpdateProductComponent } from './shop/update-product/update-product.component';
import { UpdateCategoryComponent } from './shop/update-category/update-category.component';
import { CuroselComponent } from './core/curosel/curosel.component';
import { ImguploadComponent } from './shop/imgupload/imgupload.component';
import { CartComponent } from './core/cart/cart.component';
import { OrdersComponent } from './core/orders/orders.component';
import { FooterComponent } from './footer/footer.component';
import { UserLeftComponent } from './user/user-left/user-left.component';
import { UserRightComponent } from './user/user-right/user-right.component';
import { AboutComponent } from './user/about/about.component';
import { CheckoutComponent } from './user/checkout/checkout.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SettingsComponent } from './user/settings/settings.component';
import { PurchaseHistoryComponent } from './user/purchase-history/purchase-history.component';
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    CoreComponent,
    UserComponent,
    NavComponent,
    SignupComponent,
    SigninComponent,
    AdminLeftComponent,
    AdminRightComponent,
    ShopComponent,
    CreateProductComponent,
    MergeProductsComponent,
    CreateCategoryComponent,
    MergeCategoryComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    CuroselComponent,
    ImguploadComponent,
    CartComponent,
    OrdersComponent,
    FooterComponent,
    UserLeftComponent,
    UserRightComponent,
    AboutComponent,
    CheckoutComponent,
    ResetPasswordComponent,
    SettingsComponent,
    PurchaseHistoryComponent,
    ProfileComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
