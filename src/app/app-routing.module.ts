import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'language-alert',
    loadChildren: () => import('./language-alert/language-alert.module').then( m => m.LanguageAlertPageModule)
  },
  {
    path: 'calification',
    loadChildren: () => import('./calification/calification.module').then( m => m.CalificationPageModule)
  },
  {
    path: 'service-form',
    loadChildren: () => import('./service-form/service-form.module').then( m => m.ServiceFormPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'subcategory',
    loadChildren: () => import('./subcategory/subcategory.module').then( m => m.SubcategoryPageModule)
  },
  {
    path: 'providers',
    loadChildren: () => import('./providers/providers.module').then( m => m.ProvidersPageModule)
  },
  {
    path: 'detail-provider',
    loadChildren: () => import('./detail-provider/detail-provider.module').then( m => m.DetailProviderPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'success-order',
    loadChildren: () => import('./success-order/success-order.module').then( m => m.SuccessOrderPageModule)
  },
  {
    path: 'detail-order',
    loadChildren: () => import('./detail-order/detail-order.module').then( m => m.DetailOrderPageModule)
  },
  {
    path: 'cancel-order',
    loadChildren: () => import('./cancel-order/cancel-order.module').then( m => m.CancelOrderPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  {
    path: 'codepassword',
    loadChildren: () => import('./codepassword/codepassword.module').then( m => m.CodepasswordPageModule)
  },
  {
    path: 'chat-blog',
    loadChildren: () => import('./chat-blog/chat-blog.module').then( m => m.ChatBlogPageModule)
  },
  {
    path: 'chat-pedidos',
    loadChildren: () => import('./chat-pedidos/chat-pedidos.module').then( m => m.ChatPedidosPageModule)
  },
  {
    path: 'chat-support',
    loadChildren: () => import('./chat-support/chat-support.module').then( m => m.ChatSupportPageModule)
  },
  {
    path: 'confirm-info',
    loadChildren: () => import('./confirm-info/confirm-info.module').then( m => m.ConfirmInfoPageModule)
  },
  {
    path: 'contrasena',
    loadChildren: () => import('./contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },
  {
    path: 'list-blog',
    loadChildren: () => import('./list-blog/list-blog.module').then( m => m.ListBlogPageModule)
  },
  {
    path: 'search-filter',
    loadChildren: () => import('./search-filter/search-filter.module').then( m => m.SearchFilterPageModule)
  },
  {
    path: 'seinit-service',
    loadChildren: () => import('./seinit-service/seinit-service.module').then( m => m.SeinitServicePageModule)
  },
  {
    path: 'zones-register',
    loadChildren: () => import('./zones-register/zones-register.module').then( m => m.ZonesRegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
