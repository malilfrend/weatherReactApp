# Weather app

Приложение для просмотра погоды по всему миру

## Development

yarn proxy  
yarn start

## Start

Изначально вам нужно предоставить доступ к геолокации сайту, если вы этого не сделаете, то не сможете посмотреть погоду.

После того, как вы разрешите доступ к геолокации, пойдёт запрос на сервер. После успешного ответа отобразится текущая погода и прогноз на неделю.

Можно переключаться между днями и смотреть более подробную информацию.

### My locations

Нажав на "My locations", отобразится выплывающее окно со списком всех локаций, которые вы записали. По умолчанию в списке одна локация, та, которая была определена автоматически.

### Add location

Нажав на "Add location", отобразится выплывающее окно с полями ввода нового местоположения. Название нового местоположения может быть только 16 символов. Широта может быть от -90 до 90 градусов. Долгота от -180 до 180 градусов.
Когда вы заполните форму и нажмёте на кнопку "Add and see new weather", пойдёт новый запрос за погодой. Ответ с сервера сразу же отобразится на экране.

### Переключение между местоположениями

Вы можете переключаться между местоположениями в выплывающем списке "My locations". Так же есть возможность редактировать название, широту и долготу у конкретного местоположения, и удалить это местоположение. Для местоположения по умолчанию есть возможность только отредактировать название.

#### При перезагрузке браузера или страницы сохранённые геопозиции останутся на месте, снова вводить их не придётся
