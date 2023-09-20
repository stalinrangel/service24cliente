import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectserviceService {
	
	unsuscribe() {
		//throw new Error('Method not implemented.');
	}

	extras: any;
	category: any;
	user: any;
	constructor() { }

	public setExtras(data:any){
		this.extras = data;
	}

	public getExtras(){
		return this.extras;
	}

	public setCat(data:any){
		this.category = data;
	}

	public getCat(){
		return this.category;
	}
	//--actualiza foto del perfil
	private userSubject = new Subject<any>();
	setUser(data: any) {
	this.userSubject.next(data);
	}
	getUser(): Subject<any> {
	return this.userSubject;
	}
	//--actualiza pedidos
	private tab2 = new Subject<any>();
	setTab2(data: any) {
		console.log(data)
		this.tab2.next(data);
	}
	getTab2(): Subject<any> {
		return this.tab2;
	}
	//--trabaja con notificaciones y actualiza pedidos
	private aceptado = new Subject<any>();
	setAceptado(data: any) {
		console.log(data)
		this.aceptado.next(data);
	}
	getAceptado(): Subject<any> {
		return this.aceptado;
	}
	//--trabaja con notificaciones y actualiza pedidos
	private encamino = new Subject<any>();
	setEncamino(data: any) {
		console.log(data)
		this.encamino.next(data);
	}
	getEncamino(): Subject<any> {
		return this.encamino;
	}
	//--trabaja con notificaciones y actualiza pedidos
	private finalizados = new Subject<any>();
	setfinalizados(data: any) {
		console.log(data)
		this.finalizados.next(data);
	}
	getfinalizados(): Subject<any> {
		return this.finalizados;
	}
	//--trabaja con notificaciones y actualiza pedidos
	private cancelado = new Subject<any>();
	setcancelado(data: any) {
		console.log(data)
		this.cancelado.next(data);
	}
	getcancelado(): Subject<any> {
		return this.cancelado;
	}
	//--trabaja con notificaciones y actualiza pedidos
	private chatpedido  = new Subject<any>();
	setchatpedido(data: any) {
		console.log(data)
		this.chatpedido.next(data);
	}
	getchatpedido(): Subject<any> {
		return this.chatpedido;
	}
	private openchat  = new Subject<any>();
	setopenchat(data: any) {
		console.log(data)
		this.openchat.next(data);
	}
	getopenchat(): Subject<any> {
		return this.openchat;
	}
	//--trabaja con notificaciones y actualiza pedidos
	private soporte  = new Subject<any>();
	setsoporte(data: any) {
		console.log(data)
		this.soporte.next(data);
	}
	getsoporte(): Subject<any> {
		return this.soporte;
	}
	//--trabaja con notificaciones y actualiza pedidos
	private generales  = new Subject<any>();
	setgenerales(data: any) {
		console.log(data)
		this.generales.next(data);
	}
	getgenerales(): Subject<any> {
		return this.generales;
	}

	//--trabaja con notificaciones y actualiza pedidos
	private notificaciones  = new Subject<any>();
	setnotificaciones(data: any) {
		console.log(data)
		this.notificaciones.next(data);
	}
	getnotificaciones(): Subject<any> {
		return this.notificaciones;
	}
	private nnotificaciones  = new Subject<any>();
	setnnotificaciones(data: any) {
		console.log(data)
		this.nnotificaciones.next(data);
	}
	getnnotificaciones(): Subject<any> {
		return this.nnotificaciones;
	}

	private ruta  = new Subject<any>();
	setruta(data: any) {
		console.log(data)
		this.ruta.next(data);
	}
	getruta(): Subject<any> {
		return this.ruta;
	}

	private reload_chats_pedido  = new Subject<any>();
	set_reload_chats_pedido(data: any) {
		console.log(data)
		this.reload_chats_pedido.next(data);
	}
	get_reload_chats_pedido(): Subject<any> {
		return this.reload_chats_pedido;
	}

}
