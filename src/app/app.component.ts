import { Component, OnInit } from '@angular/core';
import { LinksService } from './svrs/links.service';

/**
 * Директива @Component. В этой директиве описывается селектор, который является тэгом в теле которого будет прописано то, что указано в этом файле.
 *
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
* В данном классе реализуется метод ngOnInit. В методе ngOnInit  инициируется всё необходимое до загрузки компонента DOM. 
* Следует прописать в этом  методе только самые **необходимые** данные.
 */
export default class AppComponent implements OnInit {
/**
 * Название страницы html
 */
  title: string = ' АПРАКОСЪ';
  /**
   * Линк на главную страницу сайта
   */
  mainPage: string = "Главная страница";
  /**
   * ???
   */
  public timeOut: string = "classOFF";


  constructor(public _linksService: LinksService) { }
  ngOnInit() {

    // setTimeout(() => {this.timeOut = "classON"}, 3);


  }

 

}
