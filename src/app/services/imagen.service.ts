import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor() { }
  base64toFile(base64Data: string, filename: string): File {
    console.log(base64Data)
    const arr:any= base64Data.split(',');
    const mime:any = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    console.log(JSON.stringify(u8arr))
    return new File([u8arr], filename, {type:mime});
  }

}
