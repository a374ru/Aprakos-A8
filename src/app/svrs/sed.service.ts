import { Injectable, OnInit } from '@angular/core';
import { DateService } from './date.service';

/**
 * Экспонента суток (кол-во миллисекунд в сутках) = 86.400.000
 */
const DMS = 864E5

/**
 * Набор гласов для седмиц.
 */
const GLASSEDMIC = {
  "1": 8, "2": 1, "3": 2, "4": 3, "5": 4, "6": 5, "7": 6, "8": 7,
  "9": 8, "10": 1, "11": 2, "12": 3, "13": 4, "14": 5, "15": 6, "16": 7,
  "17": 8, "18": 1, "19": 2, "20": 3, "21": 4, "22": 5, "23": 6, "24": 7,
  "25": 8, "26": 1, "27": 2, "28": 3, "29": 4, "30": 5, "31": 6, "32": 7,
  "33": 8, "34": 1, "35": 2, "36": 3, "37": 4, "38": 5, "39": 6, "40": 7,
  "41": 8, "42": 1, "43": 2, "44": 3, "45": 4, "46": 5, "47": 6, "48": 7,
  "49": 8, "50": 1, "51": 2, "52": 3, "53": 4, "54": 5, "55": 6, "56": 7,
  "57": 8
}

const NINEHOLIDAYS = {

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


@Injectable({
  providedIn: 'root'
})

export class SedService implements OnInit {

  /**
   * Массив строк который находится в `_datesService` по умолчанию.
   * 
   */
  monthsRU: string[];

  /** 
   * Вычисление количества седмиц Богослужебного года.
  */
  sumWeeks: number;

  /**
   * Текущая седмица по Пасхе.
   */
  currentWeek: number;

  /**
   * Cедмица по Пятидесятнице.
   */
  weekAfterPyatidesyatnica: number;
  glas: string;

  /**
   * Переменная даты Воздвижения (простоянное празнество).
   */
  timeBoxVozdvijjenie: number;

  /**
   * Сумма седмиц от Пасхи до Воздвижения.
   */
  sumWeeksBeforeVozdvijjenieOfEaster: number;


  /**
   * Сумма седмиц от Пятьдесятницы до Воздвижени
   */
  sumWeeksBeforeVozdvijjenieOfPyatidesyatnica: number;


  /**
   * Текущая дата в секундах.
   * Для вычисления седмиц.
   */
  timeBoxSeconds: number;
  
  /**
   * Чмсло праздника Воздвижения на текущий БГ
   */
  numberVozdvijjenie: number;

  /**
   * Дата текущей Пасхи для формирования даты Воздвижения из милисекунд.
   */
  yearLastEaster: Date;

  /**
   * Переменные для значений отступки и преступки в чтениях.
   * Указывают сдвиг от празднества Воздвижения в обе стороны.
   */
  otstupkaV: number;
  prestupkaV: number;

  /**
   * Дата Недели Мытаря и Фарисея.
   */
  mif: Date;

  /**
   * Количество промежуточных седмиц пред Неделей Мытаря и Фарисея, если таковые случились. Представлены разницей между суммой всех седмициц Богослужебного года и числом 50, которое складывается из определенных седмиц Уставного Богослужения (7-ми Пасхальных, 33-x по Пятьдесятнице, 10-ти седмиц Великопостного периода).
   */
  betweenWeeks: number;

  /**
   * Конвертированная дата МиФ.
   */
  mifRussianDate?: string;

  /**
   * Переменная для вывода русского слова в шаблоне html (преступка или отступка).
   */

  stupka: string;

  nineHol: object;

  public constructor(public _datesService: DateService) {

    this.timeBoxSeconds =  this._datesService.timeBox.getTime()

    console.warn("Грядущая Православная Пасха: ", this._datesService.datesEasterYear.nextEasterRU)

    this.numberOfWeeks();
    this.otstupkaVozdvijjenie();
    console.log(`Воздвиженская ${this.stupka} : ${this.otstupkaV}`);
    this.intermediateWeeks();
    this.nineHol = NINEHOLIDAYS

  }

  /**
   * Стартовая инициализация объектов значениями дат.
   */
  ngOnInit() {
  }


  /** 004.
   * Вычисление `разницы` между текущем временем и датой прошедшей Пасхи.
   * Обрезка значения до целого.
   * Вычисление текущей седмицы.
   * Вычисление седмицы по Пятьдесятнице
   */
  numberOfWeeks() {
    this.sumWeeks = (Math.trunc((this._datesService.datesEasterYear.nextEaster - this._datesService.datesEasterYear.lastEaster) / DMS / 7));
    this.currentWeek = (Math.trunc((Date.now() - this._datesService.datesEasterYear.lastEaster) / DMS / 7 + 1));

    if (this.sumWeeks === 8) {
      this.weekAfterPyatidesyatnica = this.sumWeeks - 7;
      this.glas = this.glasSed(String(this.currentWeek));
    }
    else {
      this.weekAfterPyatidesyatnica = null;
      this.glas = this.glasSed(String(this.currentWeek));
    }

    /** 004.
     *  Вычисление даты для Недели Мытаря и Фарисея и количества промежуточных седмиц с учетом високосного года.
     * 
     */
    this.mif = new Date(this._datesService.datesEasterYear.nextEaster - 6047999999);
    this.mifRussianDate = this.mif.getDate() + " " + this._datesService.monthsRU[this.mif.getMonth()];

    console.log(`Текущая седмица по Пасхе: ${this.currentWeek}`)
    console.log(`Кол-во седмиц в Пасхальном году (между Пасхами): ${this.sumWeeks}`);
  }

  /**
   * Возвращает кол-во седмиц отступки или преступки для праздника Воздвижения Креста.
   * @return количество седмиц.
   */
  private otstupkaVozdvijjenie() {

    this.yearLastEaster = new Date(this._datesService.datesEasterYear.lastEaster);
    this.numberVozdvijjenie = this.yearLastEaster.getFullYear();
    this.timeBoxVozdvijjenie = new Date(this.numberVozdvijjenie, NINEHOLIDAYS.vozdvijjenieKresta.month, NINEHOLIDAYS.vozdvijjenieKresta.day).getTime();

    console.log("=-=-=-=-=-=-=-=")
    
    this.sumWeeksBeforeVozdvijjenieOfEaster = (Math.trunc((this.timeBoxVozdvijjenie - this._datesService.datesEasterYear.lastEaster) / DMS / 7));
    this.sumWeeksBeforeVozdvijjenieOfPyatidesyatnica = (Math.trunc((this.timeBoxVozdvijjenie - this._datesService.datesEasterYear.lastEaster) / DMS / 7) - 6);
    
    console.log(`От Пасхи до Воздвижения Креста: ${this.sumWeeksBeforeVozdvijjenieOfEaster}. От Пятидесятницы: ${this.sumWeeksBeforeVozdvijjenieOfPyatidesyatnica}`)
    
    if (this.sumWeeksBeforeVozdvijjenieOfPyatidesyatnica > 17) {
      this.otstupkaV = this.sumWeeksBeforeVozdvijjenieOfPyatidesyatnica - 17;
      this.stupka = "отступка"
    }
    else this.otstupkaV = 17 - this.sumWeeksBeforeVozdvijjenieOfPyatidesyatnica;
    this.stupka = "преступка"
    
    /**
     * В данном операторе `if` проверяется было ли Воздвижение и превышает ли кол-во седмиц число 17. Если да, то возвращается разность (otstupkaV), на которую больше прошло седмиц.
     * 
     */
    if (this.timeBoxSeconds >= this.timeBoxVozdvijjenie && this.sumWeeks > this.sumWeeksBeforeVozdvijjenieOfPyatidesyatnica && this.sumWeeks > 17) {
      return ("Отступка по Воздвижении в седмицах: " + this.otstupkaV);
    }
    
    /**
     * В данном `if` возвращается нехватка до семнадцати седмиц если праздник Воздвижения случился ранее 17 седмицы после Пасхи.
     * 
     */
    else if (this.timeBoxSeconds >= this.timeBoxVozdvijjenie && this.sumWeeks < this.sumWeeksBeforeVozdvijjenieOfPyatidesyatnica && this.sumWeeks > 17) {
      var clog = `Преступка --- + ${this.prestupkaV}`
      return (clog);
    }
    
    else if (this.sumWeeksBeforeVozdvijjenieOfEaster - this.currentWeek != 0) {
      console.log("До Воздвижения осталось седмиц: ", (this.sumWeeksBeforeVozdvijjenieOfEaster - this.currentWeek));
    }

    else
      console.log("До Воздвижения осталось дней: ", (7 - (this._datesService.timeBox.getDay())));
    
  }
  
  /**
   * Возвращает глас Октоиха по номеру седмицы случившейся после Пасхи, но не по Пятьдесятнице.
   *  
   * @param {string} sedmica принимает строку.
    * @returns возвращает номер гласа для текущей седмицы.
    */
  protected glasSed(sedmica: string | number) {

    if (sedmica) {
      return String(GLASSEDMIC[sedmica]);
    }

    else return "невнятный 🙅‍ --";
  }


  /**
   * Функция вычисляет промежуточные седмицы от 34 Недели (Воскресенья) по Пятьдесятнице до Недели Мытаря и Фарисея.
   * 
   * @returns количество седмиц
   */
  private intermediateWeeks() {

      this.betweenWeeks = this.sumWeeks - (17 + 33);
      console.log(`Промежуточных седмиц: ${this.betweenWeeks} `)


  }

}
