import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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
    path: 'detail-provider/:id',
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
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'email-password',
    loadChildren: () => import('./email-password/email-password.module').then( m => m.EmailPasswordPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'contact-modal',
    loadChildren: () => import('./contact-modal/contact-modal.module').then( m => m.ContactModalPageModule)
  },
  {
    path: 'login-proveedor',
    loadChildren: () => import('./login-proveedor/login-proveedor.module').then( m => m.LoginProveedorPageModule)
  },
  {
    path: 'register-proveedor',
    loadChildren: () => import('./register-proveedor/register-proveedor.module').then( m => m.RegisterProveedorPageModule)
  },
  {
    path: 'proveedor/add-service',
    loadChildren: () => import('./proveedor/add-service/add-service.module').then( m => m.AddServicePageModule)
  },
  {
    path: 'proveedor/calification',
    loadChildren: () => import('./proveedor/calification/calification.module').then( m => m.CalificationPageModule)
  },
  {
    path: 'proveedor/camera-preview',
    loadChildren: () => import('./proveedor/camera-preview/camera-preview.module').then( m => m.CameraPreviewPageModule)
  },
  {
    path: 'proveedor/camino',
    loadChildren: () => import('./proveedor/camino/camino.module').then( m => m.CaminoPageModule)
  },
  {
    path: 'proveedor/cancel-order',
    loadChildren: () => import('./proveedor/cancel-order/cancel-order.module').then( m => m.CancelOrderPageModule)
  },
  {
    path: 'proveedor/change-password',
    loadChildren: () => import('./proveedor/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'proveedor/chat-pedidos',
    loadChildren: () => import('./proveedor/chat-pedidos/chat-pedidos.module').then( m => m.ChatPedidosPageModule)
  },
  {
    path: 'proveedor/chat-support',
    loadChildren: () => import('./proveedor/chat-support/chat-support.module').then( m => m.ChatSupportPageModule)
  },
  {
    path: 'proveedor/codepassword',
    loadChildren: () => import('./proveedor/codepassword/codepassword.module').then( m => m.CodepasswordPageModule)
  },
  {
    path: 'proveedor/complete-register',
    loadChildren: () => import('./proveedor/complete-register/complete-register.module').then( m => m.CompleteRegisterPageModule)
  },
  {
    path: 'proveedor/confirm-info',
    loadChildren: () => import('./proveedor/confirm-info/confirm-info.module').then( m => m.ConfirmInfoPageModule)
  },
  {
    path: 'proveedor/contact-modal',
    loadChildren: () => import('./proveedor/contact-modal/contact-modal.module').then( m => m.ContactModalPageModule)
  },
  {
    path: 'proveedor/contract',
    loadChildren: () => import('./proveedor/contract/contract.module').then( m => m.ContractPageModule)
  },
  {
    path: 'proveedor/contrasena',
    loadChildren: () => import('./proveedor/contrasena/contrasena.module').then( m => m.ContrasenaPageModule)
  },
  {
    path: 'proveedor/detail-order',
    loadChildren: () => import('./proveedor/detail-order/detail-order.module').then( m => m.DetailOrderPageModule)
  },
  {
    path: 'proveedor/detail-tracking',
    loadChildren: () => import('./proveedor/detail-tracking/detail-tracking.module').then( m => m.DetailTrackingPageModule)
  },
  {
    path: 'proveedor/edit-profile',
    loadChildren: () => import('./proveedor/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'proveedor/edit-service',
    loadChildren: () => import('./proveedor/edit-service/edit-service.module').then( m => m.EditServicePageModule)
  },
  {
    path: 'proveedor/email-password',
    loadChildren: () => import('./proveedor/email-password/email-password.module').then( m => m.EmailPasswordPageModule)
  },
  {
    path: 'proveedor/explore-container',
    loadChildren: () => import('./proveedor/explore-container/explore-container.module').then( m => m.ExploreContainerPageModule)
  },
  {
    path: 'proveedor/filter',
    loadChildren: () => import('./proveedor/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'proveedor/finish-register',
    loadChildren: () => import('./proveedor/finish-register/finish-register.module').then( m => m.FinishRegisterPageModule)
  },
  {
    path: 'proveedor/info-profile',
    loadChildren: () => import('./proveedor/info-profile/info-profile.module').then( m => m.InfoProfilePageModule)
  },
  {
    path: 'proveedor/list-services',
    loadChildren: () => import('./proveedor/list-services/list-services.module').then( m => m.ListServicesPageModule)
  },
  {
    path: 'proveedor/notifications',
    loadChildren: () => import('./proveedor/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'proveedor/payments',
    loadChildren: () => import('./proveedor/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'proveedor/planes',
    loadChildren: () => import('./proveedor/planes/planes.module').then( m => m.PlanesPageModule)
  },
  {
    path: 'proveedor/privacy-policy',
    loadChildren: () => import('./proveedor/privacy-policy/privacy-policy.module').then( m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'proveedor/signature',
    loadChildren: () => import('./proveedor/signature/signature.module').then( m => m.SignaturePageModule)
  },
  {
    path: 'proveedor/tutorial',
    loadChildren: () => import('./proveedor/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'proveedor/verify-number',
    loadChildren: () => import('./proveedor/verify-number/verify-number.module').then( m => m.VerifyNumberPageModule)
  },
  {
    path: 'proveedor/view-contrat',
    loadChildren: () => import('./proveedor/view-contrat/view-contrat.module').then( m => m.ViewContratPageModule)
  },
  {
    path: 'proveedor/zones',
    loadChildren: () => import('./proveedor/zones/zones.module').then( m => m.ZonesPageModule)
  },
  {
    path: 'proveedor/zones-register',
    loadChildren: () => import('./proveedor/zones-register/zones-register.module').then( m => m.ZonesRegisterPageModule)
  },
  {
    path: 'proveedor/zones-service',
    loadChildren: () => import('./proveedor/zones-service/zones-service.module').then( m => m.ZonesServicePageModule)
  },
  {
    path: 'proveedor/chat-password',
    loadChildren: () => import('./proveedor/chat-password/chat-password.module').then( m => m.ChatPasswordPageModule)
  },  {
    path: 'soporte',
    loadChildren: () => import('./soporte/soporte.module').then( m => m.SoportePageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule {}
