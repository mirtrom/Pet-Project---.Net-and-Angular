import { Routes } from '@angular/router';
import { ProductListComponent } from './features/admin-management/product/product-list/product-list.component';
import { CreateProductComponent } from './features/admin-management/product/create-product/create-product.component';
import { DeleteProductComponent } from './features/admin-management/product/delete-product/delete-product.component';
import { EditProductComponent } from './features/admin-management/product/edit-product/edit-product.component';
import { CategoryListComponent } from './features/admin-management/category/category-list/category-list.component';
import { CreateCategoryComponent } from './features/admin-management/category/create-category/create-category.component';
import { DeleteCategoryComponent } from './features/admin-management/category/delete-category/delete-category.component';
import { EditCategoryComponent } from './features/admin-management/category/edit-category/edit-category.component';
import { HomeComponent } from './features/shared/home/home.component';
import { DetailsComponent } from './features/shared/details/details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  {path: "admin/products", component: ProductListComponent},
  {path: "admin/products/add", component: CreateProductComponent},
  {path: "admin/products/delete/:id", component: DeleteProductComponent},
  {path: "admin/products/edit/:id", component: EditProductComponent},
  {path: "admin/categories", component: CategoryListComponent},
  {path: "admin/categories/add", component: CreateCategoryComponent},
  {path: "admin/categories/delete/:id", component: DeleteCategoryComponent},
  {path: "admin/categories/edit/:id", component: EditCategoryComponent},
  {path: "", component: HomeComponent},
  {path: "products/:id", component: DetailsComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent}
];
