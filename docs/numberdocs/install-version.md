# Установка версий Angular

>Новая глобальная установка версии Angular CLI

## <span style="color: #e34234;">Если нам не удается запустить проект из-за различий версий `Angular CLI` и `Angular` выполните глобальное удаление `Angular CLI` так:

```bash
npm uninstall -g @angular/cli  
```

Далее очистите кэш:

```bash
npm cache varify
```

Далее установите нужную нам версию для нашего проекта `8.3.28`:

```bash
npm install -g @angular/cli@8.3.28
```

Далее установите `Angular` локально в папку проекта выполнив команду:

```bash
npm install
```

Далее запустите сервер для просмотра сайта:

```
ng s -o
```

Удачи.

<br><br>
![img](https://1.bp.blogspot.com/-wFaMiAHx-Y8/YG3EaVrCDFI/AAAAAAAAGZY/IYjO6zFHW5wjj4I_HrssCIShQpMxWMHlgCLcBGAsYHQ/s800/IMG_2094.PNG)