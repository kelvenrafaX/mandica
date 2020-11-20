import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImagemService } from '../../providers/imagem.service';
import { Imagem } from '../../entity/imagem';
import { SettingsService } from '../../core/settings/settings.service';
import * as _ from 'lodash';
import { ImagemProduto } from '../../entity/imagemProduto';

@Component({
selector: './app-imagem',
templateUrl: './imagem.component.html',
providers: [ImagemService]
})
export class ImagemComponent implements OnInit, OnChanges {

  imagens: Imagem[];
  imageError: string;

  @Input() ImagemProduto: ImagemProduto;
  @Input() modal: any;
  @Output() eventSelected = new EventEmitter();

  constructor(private imagemService: ImagemService, private configuracao: SettingsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.ImagemProduto !== undefined && changes.ImagemProduto.previousValue !== changes.ImagemProduto.currentValue) {
      this.imagens = [];
      changes.ImagemProduto.currentValue.map(x => {
        this.imagens.push(x.Imagem);
      });
      console.log(changes.ImagemProduto.currentValue);
    }
  }

  ngOnInit(): void {
    this.imagens = [];
  }

  resize(canvas, ctx, naturalHeight, naturalWidth, img): any {
    const padrao = naturalHeight / (naturalHeight - 200);
    canvas.height = naturalHeight - 200;
    // canvas.width = naturalWidth / padrao;
    canvas.width = naturalHeight - 200;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
    if (dataUrl.length > 50000) {
        return this.resize(canvas, ctx, canvas.height, canvas.width, img);
    } else {
        return dataUrl;
    }
  }

  upload(file: FileList) {
    this.imageError = null;
    if (file.length > 0) {
      for (let i = 0; i < file.length; i++) {
          const max_size = 20971520;
          const allowed_types = ['image/png', 'image/jpeg'];
          const max_height = 15200;
          const max_width = 25600;

          if (file[i].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';
            return false;
          }

          if (!_.includes(allowed_types, file[i].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
          }

          const reader = new FileReader();
          reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              console.log(image.src.length);
              image.onload = rs => {
                  let imgBase64Path = image.src;
                  if (e.target.result.length > 50000) {
                    const canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d');

                    imgBase64Path = this.resize(canvas, ctx, image.naturalHeight, image.naturalWidth, image);
                    console.log(imgBase64Path.length);
                  }

                  const img_height = rs.currentTarget['height'];
                  const img_width = rs.currentTarget['width'];

                  console.log(img_height, img_width);

                  if (img_height > max_height && img_width > max_width) {
                      this.imageError =
                          'Maximum dimentions allowed ' +
                          max_height +
                          '*' +
                          max_width +
                          'px';
                      return false;
                  } else {
                      const base64 = new Imagem();
                      base64.Descricao = imgBase64Path;
                      if (this.imagens.length === 0) {
                        base64.Principal = true;
                      }
                      this.imagens.push(base64);

                  }
              };
          };

          reader.readAsDataURL(file[i]);
      }
    }
  }

  selectImage(image: Imagem): void {
    this.imagens.map(x => x.Principal = false);
    image.Principal = true;
  }

  submit(): void {
    this.eventSelected.emit(this.imagens);
    this.modal.hide();
  }

  remove(image: Imagem): void {
    this.imagens = this.imagens.filter(x => x !== image);
  }

  /*addImage(): void {
    this.imagemService.addImagem()
    .subscribe(x => {
      console.log(x);
      this.getImagens();
    });
  }*/
}
