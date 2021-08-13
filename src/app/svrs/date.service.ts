import { HttpClient } from '@angular/common/http';
import { compileBaseDefFromMetadata } from '@angular/compiler';
import { Injectable, OnInit } from '@angular/core';
import { range } from 'rxjs';
import { Easter } from '../intrfc/interfaces';



/**
  * Православная Пасхалия.
  */
 const PASKHALIA = {

   2015: [3, 12], 2016: [4, 1], 2017: [3, 16], 2018: [3, 8],  2019: [3, 28], 2020: [3, 19], 2021: [4, 2], 2022: [3, 24], 2023: [3, 16], 2024: [4, 5], 2025: [3, 20], 2026: [3, 12], 2027: [4, 2], 2028: [3, 16], 2029: [3, 8], 2030: [3, 28], 2031: [3, 13], 2032: [4, 2], 2033: [3, 24], 2034: [3, 9], 2035: [3, 29], 2036: [3, 20], 2037: [3, 5], 2038: [3, 25]

 };

 /**
  * Массив Великих Двунадесятых Праздников, из которых только девять статичны.
  * Эти девять празнест считаются неподвижными, так как жестко привязаны к датам Юлианского календаря и их даты не зависят от течения Пасхального года.
  * 
  */

 export const NINEHOLIDAYS = {

  rojdestvoBogorodici: { month: 8, day: 21 },
  vozdvijjenieKresta: { month: 8, day: 27 },
  vvedenieVoHram: { month: 11, day: 3 },
  rojdestvoXristovo: { month: 0, day: 7 }, // 0 = month of January
  kreshenieGospodne: { month: 0, day: 19 },
  sretenieGospodne: { month: 1, day: 15 },
  blagoveshenieBogorodici: { month: 3, day: 7 },
  //  Здесь бывают по календарю еще четыре `ПЕРЕХОДЯЩИХ` празнества: 
  // 8. Вход Господень в Иерусалим, 
  // 0. Пасха(не входящая в состав двунадесятых), 
  // 9. Вознесение, 
  // 10. Пятьдесятница.
  preobrajjenieGospodne: { month: 7, day: 19 },
  uspenieBogorodici: { month: 7, day: 28 }

}

@Injectable()


export class DateService implements OnInit, Easter {

 
  
  /** 008.
   * 
   */
  keyYear: number; // Главный ключ полугодия
  
  timeBox: Date
  paskhaCurrentYear: Date
  currentYear: number

  paskhaliaJSON: object
  datesEasterYear: any


  /**
    * Разница времен, от текущего момента до времени Пасхи текущего года.
    * Это число показывает состояние Праздника Новый год в текущем ПАСХАЛЬНОМ ГОДУ: - был или небыл.
    *
    * 
   */
  dateDifference: number;

/**
 *  Массив для конвертации месяцев в русский язык
 *
 */
  monthsRU = [
    "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ]
  greatHolidays: any;
  PASKHALIAJSON2: Array<number>;

    /**
     * Пока не используется !!!
     * Коструктор использует HttpClient так как нужно подключаться к внешнему источнику – файлу paskhalia.json
     * @param http 
     * свойство для работы с протоколом http
     */
  constructor(private http: HttpClient) {
    
    this.paskhaliaJSON = PASKHALIA;
    this.timeBox = new Date();
  // В параметры Date() может поступать на вход дата системы или пользователя: (пример даты для 31 января 2020 года указывается так: `2020, 0, 31)`)

    console.log("--=-=-=-=-=-=-=-=");
    
    this.currentYear = this.timeBox.getFullYear();
    this.paskhaCurrentYear = new Date(this.currentYear, PASKHALIA[this.currentYear][0], PASKHALIA[this.currentYear][1]);
    

    // prb1 (problema 1, смотри видео prb-1.mov)
    this.dateDifference = this.paskhaCurrentYear.getTime() - this.timeBox.getTime();
        if (this.dateDifference < 0){
          // ---------------------------
          // если  ГНГ не наступил в текущем Пасхальном году
          this.keyYear = this.currentYear + 1;
          // ---------------------------
          this.keyNewYear();
          
        }
        else {
          // ---------------------------
          // если ГНГ наступил в текущем Пасхальном году
          this.keyYear = this.currentYear;
          
          // ---------------------------
          this.keyNewYear();
        }
  }

  ngOnInit() { }

     /** 007
     * Функция, которая в зависимости от флага `keyYear`, который определяет одну из двух частей Пасхального года, устанавливает в коллекцию нужные для вычисления седмиц две даты Пасх, и две их руссификации.
     * 
     */
  keyNewYear() {
    
    this.datesEasterYear =  {

        lastEaster :
          new Date(this.keyYear - 1, PASKHALIA[this.keyYear - 1][0],
            PASKHALIA[this.keyYear - 1][1]).getTime(),

        lastEasterRU : PASKHALIA[this.keyYear - 1][1]+" "+
        this.monthsRU[PASKHALIA[this.keyYear - 1][0]], // +" "+ (this.keyYear-1),

        nextEaster :
          new Date(this.keyYear, PASKHALIA[this.keyYear][0],
            PASKHALIA[this.keyYear][1]).getTime(),

         nextEasterRU :   PASKHALIA[this.keyYear][1]+" "+
          this.monthsRU[PASKHALIA[this.keyYear][0]] + " " + (this.keyYear)
        
      }
  }


  // theTwelfthHolidays(greatHoliday: NineHolidays, name: string): number {
    
  //   if (greatHoliday) {
      
  //     let item = greatHoliday[1]
      
  //     return   item.month  || item.day 
  //   }
    

  // }
  
/**
 * Метод возвращающий Пасхалию из json файла
 */
  // public getPaskhaliaFromJSON(){
  //   // Возвращает Пасхалию
  //   return this.http.get<any>('./assets/paskhalia.json')

  //   // подписка для компонета
  //   // .subscribe(paskhaliaJSON => this.paskhaliaJSON = paskhaliaJSON);
  // }
  

  // get PaskhaliaArray() {

  //   return PASKHALIA
    
  // }



}
