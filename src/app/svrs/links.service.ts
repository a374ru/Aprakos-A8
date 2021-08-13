import { Injectable } from '@angular/core';
import { SedService } from './sed.service';
import { DateService, NINEHOLIDAYS } from './date.service';





@Injectable({
  providedIn: 'root'
})


  
export class LinksService {

  /** 001.
   * Переменная удерживает html-ссылку на Главную страницу дня. 
   * Далее ссылка парсится компонентом.
   */
  linkToPageOfTheDay: string;

  /** 002.
   * Удерживает ссылку на текущий день Апракоса без корекции Двунадесятых праздников.
   * 
   */
  linkTheAprakosDay: string;


  /** 003. 
   * Ссылка на зачала текущего дня с учетом приходящего на данный день Двунадесятого непереходящего праздника.
   * Это замена рядового зачала на праздничное.
   * Всего таких праздников – 9.
   * Смотри dateService -> DVUNADESYATIE
   * 
   */
  dvunadesyatieDnie: string;

/**
   *  Число текущего дня.
   * 
  */
  td: number;
  zeroDay: string; // для приведения в строку числа с начальным нолем – 01

  /**
   * Ссылка на #id страницы `stvol.html`.
   * 
   */
  ancor: string;

  /**
   * Флаг для переключения условия.
   */
  flag: boolean = false;

  /**
   * Ссылка на зачала текущего двунадесятого праздника.
   */
  linkToNineZachala: string;

  constructor(public _sedService: SedService) {


    this.linkToNineZachala = this.pathToPageDay();
    this.pathToPageAprakosDay();
    this.ancorLinksToSed();


  }


  /**
      * Функция инициализирует переменную `linkToPageOfTheDay` 
      * ссылкой на страницу дня, в соответствии с Минеей (Сий день).
      * 
      * @return инициализирует переменую `linkToNineZachala`, ссылкой на страницу зачал Двунадесятых *недвижимых* праздников.
      */
  pathToPageDay(): string {

    let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    // дней в месяцах
    let notVisokos = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

    // високос
    let visokos = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];


    let d = new Date()
    this.td = d.getDate();

    // let ddd = 

    if (this.td < 10) {
      this.zeroDay = "0" + this.td;
    } else {
      this.zeroDay = String(this.td)
    }

    let tm = d.getMonth();
    let ty = d.getFullYear();
    let visekt = ((ty % 4) == 0) ? visokos : notVisokos;

    if (tm == 0 && this.td <= 13) {
      var mm = 11;
      var ss = Number(visekt[mm]) - (13 - this.td);
    } else if (tm > 0 && this.td <= 13) {
      mm = tm - 1;
      ss = Number(visekt[mm]) - (13 - this.td);
    } else {
      mm = tm;
      ss = (this.td - 13);
    }

    if (ss < 10) { var dd = '0' + ss; } else { dd = String(ss); }

    //  Инициализация стандартного пути без учета двунадесятых праздников.
    this.linkToPageOfTheDay = (months[mm] + "/" + dd + this.CorrectingMonthNumbersDay(visekt[1], this.zeroDay) + "/" + "index.html");

    // Возврат измененного пути к зачалам двунадесятого праздника, так как зачала располагаются в директориях неподвижного круга праздников в отличиии от зачал Богослужебгного года.
    return (months[mm] + "/" + dd + this.CorrectingMonthNumbersDay(visekt[1], this.zeroDay) + "/" + "zachala.html")

  }


  /** 009.
   * Функция инициализирует переменную `pathToPageApracosDay`. 
   * Функция проверяет совпадение для текущего дня с датами девяти великих непереходящих празнеств и корректирует ссылку на зачала этих девяти праздников.
   * 
   * @var correctingLinkToReadAprakos корректировка ссылки на чтение Апракоса с учетом всех отступок и преступок Богослужебного года, но без учета двунадесятых праздников.
   */
  pathToPageAprakosDay() {

    // Проверка даты на совпадение из девяти празнеств представленных в словаре девяти празнеств – NINEHOLIDAYS.
    let oneOfTheNineHolidays = this._sedService._datesService.timeBox.getMonth() + ", " + this._sedService._datesService.timeBox.getDate()
  
    
    for (const item in NINEHOLIDAYS) {
      
      // проверяем дату на совпадение с одним из девяти неперехлдящих праздников находящихся в коллекции `NINEHOLIDAYS`.
      if (oneOfTheNineHolidays == NINEHOLIDAYS[item].month + ", " + NINEHOLIDAYS[item].day) {
        this.flag = true

      }
    }
    
    if (this.flag) { 
      // Если условие истина то корректируется ссылка, на страницу зачал для текущего праздника. Таких случаев в году всего девять и это статичные даты не требующие вычисления отступок.
      this.linkTheAprakosDay = this.linkToNineZachala

    } else {

      let correctingLinkToReadAprakos = this._sedService.currentWeek > 40 ? this._sedService.betweenWeeks : 0

      // Комплектация пути до Апракоса
      this.linkTheAprakosDay = ("../APRACOS/" + (this._sedService.currentWeek - correctingLinkToReadAprakos) + "/" + (this._sedService._datesService.timeBox.getDay() + 1) + ".html")
    
       }
  }

  /**
   * Функция инициализирует переменную `idLink` ссылкой на странице `stvol.html`.
   * Ссылка (#id) на текущую седмицу текущей страницы БЕЗ УЧЕТА отступок и преступок.
   */
  ancorLinksToSed() {
    this.ancor = ("#seed" + this._sedService.currentWeek)
  }

  /** 005.
   * Функция увеличивает Юлианскую дату в високосном году, в дапазоне от 29 февраля до 16 марта на единицу.
   * 
   * @param visekt принимает один из двух месяцев (Февраль или Март).
   * @param gd принимает Юлианскую дату.
   * @return Юлианскую дату.
   */
  CorrectingMonthNumbersDay(visekt: string, gd: string): string {

    let n = Number(gd)

    if (visekt === "29" && n === 29) {
      return "00visekt"
    }

    return gd

  }
}
