import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ActionSheetController } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public httpClient: HttpClient, public socialSharing:SocialSharing ) {

  }

  public termo_busca: String = '' ;
  public resultado_pagina: Number  = 0 ;
  public resultado: any = [];

  public busca(value) {
    console.log(this.termo_busca);
    this.buscaHTTP(null);
    this.resultado_pagina = 0;
  }
  
  public cancela(value) {
    console.log('cancelou', value);
  }
  
  
  public doInfinite(event) {
    console.log('Begin async operation');
  
    setTimeout(() => {
      this.buscaHTTP(event);
  
      //console.log('Async operation has ended');
      //event.complete();
    }, 500);
  }
  
  public buscaHTTP(event) {
    let url: string = `http://www.camperj.com.br/api/teste_json.php?termo=${this.termo_busca}&pagina=${this.resultado_pagina}`;
    this.httpClient.get( url ).subscribe(data => {
      let obj: any = data;
      obj.forEach( (x) => {
        x.exibe=false;
        this.resultado.push(x);
      });
      if (event){
        event.complete();
      }
      console.log('Async operation has ended');
    });
  }





  presentActionSheet(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Exibição Detalhada',
          icon: 'list',
          handler: () => { console.log(`Exibição Detalhada clicked ${item.codigo}`); item.exibe = !item.exibe }
        },
        {
          text: 'Exibição MARC',
          icon: 'menu',
          handler: () => { console.log(`Exibição MARC clicked ${item.codigo}`); }
        },
        {
          text: 'Referência Bibliográfica',
          icon: 'bookmarks',
          handler: () => { console.log(`Referência Bibliográfica clicked ${item.codigo}`); }
        },
        {
          text: 'Ficha Catalográfica',
          icon: 'compass',
          handler: () => { console.log(`Ficha Catalográfica clicked ${item.codigo}`); }
        },
        {
          text: 'Compartilhar',
          icon: 'share-alt',
          handler: () => { console.log(`Compartilhar clicked ${item.codigo}`); this.compartilhar(codigo) }
        },
        {
          text: 'Voltar',
          icon: 'arrow-back',
          role: 'cancel',
          handler: () => { console.log(`cancelar clicked ${item.codigo}`); }
        }
      ]
    });
 
    actionSheet.present();
  }

compartilhar(codigo) {
  let msg = `http://gs.poliglota.online/visu.php?id=${codigo}`;
  this.socialSharing.share(msg, null, null, null);
}

}
