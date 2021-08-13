![img](https://3.bp.blogspot.com/-HDKF6GDcMD8/Xc6QlUbBDzI/AAAAAAAAElo/M3yn9nHMQ8ISeoisPgXeJOnqq9vKf1cNgCK4BGAYYCw/s400/apr.png
)

# **Маркировка объектов**

### Маркировка объектов – это идентификатор объекта в описании документации в файлах исходниках. Например, чтобы получить более подробную информацию об объекте, нужно просто перейти на страницу под номером указанном в описаннии этого объекта.

---

Допустим у нас код:

```ts
     /** 007
     *  Функция, которая в зависимости от входящего ключа-года формирует две даты Пасх и их читаемый вариант на RU.
     */
  keyNewYear(keyYear: number) {
    console.log(keyYear, " -- keyYear");
    
    // объект для экспортирования в другой компонент
    this.datesEasterYear =
    {
      "lastEaster":
      new Date(this.keyYear - 1, PASKHALIA[this.keyYear - 1][0],
        PASKHALIA[this.keyYear -1][1]).getTime(),
        // возращаае тип number в миллисекундах
        "nextEaster":
        new Date(this.keyYear, PASKHALIA[this.keyYear][0],
          PASKHALIA[this.keyYear][1]).getTime()
    }
    
    
    // return console.log(typeof(this.datesEasterYear.nextEaster));
    
  }

```

Так вот, в первой строке коментария к данной функции указан номер страницы для данного мануала, где и можно **подробнее** узнать о данном объекте [007](007.html).





---

[далее](001.html)

<br>
